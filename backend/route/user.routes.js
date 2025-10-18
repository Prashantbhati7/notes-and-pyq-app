import {Router} from "express";
import { loginuser, logoutuser, registerUser,authuser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/test").get((req,res)=>{
    res.send("testing user route")
})
router.route("/register").post(registerUser);
router.route("/login").post(loginuser);
router.route("/logout").get(verifyJWT,logoutuser);
router.route("/auth/success").get(verifyJWT,authuser);

export default router;