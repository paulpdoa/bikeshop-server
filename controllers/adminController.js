require('dotenv').config();

// database tables
const { Admin } = require('../models');
const { Inventory } = require('../models');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

// creating token function
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge
    });
}

const adminAuth_get = (req, res) => {
    res.json({ isAuth: true, role: 'admin' })
}

const admin_get = (req, res) => {
    Admin.findAll()
        .then((admin) => {
            res.json(admin);
        })
        .catch((err) => {
            console.log(err);
        })
}

const admin_register = (req,res) => {
    const { userName, password } = req.body;

    bcrypt.hash(password,10,(err, hash) => {
        Admin.create({
            userName: userName,
            password: hash
        })
        .then((admin) => {
            const token = createToken(admin.id);
            res.cookie('jwtAdmin', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({success:"You have successfully registered!",redirect:"/admin/login",admin: admin.id})
        })
        .catch((err) => {
            const errorObj = {}; 
            // map inside the error object to get the value of errors
            err.errors.map((error) => {
                errorObj[error.path] = error.message;
            })
            res.json({userNameErr: errorObj.userName, emailErr: errorObj.email});
        })
    })
}

const admin_login = (req, res) => {

    const { userName,password } = req.body;

    Admin.findOne({where: { userName: userName }})
        .then((admin) => {
            bcrypt.compare(password, admin.password,(error,response) => {
                if(response) {
                    const token = createToken(admin.id);
                    res.cookie('jwtAdmin', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(200).json({ token:token,adminID: admin.id,admin: userName,redirect:'/dashboard', role: admin.role })
                } else {
                res.json({pass:"Incorrect password"})
               }
            })
        })
        .catch(err => res.json({mssg: 'Incorrect username'}))
} 

const admin_logout = (req, res) => {
    res.cookie('jwtAdmin','', { maxAge: 1 });
    res.json({redirect:'/admin/login', isAuth: false})
}

// products adding

const product_get = (req, res) => {
    Inventory.findAll()
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            console.log(err);
        })
}

const admin_addproduct = (req, res) => {
   const { brand, product_type, item, price, quantity, color, description } = req.body;
  
    //Create filename
   const fileType = req.file.mimetype.split("/")[1];
   const product = Date.now() + '-' + item + '.' + fileType;
   
    fs.rename(`./public/products/${req.file.filename}`, `./public/products/${product}`,() => {
        Inventory.create({
            product_image: product, 
            product_type:product_type,
            brand_name:brand,
            item_name: item,
            product_price: price,
            quantity: quantity,
            product_color_id:color,
            description: description  
         })
         .then((product) => {
             res.status(200).json({ status: true, product })
         })
         .catch((err) => res.json({err:err}))
    })
}

module.exports = {
    admin_get,
    admin_register,
    admin_login,
    adminAuth_get,
    admin_logout,
    admin_addproduct,
    product_get
}