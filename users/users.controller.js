const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const User = require('model/user.model.js');
const jwt = require('jsonwebtoken');
const config = require('config.json');
const Product = require('model/product.model.js');
// routes
router.post('/authenticate', authenticate);     // public route
router.post('/createStaff', authorize(Role.Admin), createStaff); // admin only - staff creation
router.post('/listStaff', authorize(Role.Admin), listStaff); // admin only - list staff 
router.post('/createProduct', authorize(), createProduct); // admin/staff - product creation
router.put('/updateProduct', authorize(), updateProduct); // admin - update product status
module.exports = router;

function authenticate(req, res, next) {
    /*userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));*/
        console.log(req.body);
        if(req.body.email && req.body.password) {
            
            User.login(req.body,function(err, user) {
                if (err) {
                    res.json(err)
                } else {
                    if(user.length==0) {
                        res.json({"message":"emailid and password are wrong"});
                    } else {
                        let userinfo = Object.assign({}, ...user);
                        const token = jwt.sign({ sub: userinfo.id, role: userinfo.role }, config.secret);
                        const { password, ...userinfoWithoutPassword } = userinfo;
                        userinfoWithoutPassword.token = token;
                        req.session.user = userinfoWithoutPassword;
                        req.session = userinfoWithoutPassword.roleType;
                        res.json(userinfoWithoutPassword)
                    }
                }
                }); 
        } else {
            res.status(400).send({ error:true, message: 'Please provide emailid/password' });
        }
              
}

function createStaff(req, res, next) {
    /*userService.createStaff(req.body)
        .then(function(users) { console.log('fff'); console.log(users); res.json(users)  })
        .catch(err => next(err));*/
        var new_user = new User(req.body);

    if(!new_user.email || !new_user.username || !new_user.password  || !new_user.name || !new_user.role || !new_user.roleType){

        res.status(400).send({ error:true, message: 'Please provide email/username/password/name/role/roleType' });

    } else {
        User.createUser(new_user, function(err, user) {
            if (err)
                res.json(err)
            else
                if(user == -1) {
                    res.json({"message":"staff email id has already taken. Please try another"})
                } else {
                    userService.mail(new_user.email, new_user.password)
                    .then(user => {  console.log('success'); })
                    .catch(err => next(err));
                    res.json({"message":"staff has been created successfully. Mail sent to registered email id"})

                }

                
            });   
    }
        
}
function listStaff(req, res, next) {
    /*userService.createStaff(req.body)
        .then(function(users) { console.log('fff'); console.log(users); res.json(users)  })
        .catch(err => next(err));*/

        User.listUser(function(err, user) {
            if (err)
                res.json(err)
            else
                res.json({"user":user})
            });   
}
function createProduct(req, res, next) {
  
    var new_product = new Product(req.body);
    console.log(new_product);   
    if(req.session.user) {
        console.log('ss', req.session.user)
        /*if(req.session.user.roleType == 2) {
            new_product.status = 2;
        } else {
            new_product.status = 1;
        }*/
    }
    if (typeof req.session.user === "undefined") {
        new_product.status = 2;
    } 

    if(!new_product.productName || !new_product.price || !new_product.specifications){

        res.status(400).send({ error:true, message: 'Please provide productName/price/specifications' });

    } else {
        Product.createProduct(new_product, function(err, product) {
            if (err)
                res.json(err)
            else
                if(product == -1) {
                    res.json({"message":"product name has already taken. Please try another"})
                } else {
                    res.json({"message":"product has been created successfully."})
                }
              
            });   
    }
        
}
function updateProduct(req, res, next) {
    console.log('--------------');
    var new_product = new Product(req.body);
    //res.json(new_product);
    if(!new_product.id || !new_product.productName || !new_product.price || !new_product.specifications){

        res.status(400).send({ error:true, message: 'Please provide productName/price/specifications' });

    } else {
        Product.updateProduct(new_product, function(err, product) {
            if (err)
                res.json(err)
            else
                
                res.json({"message":"product has been updated successfully."})
              
            });   
    }
}