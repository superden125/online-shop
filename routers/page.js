var express = require("express");
var router = express.Router();
var Page = require("../models/page");

/* GET home page. */
router.get("/", function (req, res) {
  // Page.findOne({slug: 'home'}, (err, page)=>{
  //    if(err) console.log(err)

  //    res.render('index', {
  //       layout: 'layout/main_layout',
  //       title: page.title,
  //       content: page.content
  //    })

  // })
  res.send("Page");
});

//get a page
// router.get('/:slug',(req,res)=>{
//    var slug = req.params.slug

//    Page.findOne({slug: slug}, (err, page)=>{
//       if(err) console.log(err)

//       if(!page){
//          res.redirect('/')
//       }
//       else{
//          res.render('index', {
//             layout: 'layout/main_layout',
//             title: page.title,
//             content: page.content
//          })
//       }
//    })
// })

module.exports = router;
