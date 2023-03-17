const fs = require('fs');
const path = require('path');
const express = require('express');
const { response } = require('express');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services');


const app = express();

const viewpath = path.join( __dirname,'views');

app.set('views',viewpath);
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('src/public'));
app.use('/account',accountRoutes);
app.use('/services',servicesRoutes);
const {accounts} = require ('./data');
const {users} = require ('./data');
const {writeJSON} = require ('./data');



app.get('/',(req,res)=>{res.render('index', { title: 'Account Summary', accounts: accounts});});
app.get('/profile',(req,res)=>{res.render('profile', { user : users[0]});});


app.listen(3000,()=>console.log('PS Project Running on port 3000!'));