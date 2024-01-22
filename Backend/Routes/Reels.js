const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Reel = require('../Modals/Reel');
 const User = require('../Modals/User')
const { verifytoken } = require('../middleware/verifytoken');


// ADD NEW REEL
router.post("/addnewreel",verifytoken, async (req, res) => {

    try {

        let {description,video}= req.body;
  
        const newReel = new Reel({         
            description,video,user:req.user.id
        })

       await newReel.save();
       console.log(newReel);
       res.status(200).json({newReel});

    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /addnewreel" + error)
    }

})


// GET ALL REELS IN DATA BASE

router.get("/getAllReels",async(req,res)=>{
    try{

        const allreels = await Reel.find(); // .find() returns all documnets in a particular collection

        if(!allreels){
            return res.status(400).send("NO REELS FOUND IN DATABASE");
        }
        res.status(200).send(allreels);

    }catch(error){

        return res.status(400).send("SOME ERROR IN try-catch GET ALL REELS");

    }
})


// GET ALL REELS OF A PARTICULAR USER
// METHOD USED :- GET
router.get("/get/reels/:id", async (req, res) => {
    try {
     const user_reels = await Reel.find({user:req.params.id});
     if(!user_reels){
        return res.status(400).json("NO POSTS FOUND ...");
     }

    //  console.log(user_posts);
     res.status(200).json(user_reels);


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/reels" );
    }

})

module.exports = router;
