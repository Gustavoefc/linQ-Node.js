const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const flash = require('connect-flash')

const linksController = require('./links/LinkController');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const Link = require('./links/Link');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());

app.use(cookieParser('SecretCookies@'));
app.use(session({
  secret: 'SecretCookies@',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());


app.use(bodyParser.urlencoded({ extended: false })); 

app.use(bodyParser.json());



connection.authenticate().then(() => {
  console.log('conexão com o banco de dados feita com sucesso!')
}).catch(error => {
  console.log(error)
})

app.use('/', linksController);

app.get('/', (req, res) => {
  Link.findAll({
    order: [['id', 'DESC']],
    limit: 3
  }).then(links => {
    res.render('index', {links: links})
  })
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

app.listen(8080, () => {
  console.log('Servidor rodando!')
});