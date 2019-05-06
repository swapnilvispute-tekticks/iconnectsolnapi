let Users = require('./../../models/Users')
let utilityFunction = require('./../../helpers/utilityFunctions')
let config = require('../../config/constants')
const jwt = require('jsonwebtoken');
exports.login = (req,res)=>{
    if(!req.body.email && req.body.password){
        return res.status(400).send({
            status : 400,  
            message: "Invalid request parameters",
            data:{}
        });
    }
    else {
                Users.findOne({'email':req.body.email,'isVerified':1}).then(data=>{
                    if(data){
                        console.log('data',data)    
                        utilityFunction.decrypt(req.body.password,data.password).then((pass)=>{
                                if(pass){
                                    console.log('pass if', pass,data.isVerified)
                                    if(data.isVerified == 0){
                                        return res.status(200).send({
                                            status : 201,  
                                            message: "Please verify your email address to access your account",
                                            data:{}
                                        });    
                                    }
                                    else {
                                        console.log('11111')
                                        const payload = {
                                            name : data.username,
                                            userId : data._id 
                                          };
                                        var token = jwt.sign(payload, config.jwtSecret, {});
                                        console.log(token)
                                        return res.status(200).send({
                                            status : 200,  
                                            message: "Login Successfuly",
                                            data:{ token: token , name :data.username , email : data.email ,mobileNo : data.mobileNo }
                                        });
                                    }
                                } else {
                                    console.log('else')
                                    return res.status(200).send({
                                        status : 201,  
                                        message: "Invalid Credentials",
                                        data:{}
                                    });                                
                                }
                            }).catch((error)=>{
                                console.log(error)
                                return res.status(200).send({
                                    status : 201,  
                                    message: "Invalid Credentials",
                                    data: error 
                                });
                            })        
                    } else {
                        return res.status(200).send({
                            status : 201,  
                            message: "No records found",
                            data:{}
                        });
                    }  
                })
            
        
    }
}