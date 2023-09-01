// contracts/BoxV2.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BoxV2 is Initializable, OwnableUpgradeable {
    uint256 private value;
    uint256 public x;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    function setup() public {
        x = 700;
    }

    function initialize(uint256 _value, address _owner) public initializer {
        __Ownable_init();
        transferOwnership(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
    }

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }

    // Increments the stored value by 1
    function increment() public {
        value = value + 1;
        emit ValueChanged(value);
    }

    function setX(uint256 newValue) public onlyOwner {
        x = newValue;
    }

    function getValue() public view returns (uint256) {
        return x;
    }
}
