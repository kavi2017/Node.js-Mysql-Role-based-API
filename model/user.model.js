var sql = require('../database/db.js');

//User object constructor
var User = function(user){
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.roleType = user.roleType;
   // this.created_at = new Datetime();
};
//check if the user already exist or not
User.findUser = function(newUser, result){
    sql.query("SELECT * FROM users where email ='"+newUser.email+"'", function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("length",res.length);
            result(null, res.length);
            //result(null, res);
        }
    });  

}
User.createUser = function (newUser, result) {    
     findUserByEmail(newUser).then(function(rows) {
        // now you have your rows, you can see if there are <20 of them
        if(rows == 1){
            result(null, -1);
        } else {
            sql.query("INSERT INTO users set ?", newUser, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                    //result(null, res);
                }
            });  

        }
    }).catch((err) => setImmediate(() => { throw err; })); // Throw async to escape the promise chain
    
};
async function findUserByEmail(newUser){
   return new Promise(function(resolve, reject) { 
        User.findUser(newUser,function(err, user) {

            if (err)
               // return err;
                resolve(err);
            else
            console.log(user, '////')
               resolve(user);
            }) 
    });
}
User.listUser = function(result){
    sql.query("SELECT * FROM users ", function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  

}
User.login = function(user, result){
    sql.query("SELECT * FROM users where email ='"+user.email+"' and password = '"+user.password+"'", function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  

}

module.exports = User;