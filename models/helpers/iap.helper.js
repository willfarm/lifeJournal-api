const moment = require('moment');
var appleReceiptVerify = require('node-apple-receipt-verify')
var User = require('../user.model')

appleReceiptVerify.config({
  secret: process.env.APPLE_SHARED_SECRET,
  environment: [process.env.APPLE_APP_STORE_ENV],
  excludeOldTransactions: true,
});

  exports.newSubscription = async (req, res) => {
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
  exports.renewOrCancelSubscriptions = async _ => {
      //find users where their subscription expiration date is past now ($lte = less than or equal to)
      User.find({expirationDate: {$lte: moment().unix()}})
      .then((users) => {
        if (users) {
          async function validate(user) {
            try {
              let iapReceipt = user.iapReceipt
              // re-verify receipt to get the latest subscription status
              let purchases = await appleReceiptVerify.validate({
                receipt: iapReceipt
              }); 
              // no active transactions (cancelled or expired subscription)
              if(purchases.length === 0) {
                user.receipt = undefined
                user.expirationDate = undefined
                user.freeTrialElegible = false
                user.subscriptionStatus = "unSubscribed"
                user.save()
              }
              // active purchases returned with latest expiry timestamp
              if (purchases.length !== 0) {
                // get the latest purchase from receipt verification
                const latestPurchase = purchases[0];
                // reformat the expiration date as a unix timestamp
                let latestExpiryTimestamp = latestPurchase.expirationDate;
                let productId = latestPurchase.productId;
                latestExpiryTimestamp = Math.round(latestExpiryTimestamp / 1000);
                user.expirationDate = latestExpiryTimestamp
                user.iapReceipt = latestPurchase.receipt
                user.save()
              }
            } catch (error) {
              console.log(error)
            }
          }
          for (let u of users) { 
            validate(u)
          }
        }
      })
      .catch( e => console.log(e))
  },

  // define service loop and initiate service
  exports.init = async (client) => {
    module.exports.renewOrCancelSubscriptions(client);

    setInterval(async function () {
      module.exports.renewOrCancelSubscriptions(client);
    }, interval)
  }
