let Users = require('./../../models/Users')
let utilityFunction = require('./../../helpers/utilityFunctions')

let signup = (req,res)=>{
    
    if (req.body.username && req.body.email && req.body.password && req.body.phoneNo) {
        let email = req.body.email
        let userName = req.body.username
        let password = req.body.password
        let phoneNo = req.body.phoneNo
        isUserExist(email)
        .then(function(userData){    
            return saveUser(userName,email,password,phoneNo)
        })
        .then((result)=>{
            return res.status(200).send({status:200,message:'Signup successfully',data: {}})
        })
        .catch(err => {
            console.log('signup err final',err);
            if(err.status && err.message) {
                return res.status(200).send({ status: err.status, message: err.message, data: err.data })
            } else {
                return res.status(200).send({ status: 400, message: 'Something went wrong', data: {} })
            }
        });
    } else {
        return res.status(200).send({ status: 400, message: 'Invalid parameter', data: {} })
    }
    
}

let isUserExist = function (email) {
    return new Promise((resolve, reject) => {
            Users.find({ email: email })
            .then((result)=>{
                if (result.length > 0) {
                    if(result[0].isVerified == 0) {
                        reject({ status: 200, message: 'Please verify your emal id to continue', data: {} });
                    } else {
                        reject({ status: 400, message: 'User already exist with entered email ID', data: {} });
                    }
                    
                }
                else {
                    resolve(true);
                }
            })
            .catch((err)=>{
                reject({ status: 400, message: 'Something went wrong', data: {} });
            })
    });
}

let saveUser =  (username,email,password,phoneNo) => {
    const uniqueString = require('unique-string');
    let uniquestr = uniqueString();
    return new Promise((resolve, reject) => {
    utilityFunction.crypt(password)
    .then((hashPass)=>{
        
            let userdata = {
                username: username, 
                email: email,
                verificationLink : uniquestr,
                phoneNo : phoneNo,
                password : hashPass
            }
            let user = new Users(userdata)  
            return user.save()
        })
        .then((result)=>{
            resolve(result)
        })
        .catch((err)=>{
            reject (err)
        })        
    })

}

module.exports.signup = signup 