const pg = require("pg");

const db = new pg.Client({
    connectionString:"postgresql://Akash:8deEOmFPLHy5@ep-fancy-cell-a529ozuv.us-east-2.aws.neon.tech/LMS?sslmode=require"
})

db.connect();

async function issue(department,issue,labno,status){
    const user = await db.query("INSERT INTO issues  (department,issue,labno,status) VALUES ($1,$2,$3,$4)",[department,issue,labno,status]);
    console.log("created");
}

issue("EE","xyz",1,"notcompleted");

module.exports = {db};
