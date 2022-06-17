const express=require("express")
const mysql=require("mysql")
const bodyparser=require("body-parser")
const app=express()

const cors = require("cors")
app.use(cors())

const encoder=bodyparser.urlencoded()
app.use(bodyparser.json())
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"intern"
})
con.connect(function(error){
    if(error)
    throw error;
    else{
        console.log("Database connected")
    }
})

app.get("/disp_employee",(req,res)=>{
    res.sendFile(__dirname+"/empdisp.html")
})

app.get("/disp_customer",(req,res)=>{
    res.sendFile(__dirname+"/cusdisp.html")
})

app.post("/employee",encoder,(req,res)=>{
    console.log("Hii")
    var empname = req.body.t1;
    var empage = req.body.t2;
    var empid= req.body.t3;
    var empsalary = req.body.t4;
    
    
    var sql = `INSERT INTO employee (empname, empage , empid , empsalary ) VALUES(${con.escape(empname)},${con.escape(empage)},${con.escape(empid)},${con.escape(empsalary)})`
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
       res.redirect("admin")
    })
    // console.log("Hoo")
})

app.post("/customer",encoder,(req,res)=>{
    console.log("Hii")
    var customername = req.body.t1;
    var customerage = req.body.t2;
    var customeremail= req.body.t3;
    var customernumber = req.body.t4;
    
    
    var sql = `INSERT INTO customer (customername, customerage , customeremail , customernumber ) VALUES(${con.escape(customername)},${con.escape(customerage)},${con.escape(customeremail)},${con.escape(customernumber)})`
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
       res.redirect("admin")
    })
    // console.log("Hoo")
})

app.get("/admin",(req,res)=>{
    res.sendFile(__dirname+"/admin portal.html")
})

app.get("/index",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


app.get("/empdis",(req,res)=>{
    res.sendFile(__dirname+"/empdisp.html")
})

app.get("/cusdis",(req,res)=>{
    res.sendFile(__dirname+"/cusdisp.html")
})

app.get("/empdisplay",(req,res)=>{
    var sql="select * from employee"
    console.log("hi")
    con.query(sql,(error,result)=>
    {
        console.log(result)
        res.json(result)
    })
})

app.get("/cusdisplay",(req,res)=>{
    var sql="select * from customer"
    console.log("hi")
    con.query(sql,(error,result)=>
    {
        console.log(result)
        res.json(result)
    })
})

app.post("/search",(req,res)=>{
    var z1 = req.body.t1
    var z2 = req.body.t2
    var sql = "select * from employee where empname="+con.escape(z1);
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.length>0)
        {
            console.log(result.length)
            res.json(result);
            console.log("Record selected");   
        }
        else{
            console.log("hi")
            res.json(result);
        }
        res.end();
    })
})

app.get("/search",(req,res)=>{
    res.sendFile(__dirname+"/search.html")
})

app.get("/cus",(req,res)=>{
    var sql="select count(customername) as c from customer"
    console.log("hi")
    con.query(sql,(error,result)=>
    {
        console.log(result)
        res.json(result)
    })
})

app.get("/emp",(req,res)=>{
    var sql="select count(*) as c from employee"
    console.log("hi")
    con.query(sql,(error,result)=>
    {
        console.log(result)
        res.json(result)
    })
})

app.get("/sort",(req,res)=>{
    res.sendFile(__dirname+"/sort.html")
})

app.get("/sort1",(req,res)=>{
    con.query("SELECT * from  employee ORDER BY empid",function(err,result,fields){
        if(err)throw err;
        console.log(result)
        res.json(result)
    })
})


app.listen(8000,function(){
    console.log("Server created")
    
})

