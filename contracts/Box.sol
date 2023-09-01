// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract Box is Initializable, OwnableUpgradeable {
    uint256 public value;

    function _checkOwner() internal view override(OwnableUpgradeable) {
        console.log("msgSender: ", _msgSender());
        console.log("owner: ", owner());
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function _transferOwnership(
        address newOwner
    ) internal override(OwnableUpgradeable) {
        super._transferOwnership(newOwner);
    }

    function initialize(uint256 _value, address _owner) public initializer {
        __Ownable_init();
        _transferOwnership(msg.sender);
        value = _value;
        console.log(_owner);
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Stores a new value in the contract
    function store(uint256 newValue) public onlyOwner {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
