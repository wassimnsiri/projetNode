import { Router } from "express";
import {addAdmin } from "../controllers/user.controller.js";
import {  getAllUsersAdmin, getUserById, sendPasswordResetEmail ,  verifyUserWithGoogle } from "../controllers/user.controller.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import sendEmail from "../utils/mailer.js";
import { body } from 'express-validator';

import { getAllUsers, getById, updatePassword, updateUser } from '../controllers/user.controller.js';
import { imageUploadMiddleware } from "../middlewares/multer-config.js";
import  {removeuser,getAll,deleteUser,getuserbyusername,stastverifiedaccount   } from '../controllers/user.controller.js';
import { registerUser,loginUser,verifyEmail,loginAdmin,loginUser1} from '../controllers/AuthController.js';
import  {getAdmins} from '../controllers/user.controller.js';

const router = Router();
const upload = imageUploadMiddleware("profilePicture",{ fileSize: 1024 * 1024 * 5 });

router.post ('/reset-password', sendPasswordResetEmail);


router.get('/reset-password/:token', (req, res) => {
    const token = req.params.token;
    res.render('reset-password', { token });
});

router.post('/change-password', async (req, res) => {
    const newPassword = req.body.password;
    const { token } = req.body;

    // Log the received values
    console.log("Token:", token);
    console.log("New Password:", newPassword);

    if (!newPassword) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        // Validate token and find user by token
        const user = await User.findOne({ resetVerificationToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        user.password = hashedPassword;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/test/:username',getuserbyusername);

router.post('/verify-google', verifyUserWithGoogle);

router.post('/register', [
    body('username').notEmpty().isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], registerUser);
router.get('/verify/:token', verifyEmail);
    router.put("/update/:id",upload , updateUser);
router.post('/login', loginUser);
router.post('/login1', loginUser1);
router.post('/login-admin', loginAdmin);
router.get("/users" , getAllUsers);
router.get("/:id" , getById)
router.put("/updatePassword/:id" , updatePassword)
router.delete('/deleteUser/:username', deleteUser);
  router.route('/')
   .get(getAll)

  
   router.get('/wassim/stats', stastverifiedaccount);
   
   router.delete('/deleteUser/:username', deleteUser);
   router.delete('/delete/:userId', removeuser);
   
   router.get("/users",getAllUsersAdmin);
   router.get('/user/:id', getUserById);

  router.get('/role/admin', getAdmins);
  router.post('/addAdmin', addAdmin);
  export default  router;