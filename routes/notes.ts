import {UserNote} from "../models/UserNote";
require('dotenv').config()

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
//Auto deploy test


router.post('/upload', async function (req: any, res: any) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body)
    const note = await UserNote.saveNote(req.body);
    res.send(note);
});

router.post('/uploadMany', async function (req: any, res: any) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body)
    const {notes, userId} = req.body;
    const note = await UserNote.saveNotes(userId, notes);
    res.send(note);
});

router.post('/uploadOne', async function (req: any, res: any) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body)
    const note = await UserNote.saveNote(req.body);
    res.send(note);
});

router.get('/getByUserIdAndNoteId/:userId/:noteId', async (req: any, res: any) => {
    const {noteId, userId} = req.params;
    res.header("Access-Control-Allow-Origin", "*");
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
        res.header("Access-Control-Allow-Origin", "*");
        console.log("DATA IS", data)
        if (data  === null){
            console.log("NULL HERE")
            return res.send([]);
        }
        return res.send(data.notes);
    } catch (e) {
        res.status(204).send([])
    }
})

router.get('/getUserIdByNoteId/:noteId', async (req: any, res: any) => {
    const {noteId} = req.params;
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const data = await UserNote.getUserIdByNoteId(noteId)
        return res.send(data);
    } catch (e) {
        res.status(204).send([])
    }
})

router.get('/getMostRecentNotes', async (req: any, res: any) => {
    try {
        const data = await UserNote.getMostRecentNotes();
        res.header("Access-Control-Allow-Origin", "*");
        return res.send(data);
    } catch (e) {
        res.status(204).send()
    }
})

router.get('/getFollowersById/:userId', async (req: any, res: any) => {
    const {userId} = req.params;
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const data = await UserNote.findById(userId)
        if (data  === null){
            console.log("NULL HERE")
            return res.send([]);
        } else{
            return res.send(data.followers);
        }
    } catch (e) {
        res.status(204).send([])
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
    res.header("Access-Control-Allow-Origin", "*");
    const {userId, followerId} = req.params;
    const follower = await UserNote.addFollower(userId, followerId);
    res.send(follower);
});

router.post('/addToFollowersList/:userId/:followerId', async function (req: any, res: any) {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    const {userId, followerId} = req.params;
    const follower = await UserNote.addToFollowersList(userId, followerId);
    res.send(follower);
});

router.post('/saveNote', async function (req: any, res: any) {
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");
    const note = await UserNote.saveNoteToSavedNotes(req.body);
    res.send(note);
});

router.delete('/removeFollower/:userId/:followerName', async function (req: any, res: any) {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    const {userId, followerName} = req.params;
    const follower = await UserNote.removeFollower(userId, followerName);
    res.send(follower);
});

router.delete('/removeFollowing/:userId/:followingName', async function (req: any, res: any) {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    const {userId, followingName} = req.params;
    const follower = await UserNote.removeFollowing(userId, followingName);
    res.send(follower);
});

router.post('/editById', async (req: any, res: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    return res.send(await UserNote.editNote(req.body));
})

router.delete('/deleteByUserIdAndNoteId/:userId/:noteId', async (req: any, res: any) => {
    const {noteId, userId} = req.params;
    res.header("Access-Control-Allow-Origin", "*");
    return res.send(await UserNote.removeNote(userId, noteId));
})

router.post('/search', async function (req: any, res: any) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        console.log(req.body)
       let publicNotes = await UserNote.findPublicNotes(req.body)
        return res.send(publicNotes);
    } catch (e) {
        res.status(204).send()
    }
});

router.get('/getSavedNotes/:userId', async function (req: any, res: any) {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        console.log("HERE")
        let {userId} = req.params;
        let savedNotes = await UserNote.getSavedNotes(userId);
        return res.send(savedNotes);
    } catch (e) {
        res.status(204).send()
    }
});

router.post('/stripe-checkout',async function (req: any, res: any) {
    console.log("ID IS", req.body.id)
    try {
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            client_reference_id: req.body.id,
            line_items: [{price_data: {
                currency: 'cad',
                product_data:{
                    name: "Professional mode"
                },
                unit_amount: 500

            },
        quantity: 1}],
            success_url: `${process.env.SERVER_URL}/stripe-checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:  `${process.env.SERVER_URL}/stripe-checkout/failure?session_id={CHECKOUT_SESSION_ID}`,

        })
        return res.send({url: stripeSession.url});
    } catch (e) {
        res.status(500).send(e.message)
    }
});

router.get('/stripe-checkout/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const added = await UserNote.addPro(session.client_reference_id)
    res.status(200).redirect(`${process.env.CLIENT_URL}?success`);
  });

  router.get('/stripe-checkout/failure', async (req, res) => {
    console.log("HERE I AM")
    res.status(200).redirect(`${process.env.CLIENT_URL}?failure`);
  });

  router.get('/getpro/:userId', async (req, res) => {
try{
    res.header("Access-Control-Allow-Origin", "*");
    const {userId} = req.params;
    const hasPro = await UserNote.getPro(userId)
    console.log("FINISHED ROUTE", hasPro)
    return res.send({proStatus: hasPro });
} catch (e){
    res.status(204).send({proStatus: false })

}

  });

module.exports = router;
