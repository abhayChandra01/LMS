var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')
var fs = require('fs')

router.get("/displayalldepartment",function(req,res){

    pool.query("select * from department",function(error,result){

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

router.get("/displayallfaculties",function(req,res){

    pool.query("select F.*,(select D.departmentname from department D where D.departmentid=F.department) as departmentname,(select S.statename from states S where S.stateid=F.state) as statename,(select C.cityname from cities C where C.cityid=F.city) as cityname from faculty F",function(error,result){

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

router.post('/editdepartment', function(req, res, next) {
    pool.query("update department set departmentname=? where departmentid=?",[req.body.departmentname,req.body.departmentid],function(error,result){
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

router.post('/editfaculty', function(req, res, next) {
    pool.query("update faculty set firstname=?,lastname=?,fathersname=?,gender=?,dob=?,qualification=?,department=?,address=?,state=?,city=?,mobileno=?,altmobileno=?,email=?,designation=?,password=? where facultyid=?",[req.body.firstname,req.body.lastname,req.body.fathersname,req.body.gender,req.body.dob,req.body.qualification,req.body.department,req.body.address,req.body.state,req.body.city,req.body.mobileno,req.body.altmobileno,req.body.email,req.body.designation,req.body.password,req.body.facultyid],function(error,result){
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


router.post('/editicon',upload.single("icon"), function(req, res, next) {
  
    pool.query("update department set icon=? where departmentid=?",[req.filename,req.body.departmentid],function(error,result){
    
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

router.post('/editphoto',upload.single("photo"), function(req, res, next) {
  
    pool.query("update faculty set photo=? where facultyid=?",[req.filename,req.body.facultyid],function(error,result){
    
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({result:true,msg:'Photo Updated'})

        }


    })


});


router.post('/deletedepartment', function(req, res, next) {
  
    pool.query("delete from department where departmentid=?",[req.body.departmentid],function(error,result){
    
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({result:true,msg:'Deleted'})
           //fs.unlink('D:/Abhay/lms_backend/public'+req.body.icon)
        }


    })


});

router.post('/deletefaculty', function(req, res, next) {
  
    pool.query("delete from faculty where facultyid=?",[req.body.facultyid],function(error,result){
    
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({result:true,msg:'Deleted'})
           //fs.unlink('D:/Abhay/lms_backend/public'+req.body.icon)
        }


    })


});


router.post('/adddepartment',upload.single("icon"), function(req, res, next) {
  
    pool.query("insert into department (departmentname,icon) value(?,?)",[req.body.departmentname,req.filename],function(error,result){

        if(error)
        {
            console.log(error)
            res.status(500).json({result:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({result:true,msg:'Submitted'})

        }


    })


});
router.post('/addfaculty',upload.single("photo"), function(req, res, next) {
  
    pool.query("insert into faculty (firstname,lastname,fathersname,gender,dob,qualification,department,address,state,city,mobileno,altmobileno,email,designation,password,photo) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.fathersname,req.body.gender,req.body.dob,req.body.qualification,req.body.departmentname,req.body.address,req.body.state,req.body.city,req.body.mobileno,req.body.altmobileno,req.body.email,req.body.designation,req.body.password,req.filename],function(error,result){

        if(error)
        {
            console.log(error)
            res.status(500).json({aresult:false,amsg:'Server Error'})

        }
        else
        {
            res.status(200).json({aresult:true,amsg:'Submitted'})

        }


    })


});

module.exports = router;
