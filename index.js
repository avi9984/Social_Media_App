const express=require('express')
const bodyParser=require('body-parser')
const route=require('./src/Routes/route');
const { default: mongoose } = require('mongoose');
const PORT= 3000
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://Avi9984:JM6hnTiQIRViVdA3@cluster0.qfc4n.mongodb.net/Social_Media",{
    useNewUrlParser:true
}).then(()=>console.log("MongoDB is Connecte!..."))
.catch((err)=>console.log(err))

app.use('/',route)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

