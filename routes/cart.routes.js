const express = require('express')
const router = express.Router()

//dohvati podatke o proizvodima iz mydata.js
const data = require('../data/mydata.js')

router.get('/add/:id', (req, res) => {
    console.log('add')
    const id = req.params.id
    let total = req.session.total || 0

    const category = data.categories
    let itemExists = false

    for (let i = 0; i < category.length; i++) {
        itemExists = category[i].products.some(item => item.name === id)
        if (itemExists) {
            break
        }
    }

    if(!itemExists){
        console.log('ne postoji')
        res.status(404).render('404', { title: 'Not Found' });
    }else {
        if (!req.session.cart) {
            req.session.cart = {}
        }
    
        const cart = req.session.cart
    
        if (!req.session.counters) {
            req.session.counters = {}
        }
    
        const counters = req.session.counters
        counters[id] = (counters[id] || 0) + 1
        total++
    
        cart[id] = counters[id]
    
        req.session.cart = cart
        req.session.counters = counters
        req.session.total = total
    
    
        //res.render('cart', {category: category, cart: cart, data: data, total: total})
        res.redirect('/cart/getAll')
    }
})



router.get('/remove/:id', (req, res) => {
    console.log('remove')
    const id = req.params.id
    const cart = req.session.cart

    if (!cart) {
        return res.status(404).render('404', { title: 'Not Found' });
    }

    const counters = req.session.counters
    let total = req.session.total

    if(cart.hasOwnProperty(id)){
        if(cart[id] > 0){
            counters[id]--
            cart[id]--
            total--
        }
    
        if(cart[id] === 0) {
            delete cart[id]
        }
        
        req.session.cart = cart
        req.session.counters = counters
        req.session.total = total

        //res.render('cart', {category: category, cart: cart, data: data, total: total})
        res.redirect('/cart/getAll')

    }else{
        res.status(404).render('404', { title: 'Not Found' });
    }
})

router.get('/getAll', (req, res) => {
    const category = {"name": ''}
    var cart = req.session.cart || {}
    let total = req.session.total || 0

    res.render('cart', {category: category, cart: cart, data: data, total: total})
})

module.exports = router