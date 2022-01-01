const router = require("express").Router();
const User = require("../models/User.js");

// sign in
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
   
    res.status(500).json(error);
    
  }
});
router.post("/login",async(req,res)=>{
    try {
        // not found user
        const user= await User.findOne({username: req.body.username})
        !user && res.status(400).json("something wrong !!!")
        // wrong password
        const validate =  req.body.password !== user.password 
       
        !validate && res.status(400).json("something wrong pass!!!")

        // lọc ra password không hiện
        const {password, ...others}= user._doc

        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
        
    }
})


module.exports = router;
