const express = require('express')
const router = express.Router()

//dohvati podatke o proizvodima iz mydata.js
const data = require('../data/mydata.js')

router.get('/', (req, res) => {
    res.redirect('/home/getCategories')
})


router.get('/getCategories', (req, res) => {
    category = {"name": 'Kategorija nije odabrana'}
    total = req.session.total || 0
    res.render('home', {data: data, category: category, total: total});
})


router.use((req, res, next) => {
    if (!req.session.counters) {
        var counters = {};

        //inicijaliziraj brojac svakog proizvoda na 0
        data.categories.forEach(category => {
            category.products.forEach(product => {
                if(typeof counters[product.name] === 'undefined'){
                    counters[product.name] = 0
                }
            })
        })

        req.session.counters = counters;
        req.session.total = 0
    }
    next();
})

router.get('/getProducts/:id', (req, res) => {
    console.log('home')
    const categories = data.categories
    const id = req.params.id
    const product = categories.find(category => category.name === id)

    if (!product) {
        return res.status(404).render('404', { title: 'Not Found' });
    }

    const productCounters = {}
    product.products.forEach(product => {
        productCounters[product.name] = req.session.counters[product.name]
    })

    total = req.session.total
    res.render('home', {data: data, category: product, products: product.products, id: id, count: productCounters, total: total});
    
})



module.exports = router