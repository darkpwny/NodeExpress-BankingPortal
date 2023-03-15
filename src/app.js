const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const viewpath = path.join( __dirname,'views');


app.set('views',viewpath);
app.set('view engine','ejs');
app.use(express.static('src/public'));

const accountData = fs.readFileSync('src/json/accounts.json','utf8');
const account = JSON.parse(accountData);
console.log(account);

const userData = fs.readFileSync('src/json/users.json','utf8');
const user = JSON.parse(userData);
console.log(user);

const indexViewBag = {
    title: 'Account Summary',
    accounts: account
    };

const savingsViewBag = {
    title: 'Savings',
    account: account.savings
    };
const checkingViewBag = {
    title: 'Checking',
    account: account.savings
    };
const creditViewBag = {
    title: 'Credit',
    account: account.savings
    };

app.get('/',(req,res)=>{res.render('index', indexViewBag);});
app.get('/savings',(req,res)=>{res.render('account', savingsViewBag);});
app.get('/credit',(req,res)=>{res.render('account', creditViewBag);});
app.get('/checking',(req,res)=>{res.render('account', checkingViewBag);});
app.listen(3000,()=>console.log('PS Project Running on port 3000!'));
