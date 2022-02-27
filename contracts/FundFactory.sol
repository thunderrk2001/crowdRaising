// SPDX-License-Identifier: MIT
import './Fund.sol';
pragma solidity >=0.4.22 <0.9.0;
contract FundFactory{
  address[] public funds;
  function createFund(address _manager,string  memory _fundName,string memory _desc,uint  _minAmount) public{
    funds.push(address(new Fund(_manager,_fundName,_desc,_minAmount)));
  }
  function getFundsDetails() public view returns(address [] memory){
    return funds;
  }
}
