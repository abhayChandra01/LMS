var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.get("/displayallsubjects",function(req,res){

    pool.query("select S.*,(select D.departmentname from department D where D.departmentid=S.departmentid)as departmentname,(select C.coursename from courses C where C.courseid=S.courseid)as coursename from subjects S",function(error,result){

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

router.post("/displayallcoursesbyid",function(req,res){

    console.log(req.body);
    pool.query("select S.*,(select D.departmentname from department D where D.departmentid=S.departmentid)as departmentname,(select C.coursename from courses C where C.courseid=S.courseid)as coursename from subjects S where S.departmentid=?",[req.body.departmentid],function(error,result){

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

router.post('/editsubject', function(req, res, next) {
    pool.query("update subjects set departmentid=?, courseid=?, semesters=?, subjectname=?, subjecttype=?, subjectmarks=? where subjectid=?",[req.body.departmentid,req.body.courseid,req.body.semesters,req.body.subjectname,req.body.subjecttype,req.body.subjectmarks,req.body.subjectid],function(error,result){
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

router.post('/addsubject', function(req, res, next) {

    console.log(req.body)
  
    pool.query("insert into subjects (departmentid,courseid,semesters,subjectname,subjecttype,subjectmarks) value(?,?,?,?,?,?)",[req.body.departmentid,req.body.courseid,req.body.semesters,req.body.subjectname,req.body.subjecttype,req.body.subjectmarks],function(error,result){

        if(error)
        {
            res.status(500).json({aresult:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({aresult:true,msg:'Submitted'})

        }


    })


});

router.post('/deletesubject', function(req, res, next) {
  
    pool.query("delete from subjects where subjectid=?",[req.body.subjectid],function(error,result){
    
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

router.post("/displaysubject",function(req,res){

    console.log(req.body)
    pool.query("select * from subjects where courseid=? and semesters=?",[req.body.courseid,req.body.semesters],function(error,result){

        if(error)
        {
            console.log(error)
            res.status(500).json({result:[]})
        }
        else
        {
            res.status(200).json({result:result})   
        }


    })

})

router.post("/displaysubjectbycourseid",function(req,res){

    console.log(req.body)
    pool.query("select * from subjects where courseid=?",[req.body.courseid],function(error,result){

        if(error)
        {
            console.log(error)
            res.status(500).json({result:[]})
        }
        else
        {
            res.status(200).json({result:result})   
        }


    })

})







module.exports = router;
