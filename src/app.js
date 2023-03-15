const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const viewpath = path.join( __dirname,'views');


app.set('views',viewpath);
app.set('view engine','ejs');
app.use(express.static('src/public'));

const accountData = fs.readFileSync('src/json/accounts.json','utf8');
const accounts = JSON.parse(accountData);
console.log(accounts);

const userData = fs.readFileSync('src/json/users.json','utf8');
const users = JSON.parse(userData);
console.log(users);

const indexViewBag = {
    title: 'Account Summary',
    accounts: accounts
    };

const savingsViewBag = {
    title: 'Savings',
    account: accounts.savings
    };
const checkingViewBag = {
    title: 'Checking',
    account: accounts.checking
    };
const creditViewBag = {
    title: 'Credit',
    account: accounts.credit
    };
const profileViewBag =
{
    user : users[0]
};

app.get('/',(req,res)=>{res.render('index', indexViewBag);});
app.get('/savings',(req,res)=>{res.render('account', savingsViewBag);});
app.get('/credit',(req,res)=>{res.render('account', creditViewBag);});
app.get('/checking',(req,res)=>{res.render('account', checkingViewBag);});
app.get('/profile',(req,res)=>{res.render('profile', profileViewBag);});
app.listen(3000,()=>console.log('PS Project Running on port 3000!'));
