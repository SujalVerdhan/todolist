const express=require("express");
const app=express();
// const ejs=require("ejs")
const hdate=require(__dirname+"/date.js");
const fileUpload=require("express-fileupload")
app.use(fileUpload());
console.log(hdate.getdate());
var items=["Cook Food","Eat Food","Bring Bread"];
let workItems=[];
let files=[];
const bodyparser=require("body-parser");
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function(req,res){
   let date=hdate.getdate();
    res.render('list', {key:date,item:items,file:files})
})
app.get("/Work",function(req,res){
    res.render("list",{key:"Work",item:workItems,file:files});
   })

app.post("/",function(req,res){

   if(req.body.add==="Work"){
    workItems.push(req.body.input)
    res.redirect("/Work")
   }
   else if(req.body.filebutton==="upload"){
    files.push(req.files.fileInput)
    res.redirect("/");
   }
   else{
     items.push(req.body.input)
     res.redirect("/");
    }

})
app.get("/about",function(req,res){
    res.render("about")
})
app.post("/about",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server listening")
})