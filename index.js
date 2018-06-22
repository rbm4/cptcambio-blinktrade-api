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


function getDepositAddress(name, passwd, broker, res) {
    
    blinktradeSocket.connect().then(function() {
      return blinktradeSocket.login({ username: name, password: passwd, brokerId: broker });
    }).then(function(logged) {
      blinktradeSocket.requestDeposit().then(function(deposit) {
        res.json(deposit);
      });
    });
  }


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/:method/:userKey/:passwd/:broker', function (req, res) {
    if (req.params.method == "login"){
      login(req.params.userKey,req.params.passwd,req.params.broker,res)
    } else if ('new_deposit'){
      getDepositAddress(req.params.userKey,req.params.passwd,req.params.broker,res)  
    }
        
  })
  .get('/new_deposit/:userKey/:passwd/:broker', function (req, res) { 
    
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
