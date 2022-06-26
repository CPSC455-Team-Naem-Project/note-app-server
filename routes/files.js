const express = require('express');
const {UserFile} = require("../models/UserFile");
const router = express.Router();


/**
 * This function comment is parsed by doctrine
 * @route POST /files/upload
 * @group Upload - Uploads a file with UserID
 * @param {UserFile} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {UserFile} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/upload', async function (req, res, next) {
  const {userId, displayName, userEmail} = req.body;
  console.log(req.body)
  const u = await UserFile.findByIdAndUpdate(
    userId,
    {
      $set: {displayName, userEmail},
      $push: {files: req.body}
    },
    {
      upsert: true
    }).exec()
  res.send(u);
});

module.exports = router;
