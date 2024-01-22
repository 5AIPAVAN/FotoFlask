const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const Post = require('../Modals/Post');
 const User = require('../Modals/User')
const { verifytoken } = require('../middleware/verifytoken');
const Message = require('../Modals/Message');


// ROUTE-1 :- CREATE NEW POST
// METHOD USED :- POST
router.post("/createpost",verifytoken, async (req, res) => {

    try {

        let {description,image,video}= req.body;
  
        const newPost = new Post({         
            description,image,video,user:req.user.id
        })

       await newPost.save();
       console.log(newPost);
       res.status(200).json({newPost});

    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /createnewpost" + error)
    }

})



// ROUTE-2 :- FETCH ALL POSTS OF A USER
// METHOD USED :- GET
router.get("/get/post",verifytoken, async (req, res) => {

    try {

     const user_posts = await Post.find({user:req.user.id});
     if(!user_posts){
        return res.status(400).json("NO POSTS FOUND ...");
     }

    //  console.log(user_posts);
     res.status(200).json(user_posts);


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
    }

})

// ROUTE-10 :- FETCH ALL POSTS IN USER PROFILE PAGE
// METHOD USED :- GET
router.get("/get/post/:id", async (req, res) => {
    try {
     const user_posts = await Post.find({user:req.params.id});
     if(!user_posts){
        return res.status(400).json("NO POSTS FOUND ...");
     }

    //  console.log(user_posts);
     res.status(200).json(user_posts);


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
    }

})


// ROUTE-3 :- UPDATE A POST
// METHOD USED :- PUT
router.put("/update/post/:id",verifytoken, async (req, res) => {

    try {

     let post = await Post.findById(req.params.id);

     if(!post){
        return res.status(400).json("NO SUCH POST FOUND TO UPDATE...");
     }

     post = await Post.findByIdAndUpdate(req.params.id,{
        $set:req.body
     })

     let updated_post = await post.save();

     res.status(200).json(updated_post);


    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /update/post"+error );
    }

})


// ROUTE-4:- LIKE A POST
// METHOD :- PUT


// CORRECT ONLY
// router.put("/:id/like",verifytoken,async(req,res)=>{

//     try{
        
//     const post =await Post.findById(req.params.id);
//     if(!post.likes.includes(req.body.user)){
//         await post.updateOne({$push:{likes:req.body.user}});
//         if(post.dislikes.includes(req.body.user)){
//             await post.updateOne({$pull:{dislikes:req.body.user}});
//         }
//         return res.status(200).json("POST LIKED SUCCESSFULLY");
//     }else{
//         await post.updateOne({$pull:{likes:req.body.user}});
//         return res.status(200).json("LIKE REMOVED ");
//     }
// }catch(error){
//     return res.status(400).json("SOME ERROR OCCURED IN try-catch in /:id/like"+error );
// }

// })

//FOR LIKED POSTS OF A USER
router.put("/:id/like",verifytoken,async(req,res)=>{
 
    try{
       console.log("id check" + req.body.user)
    const liked_user = await User.findById(req.body.user)       
    console.log(liked_user);
    const post =await Post.findById(req.params.id);

    if(!post.likes.includes(req.body.user)){
        await post.updateOne({$push:{likes:req.body.user}});
        await liked_user.updateOne({$push:{Likedposts:req.params.id}})
        console.log("check2"+liked_user.Likedposts);
        console.log("LIKED BY USEROO")
       
        return res.status(200).json("POST LIKED SUCCESSFULLY");
    }else{
        await post.updateOne({$pull:{likes:req.body.user}});
        await liked_user.updateOne({$pull:{Likedposts:req.params.id}})
        return res.status(200).json("LIKE REMOVED ");
    }
}catch(error){
    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /:id/like"+error );
}

})

// ROUTE-5:- DISLIKE A POST
// METHOD :- PUT

// router.put("/:id/dislike",verifytoken,async(req,res)=>{

//     try{
//     const post =await Post.findById(req.params.id);
//     if(!post.dislikes.includes(req.body.user)){
//         await post.updateOne({$push:{dislikes:req.body.user}});
       
//         if(post.likes.includes(req.body.user)){
//             await post.updateOne({$pull:{likes:req.body.user}});
//         }
//         return res.status(200).json("POST DIS-LIKED SUCCESSFULLY");
//     }else{
//         await post.updateOne({$pull:{dislikes:req.body.user}});
//         return res.status(200).json("DIS-LIKE REMOVED ");
//     }
// }catch(error){
//     return res.status(400).json("SOME ERROR OCCURED IN try-catch in /:id/dislike"+error );
// }

// })




// ROUTE-6:- ADD A COMMENT ON A POST
// METHOD :- PUT

router.put("/comment/post",verifytoken,async(req,res)=>{

    try{
    const {comment , postId }= req.body;
    const new_comment = {
        user:req.user.id,
        username:req.user.username,
        comment:comment
    }
    const post = await Post.findById(postId);
    post.comments.push(new_comment);
    await post.save();
   res.status(200).json({msg:"NEW COMMENT ADDED SUCCESSFULLY",post});
}catch(error){
    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /comment/post "+error );
}
})

// ROUTE-7:- DELETE A POST
// METHOD :- DELETE

router.delete("/delete/post/:id",verifytoken,async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(400).json("POST NOT FOUND TO DELETE");
        }
 
        if(post.user == req.user.id){
            const deletedPost = await Post.findByIdAndDelete(req.params.id);
            return res.status(200).json({msg:"POST DELETED SUCCESSFULLY",deletedPost});
        }else{
            return res.status(400).json({msg:"DELETING OTHERS POSTS IS NOT ALLOWED"});
        }

}catch(error){

    return res.status(400).json("SOME ERROR OCCURED IN try-catch in /delete/post "+error );

}
})

// ROUTE-3 :- FETCH A POST BY POST ID
// METHOD USED :- GET
router.get("/get/postID/:id", verifytoken, async (req, res) => {
    try {
    console.log(req.params.id);
    const user_posts = await Post.findById(req.params.id);
    if(!user_posts){
        return res.status(400).json("NO POSTS FOUND ...");
    }

    console.log(user_posts);
    //  console.log(user_posts);
    res.status(200).json(user_posts);   
    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get/post" );
    }

})










// CHAT APP

// create message



router.post('/msg',verifytoken,async(req,res)=>{
    try{
    const {from,to,message} = req.body;
    const newmessage = await Message.create({
        message:message,
        Chatusers:[from,to],
        Sender:from
    })
    return res.status(200).json(newmessage)
}catch(error){
    return res.status(500).json("ERROR IN TRY - CATCH IN create message")  
}
})


// get messages

router.get('/get/chat/msg/:user1Id/:user2Id',async(req,res)=>{
    try{
    const from = req.params.user1Id;
    const to = req.params.user2Id;
    const newmessage = await Message.find({
       Chatusers:{
        $all:[from,to]
       }
    }).sort({updatedAt:1});

    const allmessages = newmessage.map((msg)=>{
        return{
            myself:msg.Sender.toString()===from,
            message:msg.message
        }
    })
    return res.status(200).json(allmessages)
}catch(error){
    return res.status(500).json("ERROR IN TRY - CATCH IN get meassages"+error)  
}
})


// FETCH ALL LIKED POSTS OF A PARTICULAR USER

router.get("/get_all_liked_posts",verifytoken, async (req, res) => {

    try {

     const user = await User.findById(req.user.id);

     const AllLikedPostsOfUser = await Promise.all(
        user.Likedposts.map((each_post_id)=>{
            return Post.findById(each_post_id)
        })
     )


     if(!AllLikedPostsOfUser){
        return res.status(400).json("NO POSTS FOUND ...");
     }

     res.status(200).json(AllLikedPostsOfUser);

    } catch (error) {
        return res.status(400).json("SOME ERROR OCCURED IN try-catch in /get_all_liked_posts" );
    }

})


// get all posts for explore page

router.get("/explore",async(req,res)=>{
    try{

        const allposts = await Post.find(); // .find() returns all documnets in a particular collection

        if(!allposts){
            return res.status(400).send("POSTS NOT FOUND FOR EXPLORE PAGE");
        }

        res.status(200).send(allposts);

    }catch(error){

        return res.status(400).send("SOME ERROR IN try-catch EXPLORE PAGE ROUTE");

    }
})














































module.exports=router;