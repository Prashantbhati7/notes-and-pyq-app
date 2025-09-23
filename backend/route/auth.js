const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

router.get("/login/success", (req, res) => {
               if (req.user) {
                        res.status(200).json({
                        error: false,
                        message: "Successfully Loged In", 
                        user:req.user,
                      });
        } else {
       res.status(403).json({ error: true, message: "Not Authorized" });
        }
});


router.get("/login/failed", (req, res) => {
            res.status(401).json({
            error: true,
            message:"login failed !",
 	});
});


router.get("/google/callback",
	    passport.authenticate("google", {
		successRedirect: `${process.env.CLIENT_URL}`, 
		failureRedirect: "/login/failed",
	})
);

router.get("/google", 
    passport.authenticate("google",
    {scope:['profile','email']},
    ));

router.get("/logout", (req, res) => {
	req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect(`${process.env.CLIENT_URL}`);
    })
});

module.exports = router;