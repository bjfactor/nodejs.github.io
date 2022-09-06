const express = require(`express`);
const bodyParser = require(`body-parser`)

const routes = require('./routes/record');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/remote', routes);

app.set('view engine', 'ejs');

const port = 3000;
app.listen(port, ()=> {
    console.log(`Port listening ${port}`)
})