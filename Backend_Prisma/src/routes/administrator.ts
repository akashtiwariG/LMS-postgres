const { Router } = require("express");
const administratorMiddleware = require("../middleware/administrator");
const router = Router();
const jwt = require("jsonwebtoken");
const { parseArgs } = require("util");
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { Request,Response } from "express";
const JWT_SECRET = require("../config");

router.post('/signin', async (req:Request, res:Response) => {
    // Implement admin signup logic
    const email = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    const user = await prisma.administrators.findFirst({
        where:{
            email:email
        }  
    })
    console.log(user);
    if(user){
        const token = jwt.sign({
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

router.post('/issue', administratorMiddleware, async (req:Request, res:Response) => {
    // Implement course creation logic
    const {department,issue,labno,status} = req.body;
    const newIssue = await prisma.issues.create({
        data:{
            department,
            issue,
            labno,
            status
        }
    })
    
    console.log(issue);
    res.json({
        message:'Issue created successfully',issueId: newIssue.id
    })
});

router.post('/permission', administratorMiddleware, async (req:Request, res:Response) => {

    const a:string = req.body.email;
    const b:string = req.body.password;
    const c:number = req.body.phonenumber;
    console.log(req.body);
    async function createAdmin(email:string,password:string,phonenumber:number,status:string) {
        const res = await prisma.admins.create({
            data:{
                email,
                password,
                phonenumber,
                status
            }
        })
        console.log(res);
    }
    createAdmin(a,b,c,"admin");
    res.json({
        message: 'Admin created succesfully'
    })
})

router.delete('/delete/:email', administratorMiddleware, async (req:Request, res:Response) => {
    
    const _id = req.params.email;
    console.log(_id);
    const response = await prisma.admins.delete({
        where:{
            email:_id
        }

    })
    res.json({
        courses: response
    })

})
router.get('/showIssue', async(req:Request,res:Response) => {

    const response = await prisma.issues.findMany({});
    console.log(response);
    res.json({
        issue: response
    })
})

module.exports = router;