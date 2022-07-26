import {UserNote} from "../models/UserNote";
require('dotenv').config()

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


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

router.post('/stripe-checkout',async function (req: any, res: any) {
    console.log("ID IS", req.body.id)
    try {
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{price_data: {
                currency: 'cad',
                product_data:{
                    name: "Professional mode"
                },
                unit_amount: 500

            },
        quantity: 1}],
            success_url: `${process.env.SERVER_URL}/stripe-checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.SERVER_URL}/stripe-checkout/failure?session_id={CHECKOUT_SESSION_ID}`,

        })
        return res.send({url: stripeSession.url});
    } catch (e) {
        res.status(500).send(e.message)
    }
});

router.get('/stripe-checkout/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);

    console.log("SESSION IS", session)
    console.log("CUSTOMER IS", customer)
  
    res.status(200).redirect(`${process.env.CLIENT_URL}?success`);
    //res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
  });

  router.get('/stripe-checkout/failure', async (req, res) => {
   // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    //const customer = await stripe.customers.retrieve(session.customer);

   // console.log("SESSION IS", session)
   // console.log("CUSTOMER IS", customer)
  
    res.status(400).redirect(`${process.env.CLIENT_URL}?Failure`);
   // res.send(`<html><body><h1>FAILURE  for your order,!</h1></body></html>`);
  });

module.exports = router;
