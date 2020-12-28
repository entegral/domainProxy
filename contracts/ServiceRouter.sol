// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract ServiceRouter {
	mapping (string => address) services;
	address owner;
	string public publisher;

	event UpdateNotification(
		string indexed _name, 
		address indexed _newAddress
	);

	constructor(string memory _publisher) {
		publisher = _publisher;
		owner = msg.sender;
	}

	modifier isOwner () {
		require(msg.sender == owner, 'only contract owner can add a new service address');
		_;
	}

	function addService(address _service, string memory _name) public isOwner returns(bool) {
		services[_name] = _service;
		emit UpdateNotification(_name, _service);
		return true;
	}

	function getServiceAddress(string memory _name) public view returns(address){
		return services[_name];
	}

}
