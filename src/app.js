const fs = require('fs');
const path = require('path');
const express = require('express');
const { response } = require('express');
const app = express();

const viewpath = path.join( __dirname,'views');

app.set('views',viewpath);
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('src/public'));

const {accounts} = require ('./data');
const {users} = require ('./data');
const {writeJSON} = require ('./data');

const indexViewBag = {
    title: 'Account Summary',
    accounts: accounts
    };
const savingsViewBag = {
    account: accounts.savings
    };
const checkingViewBag = {
    account: accounts.checking
    };
const creditViewBag = {
    account: accounts.credit
    };
    
const profileViewBag = {
    user : users[0]
};

app.get('/',(req,res)=>{res.render('index', indexViewBag);});
app.get('/savings',(req,res)=>{res.render('account', savingsViewBag);});
app.get('/credit',(req,res)=>{res.render('account', creditViewBag);});
app.get('/checking',(req,res)=>{res.render('account', checkingViewBag);});
app.get('/profile',(req,res)=>{res.render('profile', profileViewBag);});

app.get('/transfer',(req,res)=>{res.render('transfer');});
app.post('/transfer',(req,res)=>{
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance =   parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount);
    writeJSON();
    res.render('transfer',{message: "Transfer Completed"})
});

app.get('/payment',(req,res)=>{res.render('payment',{account: accounts.credit});});
app.post('/payment',(req,res)=>{
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    accounts.credit.available = parseInt(accounts.credit.available)+parseInt(req.body.amount);
    writeJSON();
    res.render('payment',{message: "Payment Successful", account: accounts.credit});
});

app.listen(3000,()=>console.log('PS Project Running on port 3000!'));