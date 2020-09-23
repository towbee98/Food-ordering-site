var express = require('express');
var md5 = require('md5');
var multer = require('multer')
var upload = multer({
    dest: 'public/uploads/'
})
var connection = require('../connection');
var router = express.Router();
var fs = require('fs');
var sess;
router.get('/', function(req, res, next) {
    var invalid = false;
    res.render('restaurant_login', {
        title: 'Restaurant Login',
        invalid: invalid
    });
});
router.get('/signup', function(req, res, next) {
    res.render('restaurant_signup', {
        title: 'Restaurant Login'
    });
});
router.get('/success', function(req, res, next) {
    res.render('registration_success', {
        title: 'Account Created'
    });
});
router.get('/addmenu', function(req, res, next) {
	sess = req.session;
    if(!sess.restaurant){
    	res.redirect('/restaurant');
    }

    connection.query("select * from RESTUARANT_MENUS", function(err, rows) {
        res.render('add_menu',{page_title:"Menu",data:rows});
    });
});
router.get('/delete', function(req, res, next) {
    sess = req.session;
    if(!sess.restaurant){
        res.redirect('/restaurant');
    }
    var type = req.query.type;
    var id = req.query.id;

    var query = connection.query("DELETE FROM RESTUARANT_MENUS WHERE RESTUARANT_MENU_ID = ?", id, function(err, rows) {
        if (err){
            console.log("Error inserting : %s ", err);
            res.redirect('/restaurant/addmenu');
        }
        else {
            res.redirect('/restaurant/addmenu');
        }
    });
});
router.post('/addmenu', upload.single('image'), function(req, res, next) {
    sess = req.session;
    if(sess.restaurant == ""){
    	res.redirect('/restaurant/login');
    }
    console.log(req.files);
    console.log(req.file);
    console.log(req.body);
    var restaurant = sess.restaurant;
    var data = {
        RESTUARANT_ID: restaurant,
        MENU_NAME: req.body.menuname,
        INGREDIENTS: req.body.ingredients,
        PRICE: req.body.price,
        IMAGE: req.file.filename,
        STATUS: '1'
    }
    var query = connection.query("INSERT INTO RESTUARANT_MENUS set ? ", data, function(err, rows) {
        if (err) console.log("Error inserting : %s ", err);
        else {
            var file = 'public/uploads/'+req.file.filename;
            var dest = 'public/uploads/'+rows.insertId;
            fs.rename(file, dest, function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });
            res.redirect('/restaurant/addmenu');
        }
    });
});
router.get('/orders', function(req, res, next) {
	sess = req.session;
    if(!sess.restaurant){
    	res.redirect('/restaurant');
    }
    var restaurant = sess.restaurant;
    connection.query("select * from RESTUARANT_MENUs_ORDERS orders JOIN RESTUARANT_MENUS menu ON orders.MENU = menu.RESTUARANT_MENU_ID AND menu.RESTUARANT_ID = ?",[restaurant], function(err, rows) {
		if(err)
                console.log("Error Selecting : %s ",err );
        console.log(rows);
        res.render('orders',{page_title:"Orders",data:rows});
    });
});
router.post('/orders', function(req, res, next) {
	sess = req.session;
    if(!sess.restaurant){
    	res.redirect('/restaurant');
    }
    var input = JSON.parse(JSON.stringify(req.body));
    var query = "UPDATE RESTUARANT_MENUs_ORDERS SET DELIVERYDATE = '"+input.deliverydate+"' WHERE MENU_ORDER_ID = "+input.orderid;
    console.log(query);
    connection.query(query, function(err, rows) {
		res.redirect('/restaurant/orders');
    });
});
router.get('/logout', function(req, res, next) {
	sess = req.session;
	sess.restaurant = "";
    res.redirect('/restaurant');
});
router.post('/login', function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var username = input.username;
    var password = md5(input.password);
    connection.query("SELECT * FROM RESTUARANT WHERE username = ? AND password = ?", [username, password], function(err, rows) {
        if (err) console.log("Error Updating : %s ", err);
        if (rows.length > 0) {
            sess = req.session;
            sess.restaurant = rows[0]["RESTUARANT_ID"];
            res.redirect('/restaurant/orders');
        } else {
            var invalid = true
            res.render('restaurant_login', {
                page_title: "Login",
                invalid: invalid
            });
        }
    });
});
router.post('/signup', function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
        FIRSTNAME: input.first_name,
        LASTNAME: input.last_name,
        MIDDLENAME: input.middle_name,
        EMAILADDRESS: input.email,
        USERNAME: input.username,
        PASSWORD: md5(input.password),
        RESTUARANT_NAME: input.restaurant_name,
        RESTUARANT_REG_NO: input.restaurant_reg_no,
        STREET: input.street,
        STREET1: input.street_cont,
        LGA: input.lg,
        STATE: input.state,
        COUNTRY: input.country,
        POSTCODE: input.post_code,
        RESTUARANT_MOBILENUMBER1: input.restaurant_no,
        RESTUARANT_MOBILENUMBER2: input.restaurant_no_two,
        RESTUARANT_TAX_ID: input.restaurant_tax_id,
        RESTUARANT_TAX_AUTHORITY: input.restaurant_tax_authority,
        STATUS: '1'
    }
    var query = connection.query("INSERT INTO RESTUARANT set ? ", data, function(err, rows) {
        if (err) console.log("Error inserting : %s ", err);
        else {
            res.redirect('/restaurant/success');
        }
    });
});
module.exports = router;