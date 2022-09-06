const express = require(`express`);
const router = express.Router();

//We will get the home.ejs using router middlewear
router.get('/home', function(req,res){
    res.status(200).render('pages/home')
})

module.exports = router;