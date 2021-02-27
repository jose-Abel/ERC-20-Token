const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: "7545",
      network_id: "*"
    },
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(
        "female theory open congress firm there jewel detail trim hub hip cousin",
        "https://rinkeby.infura.io/v3/f5675b420d8545948863cf7087b28a4e")
        },
        network_id: 4
    }
  }
}

