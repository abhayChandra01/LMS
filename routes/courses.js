var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.get("/displayallcourses",function(req,res){

    pool.query("select C.*,(select D.departmentname from department D where D.departmentid=C.departmentid)as departmentname from courses C",function(error,result){

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

router.post("/displaycourses",function(req,res){

    console.log(req.body.departmentid)
    pool.query("select * from courses where departmentid=?",[req.body.departmentid],function(error,result){

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




router.post('/editcourseicon',upload.single("courseicon"), function(req, res, next) {
  
    pool.query("update courses set courseicon=? where courseid=?",[req.filename,req.body.courseid],function(error,result){
    
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({result:true,msg:'Icon Updated'})

        }


    })


});

router.post('/editcourse', function(req, res, next) {
    pool.query("update courses set departmentid=?,coursename=?,semesters=?,feepersem=? where courseid=?",[req.body.departmentid,req.body.coursename,req.body.semesters,req.body.feepersem,req.body.courseid],function(error,result){
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

router.post('/deletecourse', function(req, res, next) {
  
    pool.query("delete from courses where courseid=?",[req.body.courseid],function(error,result){
    
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



router.post("/displayallsemesters",function(req,res){
    console.log(req.query.courseid)
    pool.query("select semesters from courses where courseid=?",[req.body.courseid],function(error,result){

        if(error)
        {
            console.log(error)
            res.status(500).json({result:[]})
        }
        else
        {
            console.log(result)
            res.status(200).json({result:result})   
        }


    })

})

router.post('/addcourse',upload.single("courseicon"), function(req, res, next) {
  
    pool.query("insert into courses (departmentid,coursename,semesters,feepersem,courseicon) value(?,?,?,?,?)",[req.body.departmentid,req.body.coursename,req.body.semesters,req.body.feepersem,req.filename],function(error,result){

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









module.exports = router;
