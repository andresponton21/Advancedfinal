const Springboard = artifacts.require('Verify');

const ethers = require('ethers');
const utils = ethers.utils;

const initcode = "0x6394198df1600052600060006004601c335afa80601b57600080fd5b3d600060203e6040516060f3";
function calculateAddress(creatorAddress, salt, initCode) {
   const initCodeHash = utils.keccak256(initCode);
   return utils.getAddress(utils.hexDataSlice(utils.keccak256(
            utils.concat([
            "0xff",
            creatorAddress,
            salt,
            initCodeHash])), 12));
}


contract("Verify", accounts => {
   let Verify;
   before(async() => {
      Verify = await Verify.deployed(); 
   });

   it("Upgrade wallet v1 to v2 should work", async () => {
      let runtimeCode = Wallet.deployedBytecode;
      let tx = await Verify.execute(runtimeCode);
      assert.equal(tx.logs.length, 1, "should have 1 event log");
      assert.equal(tx.logs[0].event, "ContractCreated", "different event");

      // the new wallet contract address is logged in the event log
      let walletAddress =  tx.logs[0].args[0];
      const salt = utils.keccak256(accounts[0]);
      const expectedAddress = calculateAddress(springboard.address, salt, initcode);
      assert.equal(expectedAddress, walletAddress, "address mismatch");

      // check the contract version
      const walletV1 = await Wallet.at(walletAddress);
      let version = await walletV1.version();

      console.log(walletAddress, version);
      assert.equal(version, "1.0", "version should be 1.0");
         
      // Write you code here....
      await walletV1.die()
      runtimeCode = WalletV2.deployedBytecode;
      tx = await springboard.execute(runtimeCode);
      walletAddress =  tx.logs[0].args[0];
      const walletV2 = await WalletV2.at(walletAddress);
      version = await walletV2.version();
      assert.equal(version, "2.0", "version should be 2.0");
   });
});
