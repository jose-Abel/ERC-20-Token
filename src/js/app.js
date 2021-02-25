App = {
  web3Provider: null,
  contracts: [],
  account: "0x0",
  loading: false,

  init: function() {
    console.log("App initialized...")
    return App.initWeb3();
  },

  initWeb3: function() {
    if(typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
      web3 = new Web3(App.web3Provider);
    }

    return App.initContracts();
  },

  initContracts: function() {
    $.getJSON("DappTokenSale.json", function(dappTokenSale) {
      App.contracts.DappTokenSale = TruffleContract(dappTokenSale);

      App.contracts.DappTokenSale.setProvider(App.web3Provider);
      
      App.contracts.DappTokenSale.deployed().then(function(dappTokenSale) {
        console.log("Dapp Token Sale Address: ", dappTokenSale.address);
      })
    }).done(function() {
      $.getJSON("DappToken.json", function(dappToken) {
        App.contracts.DappToken = TruffleContract(dappToken);

        App.contracts.DappToken.setProvider(App.web3Provider);
        
        App.contracts.DappToken.deployed().then(function(dappToken) {
          console.log("Dapp Token Address: ", dappToken.address);
        });
        return App.render();
      });
    });
  },

  render: function() {
    if(App.loading) {
      return;
    }

    App.loading = true;

    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App.contracts.DappTokenSale.deployed().then(function(instance) {
      dappTokenSaleInstance = instance;
      return dappTokenSaleInstance;
    });

    App.loading = false;
    loader.hide();
    content.show();
  } 
}

$(function() {
  $(window).load(function() {
    App.init();
  });
});