const express= require('express')
const mysql= require('mysql2')
const cors = require('cors')
const app=express()
app.use(cors())
app.use(express.json())


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"uk123",
    database:"workmeals"
})
db.connect((err) => {
    if(err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
//validate employee
app.post("/emplogin",(req,res)=>{
    const {emp}=req.body
    const sql="SELECT * FROM employees WHERE employeeID=?"
    db.query(sql,[emp],(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in validation"})
            console.log(err)
        }
        else
        {
            if(result.length>0)
            {
                res.status(200).json({valid:true})
            }
            else
            {
                res.status(200).json({message:"invalid employee ID"})
            }
        }
    })
})

//fetch menu
app.post("/fetchmenu",(req,res)=>
{
    const bfmenu="SELECT * FROM food_menu WHERE category='Breakfast'";
    db.query(bfmenu,(err,result)=>
    {
        if(err)
        {
            console.log("error fetching menu",err)
        }
        else
        {
            console.log(result)
            res.status(200).json({menu:result})
        }
    })
})
//send order
//place order
//confirm payment




//listen to server
app.listen(9292,()=>
{
    console.log("listening to port 9292")
})
