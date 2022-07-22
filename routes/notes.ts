import {UserNote} from "../models/UserNote";

const express = require('express');
const router = express.Router();


router.post('/upload', async function (req: any, res: any) {
    console.log(req.body)
    const note = await UserNote.saveNote(req.body);
    res.send(note);
});

router.post('/uploadMany', async function (req: any, res: any) {
    console.log(req.body)
    const {notes, userId} = req.body;
    const note = await UserNote.saveNotes(userId, notes);
    res.send(note);
});

router.post('/uploadOne', async function (req: any, res: any) {
    console.log(req.body)
    const note = await UserNote.saveNote(req.body);
    res.send(note);
});

router.get('/getByUserIdAndNoteId/:userId/:noteId', async (req: any, res: any) => {
    const {noteId, userId} = req.params;
    try {
        const note = await UserNote.getNote(userId, noteId)
        return res.send(note);
    } catch (e) {
        res.status(204).send()
    }
})

router.get('/getAllNotesById/:userId', async (req: any, res: any) => {
    const {userId} = req.params;
    try {
        const data = await UserNote.findById(userId)
        return res.send(data.notes);
    } catch (e) {
        res.status(204).send()
    }
})

router.get('/getMostRecentNotes', async (req: any, res: any) => {
    try {
        const data = await UserNote.getMostRecentNotes();
        return res.send(data);
    } catch (e) {
        res.status(204).send()
    }
})

router.get('/getFollowersById/:userId', async (req: any, res: any) => {
    const {userId} = req.params;
    try {
        const data = await UserNote.findById(userId)
        return res.send(data.followers);
    } catch (e) {
        res.status(204).send()
    }
})

router.get('/getFollowingById/:userId', async (req: any, res: any) => {
    const {userId} = req.params;
    try {
        const data = await UserNote.findById(userId)
        return res.send(data.following);
    } catch (e) {
        res.status(204).send()
    }
})

router.post('/addFollowerById/:userId/:followerId', async function (req: any, res: any) {
    console.log(req.body);
    const {userId, followerId} = req.params;
    const follower = await UserNote.addFollower(userId, followerId);
    res.send(follower);
});

router.post('/addToFollowersList/:userId/:followerId', async function (req: any, res: any) {
    console.log(req.body);
    const {userId, followerId} = req.params;
    const follower = await UserNote.addToFollowersList(userId, followerId);
    res.send(follower);
});

router.post('/removeFollower/:userId/:followerName', async function (req: any, res: any) {
    console.log(req.body);
    const {userId, followerName} = req.params;
    const follower = await UserNote.removeFollower(userId, followerName);
    res.send(follower);
});

router.post('/removeFollowing/:userId/:followingName', async function (req: any, res: any) {
    console.log(req.body);
    const {userId, followingName} = req.params;
    const follower = await UserNote.removeFollowing(userId, followingName);
    res.send(follower);
});

router.post('/editById', async (req: any, res: any) => {
    return res.send(await UserNote.editNote(req.body));
})

router.delete('/deleteByUserIdAndNoteId/:userId/:noteId', async (req: any, res: any) => {
    const {noteId, userId} = req.params;
    return res.send(await UserNote.removeNote(userId, noteId));
})

router.get('/search', async function (req: any, res: any) {
    try {
       let publicNotes = await UserNote.findPublicNotes()
        return res.send(publicNotes);
    } catch (e) {
        res.status(204).send()
    }
});


module.exports = router;
