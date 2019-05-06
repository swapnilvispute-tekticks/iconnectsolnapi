var  allFn = module.exports = {
    crypt : (str)=>{
        var bcrypt = require('bcryptjs');
        if(str.trim() != ""){
            return new Promise(function (fulfill, reject){    
            try{
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(str, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                reject(-1);
                            }
                            else{
                                fulfill(hash);
                            }
                        });
                    });
                    
                }catch (ex){
                    reject(-1)
                }
                
              });
        }
        else {
            return -1;
        }
    },

    decrypt : (str,hash) =>{
        return new Promise((resolve,reject)=>{
            var bcrypt = require('bcryptjs');
            if(str.trim() != ""){
                //old code
                // bcrypt.compare(str, hash, function(err, res) {
                //     // res == true
                //     resolve(res)
                // });
                bcrypt.compare(str, hash, function(err, res) {
                    if(res === true) {
                        resolve(res)
                    } else {
                        reject("Invalid Credentials")
                    }
                });
            }
        })
    }
    

}