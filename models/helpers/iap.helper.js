var appleReceiptVerify = require('node-apple-receipt-verify')
var User = require('../user.model')

appleReceiptVerify.config({
    secret: process.env.APPLE_SHARED_SECRET,
    environment: [process.env.APPLE_APP_STORE_ENV],
    excludeOldTransactions: true,
  });

  exports.newSubscription = (req, res) => {
    const { uid, iapRecipt } = req.body
    try {
        // attempt to verify receipt
        var products = await appleReceiptVerify.validate({
          excludeOldTransactions: true,
          receipt: iapRecipt
        });
        // check if products exist
        if (Array.isArray(products)) {
          // get the latest purchased product (subscription tier)
          let { expirationDate } = products[0];
          // convert ms to secs 
          let expirationUnix = Math.round(expirationDate / 1000);
          // persist in database
          User.findById(uid)
          .then((user) => {
            user.expirationDate = expirationUnix
            user.iapRecipt = iapRecipt
          })
          .save()
          .then(user => res.status(200).send({message: 'success verifying new subscription', user: user}))
          .catch(err => res.status(400).send({message: `can't find user by id`, error: err}))
       }
      } catch(e) {
       // transaction receipt is invalid
       res.status(400).send({message: "invalid receipt", error: e})
      }

  }