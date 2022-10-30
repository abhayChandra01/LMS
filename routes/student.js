var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/addstudent',upload.any(), function(req, res, next) {

    console.log(req.body)
    
    pool.query("insert into students (enrollmentno, studentname, gender, dob, nationality, category, fathername, mothername, currentaddress, currentstate, currentcity, permanentaddress, permanentstate, permanentcity, mobileno, parentmobileno, email, parentoccupation, annualincome, aadharno, aadhar, domicile, domiciledocument, photo, departmentid, courseid, password) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.enrollmentno,req.body.studentname,req.body.gender,req.body.dob,req.body.nationality,req.body.category,req.body.fathername,req.body.mothername,req.body.currentaddress,req.body.currentstate,req.body.currentcity,req.body.permanentaddress,req.body.permanentstate,req.body.permanentcity,req.body.mobileno,req.body.parentmobileno,req.body.email,req.body.parentoccupation,req.body.annualincome,req.body.aadharno,req.files[0].filename,req.body.domicile,req.files[1].filename,req.files[2].filename,req.body.departmentid,req.body.courseid,req.body.password],function(error,result){

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

router.post('/editaadhar',upload.single("aadhar"), function(req, res, next) {
  
    pool.query("update students set aadhar=? where studentid=?",[req.filename,req.body.studentid],function(error,result){
    
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({result:true,msg:'Aadhar Updated'})

        }


    })


});

router.post('/editstudent', function(req, res, next) {
    pool.query("update students set enrollmentno=?, studentname=?, gender=?, dob=?, nationality=?, category=?, fathername=?, mothername=?, currentaddress=?, currentstate=?, currentcity=?, permanentaddress=?, permanentstate=?, permanentcity=?, mobileno=?, parentmobileno=?, email=?, parentoccupation=?, annualincome=?, aadharno=?, domicile=?, departmentid=?, courseid=?, password=? where studentid=?",[req.body.enrollmentno,req.body.studentname,req.body.gender,req.body.dob,req.body.nationality,req.body.category,req.body.fathername,req.body.mothername,req.body.currentaddress,req.body.currentstate,req.body.currentcity,req.body.permanentaddress,req.body.permanentstate,req.body.permanentcity,req.body.mobileno,req.body.parentmobileno,req.body.email,req.body.parentoccupation,req.body.annualincome,req.body.aadharno,req.body.domicile,req.body.departmentid,req.body.courseid,req.body.password,req.body.studentid],function(error,result){
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


router.post('/editdomicile',upload.single("domiciledocument"), function(req, res, next) {
  
    pool.query("update students set domiciledocument=? where studentid=?",[req.filename,req.body.studentid],function(error,result){
    
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false,msg:'Server Error'})

        }
        else
        {
            res.status(200).json({result:true,msg:'Domicile Updated'})

        }


    })


});

router.post('/editphoto',upload.single("photo"), function(req, res, next) {
  
    pool.query("update students set photo=? where studentid=?",[req.filename,req.body.studentid],function(error,result){
    
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



router.get("/displayallstudents",function(req,res){

    pool.query("select S.*,(select D.departmentname from department D where D.departmentid=S.departmentid)as departmentname,(select C.coursename from courses C where C.courseid=S.courseid)as coursename,(select S.statename from states S where S.stateid=S.currentstate) as currentstatename,(select C.cityname from cities C where C.cityid=S.currentcity) as currentcityname,(select S.statename from states S where S.stateid=S.permanentstate) as permanentstatename,(select C.cityname from cities C where C.cityid=S.permanentcity) as permanentcityname from students S",function(error,result){

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

router.post('/deletestudent', function(req, res, next) {
  
    pool.query("delete from students where studentid=?",[req.body.studentid],function(error,result){
    
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