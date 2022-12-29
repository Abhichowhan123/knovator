const lodash = require('lodash');
const pool = require('../config/database');
const {genSaltSync,hashSync} = require("bcrypt");
const emailValidator = require('deep-email-validator');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

var express = require('express');
var app = express();
      


exports.login = async (req, res) => {
    try {
        resp = {};   
    const {email,password} = req.body;

    const query = await pool.promise().query( 
        ` SELECT  password FROM  tbluser WHERE  email =  '${email}'`
     );
     if(query[0].length>0){
        
            const result = await bcrypt.compare(password, query[0][0]['password']);
            if(result){
                const query = await pool.promise().query( 
                    ` SELECT   name, email, number  FROM  tbluser WHERE  email =  '${email}'`
                 );
                 const jsontoken= jwt.sign({},"qwe1234",{
                    expiresIn:"1h"
                 })
                 query[0][0]['token'] = jsontoken

                 resp.success = true;
                resp.message = "OK"; 
                resp.data = query[0]; 
            }
     }
     else{
        resp.success = false;
        resp.message = "user not exist"; 
        resp.data = []; 
     }
    // console.log(orderNo);
    
    return res.json(resp);
} catch(err) {
    console.log(err);
    } 
}
exports.registration = async (req, res) => {
    try {
        resp = {};
    const {name,email,password,confirm_password,number} = req.body;
    const query3 = await pool.promise().query( 
        ` SELECT  name FROM  tbluser WHERE  email =  '${email}'`
     );
    if(emailValidator.validate(email))
    {
        if(query3[0].length==0){
        if(password==confirm_password){  
            const salt = genSaltSync(10);
            const pass =hashSync(password,salt) 

            const query = await  pool.promise().query(
                `INSERT INTO tbluser( name, email, password, number )
                VALUES('${name}','${email}','${pass}','${number}')` 
            );
            resp.success = true;
            resp.message = "user register successfully"; 
            resp.data = [];
        }
        else{
            resp.success = false;
            resp.message = "password and confirm password not match"; 
            resp.data = []; 
        }
    }else{
        resp.success = false;
         resp.message = "email exist"; 
         resp.data = []; 
    

    }
}
    else{
        resp.success = false;
        resp.message = "not valid email"; 
        resp.data = [];
    }

    return res.json(resp);
} catch(err) {
    console.log(err);
    } 
}

/////////////////////////////////////////// add_oder
// {
//     "orderNo":1,
// "companyId":11,
// "shipmentDate":"2022-12-11 01:02:03",
// "customerNote":"great product",
// "total":50,
// "taxes":2,
// "grandTotal":58,
// "list_of_items":[
//     {
//         "quantity":5,
//         "unitPrice":1,
//         "tax":3,
//         "amount":50
//     }
// ],
// "status":0,
// "paymentStatus":0,
// "shipStatus":0,
// "packedStatus":0,
// "deliveryStatus":0,
// "fromQuotation":"okk",
// "customerId":55,
// "orderDate":"2022-12-11 01:02:03"
// }