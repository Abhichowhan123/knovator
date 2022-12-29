const jwt = require("jsonwebtoken");

module.exports = {
    checktocken:(req,res,next)=>{
        resp = {}; 
        token = req.get("authorization");
        if(token){
            token = token.slice(7);
            jwt.verify(token,"qwe1234",(err,decoded)=>{
                if(err){
                    resp.success = false;
                    resp.message = "Invalid token"; 
                    resp.data = []; 
                    
                }
                else{
                    next();
                }
            })
        }
        else{
            resp.success = false;
            resp.message = "access denied"; 
            resp.data = []; 
                    
        }
        return res.json(resp)
    }
}