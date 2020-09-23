var express = require('express');
var router = express.Router();
var md5 = require('md5');
var connection = require('../connection');

router.get('/', function(req, res, next) {
	connection.query("select * from RESTUARANT_MENUS", function(err, rows) {
		if(err)
                console.log("Error Selecting : %s ",err );
        console.log(rows);
        res.render('index',{page_title:"Menu",data:rows});
    });
});

router.get('/search', function(req, res, next) {
    var search = req.query.q;
    connection.query("select * from RESTUARANT_MENUS WHERE MENU_NAME LIKE ? OR INGREDIENTS LIKE ?",['%'+search+'%','%'+search+'%'], function(err, rows) {
        if(err)
                console.log("Error Selecting : %s ",err );
        console.log(rows);
        res.render('search',{page_title:"Menu",query:search,data:rows});
    });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', {
        title: 'Registration'
    });
});

router.get('/order', function(req, res, next) {
	sess = req.session;
    if(!sess.customer){
    	res.redirect('/login');
    }
	var menu_id = req.query.id;
    if (menu_id){
        if (sess.cart) {
            sess.cart = sess.cart+","+menu_id;
            res.redirect('/order');
        }
        else{
            sess.cart = menu_id;
            res.redirect('/order');
        }
    }
    var menus = sess.cart;
	console.log(menu_id);
    console.log(menus);
 var c = connection.query("select * from RESTUARANT_MENUS WHERE RESTUARANT_MENU_ID in ("+menus+")", function(err, rows) {
//var c = connection.query("select * from RESTUARANT_MENUS WHERE IMAGE in ('"+menus+"')", function(err, rows) {
                if(err)
                console.log("Error Selecting : %s ",err );
        console.log(rows);
        console.log(c.sql)
        res.render('order',{page_title:"Menu",data:rows});
    });
});

router.post('/order', function(req, res, next) {
	sess = req.session;
    if(!sess.customer){
    	res.redirect('/login');
    }
    
    var customer = sess.customer;
    var input = JSON.parse(JSON.stringify(req.body));
    var currentTime = new Date();

    var c = 0;
    while (c < input.quantity.length){
        var data = {
            ORDERDATE: currentTime,
            MENU_QTY: input.quantity[c],
            TOTAL: input.totalprice[0],
            CUSTOMER: customer,
            MENU: input.menu[c],
            STATUS: '1'
        }
        var query = connection.query("INSERT INTO RESTUARANT_MENUs_ORDERS set ? ", data, function(err, rows) {
            console.log(data);
            console.log(query.sql);
            if (err) console.log("Error inserting : %s ", err);
            else {
                console.log("No error occurred");
            }
        });
        c++;
    }
    res.redirect('/ordersuccess');
});

router.get('/login', function(req, res, next) {
    sess = req.session;
    if(sess.customer){
        res.redirect('/myorders');
    }
	var invalid = false;
    res.render('login', {
        title: 'Success',
        invalid:invalid
    });
});

router.post('/login', function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var username = input.username;
    var password = md5(input.password);
    connection.query("SELECT * FROM CUSTOMER_REGISTER WHERE username = ? AND password = ?", [username, password], function(err, rows) {
        if (err) console.log("Error Updating : %s ", err);
        if (rows.length > 0) {
        	sess = req.session;
            sess.customer = rows[0]["CUSTOMER_ID"];
        	res.redirect('/');
        } else {
        	var invalid = true
        	res.render('login',{page_title:"Login",invalid:invalid});
        }
    });
});
router.get('/myorders', function(req, res, next) {
	sess = req.session;
    if(!sess.customer){
    	res.redirect('/login');
    }
    var customer = sess.customer;
    console.log(customer);
    connection.query("select * from RESTUARANT_MENUs_ORDERS orders JOIN RESTUARANT_MENUS menu ON orders.MENU = menu.RESTUARANT_MENU_ID AND orders.customer = ?",[customer], function(err, rows) {
		if(err)
                console.log("Error Selecting : %s ",err );
        console.log(rows);
        res.render('customer_orders',{page_title:"Menu",data:rows});
    });
});
router.get('/ordersuccess', function(req, res, next) {
    res.render('order_success', {
        title: 'Success'
    });
});
router.get('/success', function(req, res, next) {
    res.render('signup_success', {
        title: 'Success'
    });
});
router.post('/signup', function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
        CUSTOMER_FIRSTNAME: input.first_name,
        CUSTOMER_LASTNAME: input.last_name,
        EMAILADDRESS: input.email,
        USERNAME: input.username,
        PASSWORD: md5(input.password),
        RESTUARANT_MOBILENUMBER1: input.phone,
        STREET: input.street,
        STREET1: input.street_cont,
        LGA: input.lga,
        STATE: input.state,
        COUNTRY: input.country,
        POSTCODE: input.post_code,
        STATUS: '1'
    }
    var query = connection.query("INSERT INTO CUSTOMER_REGISTER set ? ", data, function(err, rows) {
        if (err) console.log("Error inserting : %s ", err);
        else {
            res.redirect('/restaurant/success');
        }
    });
});
module.exports = router;