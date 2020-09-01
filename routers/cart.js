const router = require('express').Router()
const Product = require('../models/product')
const auth = require('../config/auth')

const isUser = auth.isUser

/* GET home page. */
router.get('/', isUser, function (req, res) {
    Page.findOne({
        slug: 'home'
    }, (err, page) => {
        if (err) console.log(err)

        res.render('index', {
            layout: 'layout/main_layout',
            title: page.title,
            content: page.content
        })

    })
});

//get add product to cart
router.get('/add/:product', isUser, (req, res) => {
    var slug = req.params.product
    Product.findOne(({
        slug: slug
    }), (err, product) => {
        if (err) console.log(err)
        else {
            if (typeof req.session.cart == 'undefined') {
                req.session.cart = []
                req.session.cart.push({
                    title: slug,
                    qty: 1,
                    price: product.price,
                    image: '/product_images/' + product._id + '/' + product.image
                })
            } else {
                var cart = req.session.cart
                var newItem = true

                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].title == slug) {
                        cart[i].qty++
                        newItem = false
                        break
                    }
                }

                if (newItem) {
                    req.session.cart.push({
                        title: slug,
                        qty: 1,
                        price: product.price,
                        image: '/product_images/' + product._id + '/' + product.image
                    })
                }
            }
            //console.log(req.session.cart)
            req.flash('success_msg', 'Product added!')
            res.redirect('back')
        }
    })
})

//get checkout page
router.get('/checkout', isUser, (req, res) => {
    if (req.session.cart && req.session.cart.length == 0) {
        delete req.session.cart
        res.redirect('/cart/checkout')
    } else {
        res.render('checkout', {
            title: 'Checkout',
            cart: req.session.cart,
            layout: 'layout/main_layout'
        })
    }
})

//get update product
router.get('/update/:product', isUser, (req, res) => {
    var slug = req.params.product
    var cart = req.session.cart
    var action = req.query.action

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].title == slug) {
            switch (action) {
                case 'add':
                    cart[i].qty++;
                    break;
                case 'remove':
                    cart[i].qty--;
                    if (cart[i].qty <= 0) {
                        cart.splice(i, 1);
                        if (cart.length == 0) delete req.session.cart;
                    }
                    break;
                default:
                    console.log('Update problem');
                    break;
            }
        }
        break
    }
    req.flash('success_msg', 'Cart updated!')
    res.redirect('/cart/checkout')
})

//get clear cart
router.get('/clear', isUser, (req, res) => {
    delete req.session.cart

    req.flash('success_msg', 'Cart cleared!')
    res.redirect('/cart/checkout')
})

//get buy now
router.get('/buynow', isUser, (req, res) => {
    delete req.session.cart
    res.sendStatus(200)
})

module.exports = router