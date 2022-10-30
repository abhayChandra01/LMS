var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/addunit', function(req, res, next) {

    console.log(req.body)
  
    pool.query("insert into units (departmentid,courseid,subjectid,unitno,title,description) value(?,?,?,?,?,?)",[req.body.departmentid,req.body.courseid,req.body.subjectid,req.body.unitno,req.body.title,req.body.description],function(error,result){

        if(error)
        {
            console.log(error)
            res.status(500).json({aresult:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({aresult:true,msg:'Submitted'})

        }


    })


});

router.get("/displayallunits",function(req,res){

    pool.query("select U.*,(select D.departmentname from department D where D.departmentid=U.departmentid)as departmentname,(select C.coursename from courses C where C.courseid=U.courseid)as coursename,(select S.subjectname from subjects S where S.subjectid=U.subjectid)as subjectname from units U",function(error,result){

        if(error)
        {
            res.status(500).json({result:[]})
        }
        else
        {
            res.status(200).json({result:result})   
        }


    })

})

router.post('/editunit', function(req, res, next) {
    console.log(req.body)
    pool.query("update units set departmentid=?,courseid=?,subjectid=?,unitno=?,title=?,description=? where unitid=?",[req.body.departmentid,req.body.courseid,req.body.subjectid,req.body.unitno,req.body.title,req.body.description,req.body.unitid],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({result:true,msg:'Updated'})

        }


    })

})



router.post('/deleteunit', function(req, res, next) {
  
    pool.query("delete from units where unitid=?",[req.body.unitid],function(error,result){
    
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({result:true,msg:'Deleted'})
        }


    })


});



module.exports = router;
