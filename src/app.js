const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const viewpath = path.join( __dirname,'views');
const indexViewBag = {title: 'index'};

app.set('views',viewpath);
app.set('view engine','ejs');
app.use(express.static('src/public'));

app.get('/',(req,res)=>{res.render('index', indexViewBag);});
app.listen(3000,()=>console.log('PS Project Running on port 3000!'));
