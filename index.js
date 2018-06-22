const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000




var BlinkTradeWS = require("blinktrade").BlinkTradeWS;
var blinktradeSocket = new BlinkTradeWS({ prod: true });



function login(name,passwd,broker,res){
  blinktradeSocket.connect().then(function() {
      return blinktradeSocket.login({ username: name, password: passwd, brokerId: broker });
    }).then(function(logged) {
      res.json(logged);
    });
  }


function getDepositAddress(req, res) {
    
    blinktradeSocket.connect().then(function() {
      return blinktradeSocket.login({ username: name, password: passwd, brokerId: broker });
    }).then(function(logged) {
      res.json(logged);
    //  blinktradeSocket.requestDeposit().then(function(deposit) {
    //    console.log(deposit);
    //  });
    });
  }


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/login/:userKey/:passwd/:broker', function (req, res) {
        login(req.params.userKey,req.params.passwd,req.params.broker,res)
  })
  .get('/new_wallet', function (req, res) { 
    res.send('GET request to the new_wallet');
  })
  .get('/blinktrade/info', (req, res) => res.render('pages/blinktrade_info'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
