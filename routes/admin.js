var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

//TESTING

    router.post('/checkadminlogin',function(req, res, next) {

        pool.query("select * from administrator where emailid=? and password=?",[req.body.emailid,req.body.password],function(error,result){

            if(error)
            {
                res.status(500).json({result:false})
            }
            else
            {
                if(result.length==0)
                {
                    res.status(200).json({result:false})
                }
                else
                {
                    res.status(200).json({result:true,data:result[0]})
                }

            }


        })

    })

    router.post('/checkfacultylogin',function(req, res, next) {

        pool.query("select F.*,(select D.departmentname from department D where D.departmentid=F.department)as departmentname from faculty F where F.email=? and F.password=?",[req.body.emailid,req.body.password],function(error,result){

            if(error)
            {
                res.status(500).json({result:false})
            }
            else
            {
                if(result.length==0)
                {
                    res.status(200).json({result:false})
                }
                else
                {
                    res.status(200).json({result:true,data:result[0]})
                }

            }


        })

    })

module.exports = router;