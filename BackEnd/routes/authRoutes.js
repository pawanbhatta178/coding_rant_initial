const passport = require('passport');
const router =require('express').Router();

router.get('/login',(req,res)=>{
    res.send('./login');
})

router.get('/logout',(req,res)=>{
    req.logout();//handle with passport
    res.redirect('/');
})


//handle oauth for google
router.get('/google',passport.authenticate("google",{ scope: ['profile']}))

router.get('/google/callback', passport.authenticate("google"),
(req,res)=>{
    res.redirect('/profile');
})


// handle oauth for facebook
router.get('/facebook',passport.authenticate("facebook"))

router.get('/facebook/callback', passport.authenticate("facebook",{ successRedirect: '/profile',
failureRedirect: '/' }),
(req,res)=>{
    res.redirect('/profile');
})

// handle oauth for github
router.get('/github',passport.authenticate("github"))

router.get('/github/callback', passport.authenticate("github",{ successRedirect: '/profile',
failureRedirect: '/' }),
(req,res)=>{
    res.redirect('/profile');
})

module.exports=router;