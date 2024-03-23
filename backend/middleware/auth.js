import { catchAsyncError } from "./catchAsyncError.js"
import ErrorHandler from './error.js';
import jwt from 'jsonwebtoken';
import {User} from '../models/userSchema.js'

export const isAuth = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User not authorized", 400))
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decode.id);

    next()
})