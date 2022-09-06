const express = require(`express`);
const bodyParser = require(`body-parser`)
const methodOverride = require('method-override');

const routes = require('./routes/record');
const app = express();
app.use(methodOverride('_method'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/record', routes);
app.use('/static', express.static('public'));
app.set('view engine', 'ejs');

const port = 3000;
app.listen(port, ()=> {
    console.log(`Port listening ${port}`)
})