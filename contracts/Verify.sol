pragma solidity 0.5.16;
contract Verify {
    address owner;
        constructor() public payable {
        owner=msg.sender;
    }
    
   modifier onlyOwner() {
        require(msg.sender == owner, 'not allawed');
        _;
    }
       
       function withdrawAll() public onlyOwner{
        uint256 totalAmount = address(this).balance;
        msg.sender.transfer(totalAmount);
       
   }
    
    function isContract() public view returns(bool){
      uint32 size;
      address adr = msg.sender;
      assembly {
        size := extcodesize(adr)
      }
      return (size > 0);
    }
    
   
}
contract Check {
    bool public checked;
    Verify v;
    constructor(address _v) public {
        v = Verify(_v);
        
        checked = v.isContract();
    
    }
    function isContract(address addr) public view returns (bool) {
    bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
    bytes32 codehash;
    assembly {
        codehash := extcodehash(addr)
    }
    return (codehash != 0x0 && codehash != accountHash);
    }
}