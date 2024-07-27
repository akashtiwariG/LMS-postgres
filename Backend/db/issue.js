const { Router } = require("express");
const {db} =require("./index");
const router = Router();

router.get('/', async(req,res) => {

    const response = await db.query("SELECT * FROM issues");
    console.log(response);
    res.json({
        issue: response
    })
})

module.exports = router;