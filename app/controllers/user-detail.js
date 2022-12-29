

const pool = require('../config/database');



exports.detail = async (req, res) => {
    try {
        resp = {};   
    const {userid,title,body,created_by,active,latitude,longitude} = req.body;

    const query = await pool.promise().query( 
        `
        INSERT INTO tbldetail(userID, Title, Body, CreatedBy,Active,latitude,longitude )
                VALUES('${userid}','${title}','${body}','${created_by}','${active}','${latitude}','${longitude}')`
        );
        resp.success = true;
        resp.message = "update successfully"; 
        resp.data = []; 
    // console.log(orderNo);
    
    return res.json(resp);
} catch(err) {
    console.log(err);
    } 
}

exports.count = async (req, res) => {
    try {
        resp = {};   
    const query = await pool.promise().query( 
        `SELECT COUNT(Active) AS Active FROM tbldetail WHERE Active = 1`
        );
    const query2 = await pool.promise().query( 
        `SELECT COUNT(Active) AS Inactive FROM tbldetail WHERE Active = 0`
        );
        query[0][0]['Inactive'] = query2[0][0]['Inactive']

        console.log(query2[0]);
        resp.success = true;
        resp.message = "OK"; 
        resp.data = query[0]; 
    
    return res.json(resp);
} catch(err) {
    console.log(err);
    } 
}