var express = require('express');
var router = express.Router();

const Credential = {
    email: 'admin@gmail.com',
    password: 'admin123'
};


//LOGIN USER
router.post('/login',(req,res)=>{
    if(req.body.email==Credential.email && req.body.password == Credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
      // res.end('Login Successful');
    }else{
        res.end('Invalid Username');
    }
});

//ROUTE FOR DASHBOARD
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send('Unauthorzed User');
    }
})

//ROUTE FOR LOGOUT
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if (err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('base',{title:"Express", logout: "Logout Successfully"});
        }
    });
})


module.exports= router;