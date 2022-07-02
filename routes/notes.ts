import {UserNote} from "../models/UserNote";
import {Note} from "../models/UploadedFile";

const express = require('express');
const router = express.Router();


/**
 * This function comment is parsed by doctrine
 * @route POST /notes/upload
 * @group Upload - Uploads a file with UserID
 * @param {UserNote} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {UserNote} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/upload', async function (req: any, res: any) {
    console.log(req.body)
    const note = await new Note(req.body).save()
    await UserNote.saveNote(note);
    res.send(note);
});

router.get('/getByUserIdAndNoteId/:userId/:noteId', async (req: any, res: any) => {
    const {noteId, userId} = req.params;
    return res.send(await UserNote.getNote(userId, noteId));
})

router.post('/editById', async (req: any, res: any) => {
    return res.send(await UserNote.editNote(req.body));
})

router.delete('/deleteByUserIdAndNoteId/:userId/:noteId', async (req: any, res: any) => {
    const {noteId, userId} = req.params;
    return res.send(await UserNote.removeNote(userId, noteId));
})


module.exports = router;
