require('dotenv').config();

const express = require('express');
const app = express();
const restApiRoutes = require('./routes/restApi');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/countries', restApiRoutes);

app.get('/', (req, res) =>{
    res.render('index');
})


//not found
app.use((req, res)=>{
    res.status(404).json({error:"not found boss"});
})

app.listen(process.env.PORT,()=>{
    console.log('listening on port: '+process.env.PORT);
})