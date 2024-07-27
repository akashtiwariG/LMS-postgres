const { Router } = require("express");
const { db} = require("../db");
const administratorMiddleware = require("../middleware/administrator");
const router = Router();
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { parseArgs } = require("util");
// Admin Routes

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    console.log('hello')
    const email = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    const user = await db.query("SELECT email FROM administrators WHERE email = $1",[email])
    if (user.length != 0) {
        const token = jwt.sign({
            email
        }, JWT_SECRET);
        res.json({
            token
        })
    }
    else {
        res.status(411).json({
            message: "Incorrect email and pass"
        })
    }
});

router.post('/issue', administratorMiddleware, async (req, res) => {
    // Implement course creation logic
    const {department,issue,labNo,status} = req.body;
    const newIssue = await db.query("INSERT INTO issues (department,issue,labNo,status) VALUES ($1,$2,$3,$4)",[{department},{issue},{labNo},{status}])
    console.log(issue);
    res.json({
        message: 'Issue created successfully', issueId: newIssue._id
    })

});

router.post('/permission', administratorMiddleware, async (req, res) => {

    const a = req.body.email;
    const b = req.body.password;
    const c = req.body.phonenumber;
    console.log(req.body);
    await db.query("INSERT INTO admins (email,password,status,phonenumber) VALUES ($1,$2,$3,$4)",[a,b,"admin",c]);
    res.json({
        message: 'Admin created succesfully'
    })
})

router.delete('/delete/:adminId', administratorMiddleware, async (req, res) => {
    await db.query("DELETE FROM admins WHERE id=$1",req.params.adminId);
    
    const response = await db.query("SELECT * FROM admins")
    res.json({
        courses: response
    })

})
router.get('/showIssue', async (req, res) => {

    const response = await db.query("SELECT * FROM issues");
    console.log(response);
    res.json({
        issue: response
    })
})
module.exports = router;