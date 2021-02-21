pragma solidity >=0.4.22 <0.9.0;

contract DappToken {
    string public name = "DApp Token";

    string public symbol = "DAPP";

    string public standard = "DApp Token v1.0";

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value);
    }
}
