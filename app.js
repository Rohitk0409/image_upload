if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

const express=require("express");
const app=express();
const port=8000;

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

 const cloudinary=require("./cloudCofig.js");

app.get("/",(req,res)=>{
    res.render("student.ejs");
});
app.post("/upload",upload.single("image"), async(req,res)=>{
     try{
       const response= await cloudinary.uploader.upload(req.file.path);
       console.log(response.url);
       console.log(req.body.name);
       console.log(req.file);
       res.redirect("/");
     }
 catch(err){
      console.log(err);
      res.send("Your file did not upload");
     }
 
});

 app.listen(port,()=>{
    console.log(`Listing the port ${port}`);
 })