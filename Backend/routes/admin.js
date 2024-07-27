const { Router } = require("express");
const {db} =require("../db");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const email = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    const user = await db.query("SELECT * FROM admins WHERE email =$1",[email]);
    if(user[0].length!=0){
        const token =  jwt.sign({
            email
        },JWT_SECRET);
        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            message:"Incorrect email and pass"
        })
    }
});



router.post('/issue', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const {department,issue,labNo,status} = req.body;
    const newIssue = await db.query("INSERT INTO issues (department,issue,labNo,status,newIssue) VALUES ($1,$2,$3,$4)",[{department},{issue},{labNo},{status}])
    
    console.log(issue);
    res.json({
        message:'Issue created successfully',issueId: newIssue._id
    })

});
router.get('/showIssue', async(req,res) => {

    const response = await db.query("SELECT * FROM issues");
    console.log(response);
    res.json({
        issue: response
    })
})

module.exports = router;