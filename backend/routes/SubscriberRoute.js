const express = require('express');
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//@route POST /api/subscribe
//@desc Handle newsletter Subscription
//@access public 

router.post('/' , async(req, res) =>{
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({ message : "Email is Required"});
    }

    try{
        // Check if the Email is already Subscribed
        let subscriber = await Subscriber.findOne({email});

        if(subscriber){
            return res.status(400).json({message : "Email is Already Subscribed"});
        }

        // Create a new Subscriber
        subscriber = new Subscriber({email});
        await subscriber.save();

        res.status(201).json({message : "Successfully Subscribed to the Newsletter !!"});

    }catch(error){
        console.error(error);
        res.status(500).json({message : "Server error"});
    }
});

module.exports = router;