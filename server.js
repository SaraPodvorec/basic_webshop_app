const express = require('express')
const path = require('path')
const app = express()
const session = require('express-session')


//postavi template engine
app.set('view engine', 'ejs')

//bitno jer govori gdje se traže views
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))


app.use(session({
    secret: 'web lab2',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000 //24 h
    }
}))

const homeRouter = require('./routes/home.routes')
const cartRouter = require('./routes/cart.routes')

app.use('/home', homeRouter)
app.use('/cart', cartRouter)

//kad se upiše samo localhost:300
app.get('/', (req, res) => {
    res.redirect('/home/getCategories');
});

//za nepostojeći page
app.use(function(req, res, next) {
    res.status(404).render('404', { title: 'Not Found' });
});

app.listen(3000)