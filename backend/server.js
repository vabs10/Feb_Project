const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const router = express.Router();
const {Application} = require("./Schema/Application");
// const {JobApplicant} = require("./Schema/Application");
// const {JobSchema} = require("./Schema/Application");
// const {Rating} = require("./Schema/Application");
// const {User} = require("./Schema/Application");

const {Recruiter} = require("./Schema/Recruiter");

// Need to commit
function init(){

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/jobPortal")
.then((res)=> console.log("Connected to the DB"))
.catch((err)=> console.log("Error :-"+ err));
app.use("/jobPortal", router);
}

init();

router.get("/",async(req, res)=> {
try{
const applications = await Recruiter.find({});
console.log("getStudentsAsync :: applications Fetched :- ", applications);
res.json(applications);
}
catch(err){
console.log("Error findind the data"+ err);
}
})


router.post("/recruiters",async(req, res)=>{
    try{
        console.log("Application", req.body)
        const newApplication = new Recruiter({
            ...req.body,
        })
        const response = await newApplication.save();
        res.send("Success"+response);
    }catch(err){
        console.log("Error Adding the data"+ err);
    }
})

const port = process.env.POR || 8100;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});