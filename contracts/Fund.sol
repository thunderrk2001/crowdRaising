// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Fund{
    address  public manager;
    string public fundName;
    string public desc;
    uint public minAmount;
    uint public approversCount=0;
    mapping(address=>uint) public approvers;

    struct request{
        string requestName;
        string requestDesc;
        uint requestedAmount;
        address payable receiverAddress;
        uint voteCount;
        bool isCompleted;
        mapping(address=>uint) voters;

    }

    request[] public requests;

    constructor(address _manager,string  memory _fundName,string memory _desc,uint  _minAmount)
    {
        require(bytes(_fundName).length>2 ,"Fund Name should have proper title");
        require(_minAmount>0 ,"Minimum amount of eth shoud greater than 0");
        manager=_manager;
        fundName=_fundName;
        desc=_desc;
        minAmount=_minAmount;

    }
    function donate() public payable
    {   require(msg.value>=minAmount,"Donatation less than minAmount is not accepted");
        if(approvers[msg.sender]==0)
        approversCount=approversCount+1;
        approvers[msg.sender]=approvers[msg.sender]+msg.value;
    }
    function getBalance() public view returns(uint)
    {
        return address(this).balance;
    }
    modifier isManager{
        require(msg.sender==manager,"you dont have authority to create requests");
        _;
    }
    function createRequest(string memory _requestName,string memory _requestDesc,uint _requestedAmount,
    address _receiverAddress
    ) public isManager {
        require(_requestedAmount<=address(this).balance);
        request storage newRequest=requests.push();
        newRequest.requestName=_requestName;
        newRequest.requestDesc=_requestDesc;
        newRequest.requestedAmount=_requestedAmount;
        newRequest.receiverAddress=payable(_receiverAddress);
        newRequest.voteCount=0;
        newRequest.isCompleted=false;
    }
    function voteRequest(uint idx) public payable
    {
        require(idx>=0 && idx<requests.length,"index out of bound for request mapping");
        require(requests[idx].voters[msg.sender]==0,"You already voted");
        requests[idx].voters[msg.sender]=1;
        requests[idx].voteCount++;

    }
    function finaliseAndSend(uint idx) public isManager payable{
        require(idx>=0 && idx<requests.length,"index out of bound for request mapping");
        require(requests[idx].voteCount>=approversCount/2,"NOT majority");
        require(requests[idx].isCompleted==false,"Request Finalised cannot do any tarnsaction");
        require(requests[idx].requestedAmount<=address(this).balance,"Insufuucent balance in fund");
        requests[idx].receiverAddress.transfer(requests[idx].requestedAmount);
        requests[idx].isCompleted=true;
    }

    function getDetails() public view returns(string memory,string memory,address ,uint){
        return(fundName,desc,manager,minAmount);
    }

}
