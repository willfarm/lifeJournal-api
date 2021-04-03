const moment = require('moment');
var appleReceiptVerify = require('node-apple-receipt-verify')
var User = require('../user.model')

appleReceiptVerify.config({
  secret: process.env.APPLE_SHARED_SECRET,
  environment: [process.env.APPLE_APP_STORE_ENV],
  excludeOldTransactions: true,
});

  exports.newSubscription = async (req, res) => {
    var { user, iapRecipt } = req.body
    iapRecipt = iapRecipt.replace(/-/g, '+')
    iapRecipt = iapRecipt.replace(/_/g, '/')
    
    try {
        // attempt to verify receipt
        var products = await appleReceiptVerify.validate({
          excludeOldTransactions: true,
          receipt: iapRecipt
        });
        // check if products exist
        if (Array.isArray(products)) {
          console.log(products[0])
          // get the latest purchased product (subscription tier)
          let { expirationDate } = products[0];
          // convert ms to secs 
          let expirationUnix = Math.round(expirationDate / 1000);

          var u = await User.findOneAndUpdate({_id : user}, 
            {iapExpirationDate : expirationUnix,
            iapReceipt : iapRecipt,
            subscriptionStatus : "subscribed"})
          // // persist in database
          // User.findOneAndUpdate({_id : user}, 
          //   {iapExpirationDate : expirationUnix,
          //   iapReceipt : iapRecipt,
          //   subscriptionStatus : "subscribed"})
          u.save()
          .then(user => res.status(200).send({message: 'success verifying new subscription', user: user}))
          .catch(err => res.status(400).send({message: `can't find user by id`, error: err}))
       }
      } catch(e) {
       // transaction receipt is invalid
       console.log(e)
       res.status(400).send({message: "invalid receipt", error: e})
      }

  }
  exports.renewOrCancelSubscriptions = async _ => {
    let m = moment().unix()
    console.log(m)
      //find users where their subscription expiration date is past now ($lte = less than or equal to)
      User.find({  iapExpirationDate: {$lte: moment().unix()}})
      .then((users) => {
        if (users) {
          
          async function validate(user) {
            console.log("userID: " + user._id)

            console.log("userReceipt: " + user.iapReceipt)
            try {
              let iapReceipt = user.iapReceipt
              console.log(iapReceipt)
              // re-verify receipt to get the latest subscription status
              let purchases = await appleReceiptVerify.validate({
                receipt: iapReceipt
              }); 
              // no active transactions (cancelled or expired subscription)
              if(purchases.length === 0) {
                console.log("no active transations")
                user.iapReceipt = undefined
                user.iapExpirationDate = undefined
                user.freeTrialElegible = false
                user.subscriptionStatus = "unSubscribed"
                user.save()
              }
              // active purchases returned with latest expiry timestamp
              if (purchases.length !== 0) {
                console.log("active transations")
                // get the latest purchase from receipt verification
                const latestPurchase = purchases[0];
                // reformat the expiration date as a unix timestamp
                let latestExpiryTimestamp = latestPurchase.expirationDate;
                let productId = latestPurchase.productId;
                latestExpiryTimestamp = Math.round(latestExpiryTimestamp / 1000);
                user.iapExpirationDate = latestExpiryTimestamp
                user.iapReceipt = latestPurchase.receipt
                user.save()
              }
            } catch (error) {
              // console.log(error)
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
