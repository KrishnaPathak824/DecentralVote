/** @type import('hardhat/config').HardhatUserConfig */

require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking:{
        url:'https://eth-mainnet.g.alchemy.com/v2/JXEK-pErvSiCUG-xy0wtDlCOxlTwM2OM'
      }
     
    },
  },
 
};
