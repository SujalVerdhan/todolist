const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const ejs=require("ejs")
const _=require("lodash")
const hdate=require(__dirname+"/date.js");
const fileUpload=require("express-fileupload")
app.use(fileUpload());


mongoose.connect("mongodb+srv://Sujal_Verdhan:Sujal%40123@cluster0.am7bdua.mongodb.net/todolistDB")


const bodyparser=require("body-parser");

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))



const itemsSchema=new mongoose.Schema({
    name:String
});

const Item=mongoose.model("Item",itemsSchema);
const item1=new Item({
    name:"Cook Food"
});
const item2=new Item({
    name:"Bring Bread"
});
const item3=new Item({
    name:"Eat Food"
});
const defaultitems=[item1,item2,item3]
console.log(defaultitems)
//
const listSchema=new mongoose.Schema({
    name:String,
    items:[itemsSchema]
});

const List=mongoose.model("List",listSchema);

let files=[];
let count=0;

console.log(count)

app.get("/",function(req,res){
    async function find(){     // first of all call find and it loads all values of database inside founditems then we check if founditems is ===0 then load items to database after that again redire3cting to /route and checking if founditems===0 but now its not zero so else part will be executed.
       let  founditems=await Item.find({})
            if(founditems.length===0){
                if(count===0){
                Item.insertMany(defaultitems);
               
                res.redirect("/");
             }else{
            
                res.render('list', {key:"Today",item:founditems,file:files})
            }
            }else{
            
                res.render('list', {key:"Today",item:founditems,file:files})
            }
       
        console.log(founditems)
        
   }
   find();

 })



app.post("/",function(req,res){
     const itemName=req.body.input
     const listname =req.body.add
      const item=new Item({
        name:itemName
     })

     if(listname==="Today"){
     item.save()
   res.redirect("/")
     }else{
        async function find(){
        const list=await List.findOne({name:listname})
        list.items.push(item);
        list.save();
        res.redirect("/"+listname)
       console.log(list)
    }
    find()
     }
});


app.post("/delete",function(req,res){
    const checkedvalue=req.body.checkbox
    const listname=req.body.listName
    console.log(checkedvalue)
    if(listname==="Today"){
        async function deletevalue(){
            await Item.deleteOne({_id:checkedvalue})
            count++;
            }
            deletevalue()
            res.redirect("/")
    }else{
        async function update(){
        const value=await List.findOneAndUpdate({name:listname},{$pull:{items:{_id:checkedvalue}}})
        console.log(value);
        }
        update();
        res.redirect("/"+listname)
    }
    
});



app.get("/about",function(req,res){
    res.render("about")
})

app.post("/about",function(req,res){
    res.redirect("/");
})
app.get("/:listname",function(req,res){
    const listName=_.capitalize(req.params.listname)
    async function findlist(){
        const found=await List.findOne({name:listName})
        if(!found){
            
            const list=new List({  
                name:listName,
                items:defaultitems
            });
            list.save()
            res.redirect("/"+listName)
        }else{
            res.render("list",{key:found.name,item:found.items,file:files})
        }
    }
    findlist();
  
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server listening")

})                                            
