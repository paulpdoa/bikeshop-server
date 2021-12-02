require('dotenv').config();

// database
const { Customer,PaymentMethod } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// send mail package
const nodemailer = require('nodemailer');

// token creation for jwt
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge
    });
}
// protect routes in frontend
const auth_get = (req,res) => {
    res.json({isAuth: true, role: 'customer'});
}

const customer_get = (req,res) => {
    Customer.findAll({ where: { status:'active' } })
        .then((customers) => {
            res.send(customers);
        })
        .catch(err => {
            console.log(err)
        }) 
}

// get profile
const customerProfile_get = (req,res) => {
    Customer.findOne({where: {userName: req.params.id}})
    .then((user) => {
        res.json(user);
    })
    .catch(err => {
        console.log(err);
    })
}

const customer_delete = (req,res) => {
    Customer.update(
        { status: req.body.status },
        {where: { userName: req.body.username }}
        )
        .then((deletedUser) => {
            res.json({ redirect: '/login',mssg:'Account has been deleted!' })
        })
        .catch((err) => console.log(err));
}

const customer_register = (req, res) => {
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const username = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const status = 'active';

     // sending to email
     const output = 
     `
     <h1>Welcome ${firstname} ${lastname}</h1>
     <p>You have registered to our website</p>
     <h3>Details</h3>
     <ul>
         <li>First Name: ${firstname}</li>
         <li>Last Name: ${lastname}</li>
         <li>Username: ${username}</li>
         <li>Email: ${email}</li>
     </ul>
     <h3>Welcome ${username}</h3>
     `
 //    create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
     service:"hotmail",
     auth: {
       user: process.env.USER_SECRET, 
       pass: process.env.PASSWORD_SECRET, 
     },
   });
 
   let mailOption = {
     from: '"Paul Andres 👻" <polopdoandres@outlook.com>', 
     to: `${email}`, 
     subject: "Hello ✔", 
     text: "Hello world?", 
     html: output,
   }
   
    bcrypt.hash(password,10,(err,hash) => {
        Customer.create({
            firstName: firstname,
            lastName: lastname,
            userName: username,
            email: email,
            password: hash,
            status: status
        })
        .then((user) => {
            transporter.sendMail(mailOption,(err, info) => {
                if(err) {
                    console.log(err)
                } else {
                    res.json({user, mail:"An email has been sent!",redirect:'/login'});
                    console.log("Email has beent sent " + info.response);
                }
            });
            const token = createToken(user.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({success:"You have successfully registered!",redirect:"/login",user: user.id});
        })
        .catch((err) => {
            const errorObj = {}; 
            // map inside the error object to get the value of errors
            err.errors.map((error) => {
                errorObj[error.path] = error.message;
            })
            res.json({userNameErr: errorObj.userName, emailErr: errorObj.email});
        });
    })

   
}

// login user
const customer_login = (req, res) => {
    const { userName, password } = req.body;

    Customer.findOne({ where: { userName: userName } })
        .then((user) => {
           bcrypt.compare(password,user.password,(error,response) => {
               if(response) {
                const token = createToken(user.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(200).json({ token:token,userID: user.id,user: userName,redirect:'/', role: user.role })
               } else {
                res.json({pass:"Incorrect password"})
               }
           })
        })
        .catch(err => res.json({mssg: 'Incorrect username'}))
} 

const forgot_password = (req,res) => {
    const username = req.body.userName;

    Customer.findOne({where: { userName: username }})
        .then((user) => {
            if(user) {
                const randomId = Math.floor(Math.random() * 1000000); 
                const token = createToken(user.id);

                const forgetLink = `http://localhost:3000/changepassword/${token}/${user.id}`;
                const output = 
                    `
                    <h1>Hello ${user.firstName} ${user.lastName}!</h1>
                    <p>It seems like you're trying to reset your password</p>
                    <h2>Please click this <a href=${forgetLink}>Link</a> to change password</h2> 
                    `
                let transporter = nodemailer.createTransport({
                    service:"hotmail",
                    auth: {
                    user: process.env.USER_SECRET, 
                    pass: process.env.PASSWORD_SECRET, 
                    },
                });
                let mailOption = {
                    from: '"Paul Andres 👻" <polopdoandres@outlook.com>', 
                    to: `${user.email}`, 
                    subject: "Hello ✔", 
                    text: "Hello world?", 
                    html: output,
                }
                transporter.sendMail(mailOption,(err, info) => {
                    if(err) { 
                        console.log(err)
                    } else {
                        res.status(200).json({ user: user, mssg: 'User has been found, please check your email for confirmation...',token: token })
                        console.log("Email has been sent " + info.response);
                    }
                })
            } else {
                res.json({mssg:"Sorry, this user doesn't exist"})
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

const update_password = (req,res) => {
    const { id,password } = req.body;
    bcrypt.hash(password,10,(err,hash) => {
        Customer.update(
            {password: hash},
            {where: {id: id}}
            )
            .then((updtdPsswrd) => {
                res.json({updtdPsswrd,redirect:'/login', mssg:'Password has been updated successfully!'});
            })
            .catch(err => console.log(err))
      }) 
}

const customer_logout = (req, res) => {
    res.cookie('jwt','', { maxAge: 1 });
    res.json({redirect:'/login', isAuth: false})
}

const update_profile = (req, res) => {
    Customer.update({where: {userName: req.body.username}})
        .then(updated => {
            res.json({mssg:'Updated'})
        }) 
        .catch(err => console.log(err));
}

const payment_method_get = (req, res) => {
    PaymentMethod.findAll()
    .then((payment) => {
        res.json(payment)
    })
    .catch(err => console.log(err));
}

module.exports = {
    customer_get,
    customer_register,
    customer_login,
    forgot_password,
    update_password,
    customer_logout,
    auth_get,
    customerProfile_get,
    update_profile,
    payment_method_get,
    customer_delete
}