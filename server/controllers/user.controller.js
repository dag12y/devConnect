import {validationResult} from "express-validator";

export function registerUser(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body)
    res.send('User route.')
}