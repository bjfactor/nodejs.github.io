const express = require(`express`);
const router = express.Router();

const data = require('./data');

//router to home pages
router.get('/home', (req,res)=>{
    res.status(200).render('pages/home');
})

router.get('/about', (req,res)=>{
    res.status(200).render('pages/about');
})

router.get('/gallery', (req,res)=>{
    res.status(200).render('pages/gallery', {data: data});
})

// router to get the whole data inside server
router.get('/getData', (req,res)=>{
    // res.render('form', {data: data});
    res.status(200).json(data);
})

// router to get the data via ID
router.get('/gallery/:id', (req,res)=>{
    let check = data.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(check) {
        // res.status(200).json(check);
        res.render('pages/profile', {records: check});
    } else {
        res.status(401).send('ID not found!');
    }
});

router.get('/gallery/edit/:id', (req,res)=>{
    let check = data.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(check) {
        // res.status(200).json(check);
        res.render('pages/edit', {records: check});
    } else {
        res.status(401).send('ID not found!');
    }
})

router.put('/gallery/edit/:id', (req,res)=>{
    let id = +req.params.id;
    // console.log(id);
    let body = req.body;
    // console.log(body);
    let index = data.findIndex((df)=>parseInt(df.id) === parseInt(id));
    if (index >= 0) {
        // console.log(`this is index ${index}`);
        let updateData = {id:id, ...body};
        // console.log(`this is variable updateData ${updateData}`)
        data[index] = updateData;
        console.log(updateData);
        res.redirect('/record/gallery');
    } else {
        res.status(401).send('Id does not exist');
    }
});

// router to add new record
// The router middlewear will post the data on the form because there was not path indicated which is = '/'.
router.post('/', (req,res)=>{
    let body = req.body;
    data.push(body);
    console.log(data);
    res.redirect('/record/gallery'); //after posting it will reload back to '/record/gallery' to get the data
})

router.delete('/gallery/edit/:id', (req,res)=>{
    let id = +req.params.id;
    let index = data.findIndex((df)=>parseInt(df.id) === parseInt(id));

    if(index >= 0) {
        data.splice(index, 1);
        res.status(200).redirect('/record/gallery');
    } else {
        res.status(401).send('ID not found!');
    }
})


module.exports = router;