var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post("/displayallsets",function(req,res){

    pool.query("select CS.*,(select D.departmentname from department D where D.departmentid=CS.departmentid)as departmentname,(select C.coursename from courses C where C.courseid=CS.courseid)as coursename,(select S.subjectname from subjects S where S.subjectid=CS.subjectid)as subjectname from createset CS where CS.facultyid=?",[req.body.facultyid],function(error,result){

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


router.post('/editset', function(req, res, next) {
    console.log(req.body)
    pool.query("update createset set courseid=?, semester=?, subjectid=?, setno=?, time=?, status=?, marks=? where setid=?",[req.body.courseid,req.body.subjectid,req.body.setno,req.body.time,req.body.status,req.body.marks,req.body.setid],function(error,result){
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



router.post('/deleteset', function(req, res, next) {
  
    pool.query("delete from createset where setid=?",[req.body.setid],function(error,result){
    
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


router.post('/addset', function(req, res, next) {

    console.log(req.body)
  
    pool.query("insert into createset (facultyid,departmentid,courseid,semester,subjectid,setno,time,status,marks) value(?,?,?,?,?,?,?,?,?)",[req.body.facultyid,req.body.departmentid,req.body.courseid,req.body.semester,req.body.subjectid,req.body.setno,req.body.time,req.body.status,req.body.marks],function(error,result){

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

router.get('/generateset',function(req,res){

    pool.query("select max(setid) as setnum from createset",function(error,result){

        if(error){

            res.status(500).json({result:[]})
        }
        else{

            if(result[0].setnum == null){

                res.status(200).json({result:1})

            }
            else{
                
                res.status(200).json({result:parseInt(result[0].setnum)+1})
            }
        }
    })
 })



module.exports = router;