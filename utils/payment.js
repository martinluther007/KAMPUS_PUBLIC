const catchAsync = require('./catchAsync');;
const appError = require('./appError');
const Product = require('./../model/business/productModel');
const User = require('../model/userModel');
const Bookings = require('../model/business/bookingsModel');

exports.makePayment = catchAsync(async(req, res, next) => {
    // 1 get the product and user registered user from our database
    if(!req.body.productId) req.body.productId = req.params.ProductId 
    if(!req.body.user) req.body.user = req.user;
    const product = await Product.findById(req.body.ProductId)
    const user = await User.findById(req.body.user)
    const bookings =await Bookings.findById()
    payWithPaystack(user.email,product.price,)
    

});

var paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', payWithPaystack, false);
function payWithPaystack() {
    var handler = PaystackPop.setup({
      key: 'YOUR_PUBLIC_KEY', // Replace with your public key
      email: document.getElementById('email-address').value,
      amount: document.getElementById('amount').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
      currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
      ref: 'YOUR_REFERENCE', // Replace with a reference you generated
      callback: function(response) {
        //this happens after the payment is completed successfully
        var reference = response.reference;
        alert('Payment complete! Reference: ' + reference);
        // Make an AJAX call to your server with the reference to verify the transaction
      },
      onClose: function() {
        alert('Transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  }

  function payWithPaystack(userEmail,productPrice,bookingsReference) {
    var handler = PaystackPop.setup({
      key: 'pk_test_429e8ed10259bd26dad440b75744a95ead51492c',
      email:userEmail ,
      amount: productPrice* 100,
      currency: 'NGN',
      ref: 'bookingsReference', // Replace with a reference you generated
      callback: function(response) {
        //this happens after the payment is completed successfully
        var reference = response.reference;
        console.log('Payment complete! Reference: ' + reference);
        // Make an AJAX call to your server with the reference to verify the transaction
      },
      onClose: function() {
        console.log('Transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  }

  //<script src="https://js.paystack.co/v1/inline.js"></script> 
