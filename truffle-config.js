const path = require("path");
// var  HDWalletProvider = require('./client/node_modules/truffle-hdwallet-provider');

// var infura_apikey = "";
// var mnemonic = "";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" //Match any network id
        },
        // ropsten: {
        //   /*provider: () => new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/" + infura_apikey),
        //   network_id: 3*/
        // provider: () => new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/" + infura_apikey),
        // network_id: 3,
        // gas: 3000000,
        // gasPrice: 10000000000
        // }
    },
    compilers: {
      solc: {
        version: "0.8.0",
      }
    },

    contracts_build_directory: path.join(__dirname, "client/src/contracts")
};
