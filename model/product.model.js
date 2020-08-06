var sql = require('../database/db.js');

//Product object constructor
var Product = function(product){
    this.id = product.id;
    this.productName = product.productName;
    this.price = product.price;
    this.specifications = product.specifications;
    this.status = product.status;
};
//check if the product already exist or not
Product.findProduct = function(product, result){
    sql.query("SELECT * FROM product where productName ='"+product.productName+"'", function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("length",res.length);
            result(null, res.length);
        }
    });  

}
Product.createProduct = function (product, result) {    
     findProductByName(product).then(function(rows) {
        // now you have your rows, you can see if there are <20 of them
        if(rows == 1){
            result(null, -1);
        } else {
            delete product.id;
            sql.query("INSERT INTO product set ?", product, function (err, res) {
                
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
async function findProductByName(product){
   return new Promise(function(resolve, reject) { 
        Product.findProduct(product,function(err, product) {

            if (err)
               // return err;
                resolve(err);
            else
               resolve(product);
            }) 
    });
}
Product.listUser = function(result){
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
Product.updateProduct = function (product, result) {    
       // now you have your rows, you can see if there are <20 of them
        sql.query("Update product set productName = '"+product.productName+"', price = '"+product.price+"', specifications = '"+product.specifications+"', status = '"+product.status+"' where id ="+product.id, function (err, res) {
               
               if(err) {
                   console.log("error: ", err);
                   result(err, null);
               }
               else{
                   console.log(res);
                   result(null, res);
                   //result(null, res);
               }
           });  

       
   
};
module.exports = Product;