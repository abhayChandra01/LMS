var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/fetchallunits', function (req, res) {

  pool.query("select * from units where subjectid = ?", [req.body.subjectid], function (error, result) {

      if (error) {
          res.status(500).json({ result: [] })
      }
      else {
          res.status(200).json({ result: result })
      }
  })
})

router.post('/fetchallsets', function (req, res) {

  console.log(req.body);
  pool.query("select * from createset where subjectid = ?", [req.body.subjectid], function (error, result) {

      if (error) {
          res.status(500).json({ result: [] })
      }
      else {
          res.status(200).json({ result: result })
      }
  })
})

router.post('/addquestion', upload.any(), function (req, res, next) {
 
  if(req.files.length==0){

  
  if (req.body.questionimage == '') 
  { questionimage = 'NONE' }

  if (req.body.image1 == '') 
  { image1 = 'NONE' }
  if (req.body.image2 == '')
  { image2 = 'NONE' }
  if (req.body.image3 == '') 
  { image3 = 'NONE' }
  if (req.body.image4 == '') 
  { image4 = 'NONE' }

  }
  else{

      questionimage='NONE'
      image1='NONE'
      image2='NONE'
      image3='NONE'
      image4='NONE'

      req.files.map((items)=>{

          if(items.fieldname=='questionimage')
          {questionimage=items.filename}

          else if(items.fieldname=='image1')
          {image1=items.filename}

          else if(items.fieldname=='image2')
          {image2=items.filename}

          else if(items.fieldname=='image3')
          {image3=items.filename}

          else if(items.fieldname=='image4')
          {image4=items.filename}



      })
  }


  pool.query("insert into questions (facultyid, department, course, semester, subject, setid, unit, questionno, question, questionimage, option1, image1, option2, image2, option3, image3, option4, image4, correctanswer) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.facultyid, req.body.departmentid, req.body.courseid, req.body.semester, req.body.subjectid, req.body.setid, req.body.unitid, req.body.questionnumber, req.body.question, questionimage, req.body.option1,image1, req.body.option2, image2, req.body.option3,image3, req.body.option4, image4, req.body.correctanswer], function (error, result) {
     
      if (error) {
          console.log(error)
          res.status(500).json({ result: false, msg: 'Server Error....' })
      }
      else {
          console.log(result)
          res.status(200).json({ result: true, msg: 'Submitted....' })
      }

  })

});

router.post('/generatequestionnumber', function (req, res) {

  console.log(req.body);
  pool.query("select count(*) as qno from questions where setid = ?", [req.body.setid], function (error, result) {

      if (error) {
        console.log(error);

          res.status(500).json({ result: [] })
      }
      else {

          if (result[0].qno == null) {

              res.status(200).json({ result: 1 })

          }
          else {

              res.status(200).json({ result: parseInt(result[0].qno) + 1 })
          }
      }
  })
})

router.get('/displayall',function(req,res){
  
  pool.query("select Q.*,(select D.departmentname from department D where D.departmentid = Q.departmentid) as departmentname,(select C.coursename from courses C where C.courseid = Q.courseid) as coursename,(select S.subjectname from subjects S where S.subjectid = Q.subjectid) as subjectname ,(select CR.setno from createset CR where CR.setid = Q.setid) as setno ,(select U.title from units U where U.unitid = Q.unitid) as title from questions Q",function(error,result){
      
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

router.post('/fetchallquestions',function(req,res){
  
    console.log(req.body);
    pool.query("select * from questions where setid=?",[req.body.setid],function(error,result){
        
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
  

router.post('/fetchallquestionno',function(req,res){
  
  pool.query("select Q.*,(select D.departmentname from department D where D.departmentid = Q.departmentid) as departmentname,(select C.coursename from courses C where C.courseid = Q.courseid) as coursename,(select S.subjectname from subjects S where S.subjectid = Q.subjectid) as subjectname ,(select CR.setno from createset CR where CR.setid = Q.setid) as setno ,(select U.title from units U where U.unitid = Q.unitid) as title from questions Q where setid = ?",[req.body.setid],function(error,result){
      
      if(error)
      {   
         res.status(500).json({result:[]})
      }
      else
      {
         res.status(200).json({result:result})
         console.log(result)
      }
  })
})



  module.exports = router;