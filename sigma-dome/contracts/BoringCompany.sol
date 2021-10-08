//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract BoringCompany {
    /*
        Who they are: name / address
        Amount: number / uint
        When paid: date / timestamp
        Paid already: true / false / boolean.

        Show Individually first. 
    */

    struct Employee {
        uint256 amount; // amount in Ethers
        uint256 unlockDate; // timestamp.
        bool paid; // initialize to false.
    }

    // address employee; // Need to keep track of
    mapping(address => Employee) public employees;

    address public companyAdmin;

    // On initial deployment of the contract.
    constructor() {
        companyAdmin = msg.sender;
        console.log("CompanyAdmin address:", companyAdmin);
    }

    function addEmployee(address _employee, uint256 _unlockDate) external payable {
        require(msg.sender == companyAdmin, "Only admin can add employees");
        require(_employee != companyAdmin, "CompanyAdmin is not employee");
        require(employees[msg.sender].amount == 0, "Employee exists"); // check if already added / stll dont get the index part
        employees[_employee] = Employee(msg.value, block.timestamp + _unlockDate, false);
        // console.log('Added Employee', employee );
    }

    function withdraw() external returns(bool) {
        Employee storage employee = employees[msg.sender];
        // require(employee.unlockDate <= block.timestamp, 'too early');
        require(employee.amount > 0, "only employee can withdraw");
        require(employee.paid == false, "already paid");
        employee.paid = true;
        payable(msg.sender).transfer(employee.amount);
        return true;
    }
}

/*
    SPDX ✅
    Pragma Compiler. ✅
    BoringCompany Contract ✅
    Constructor.✅
    Employee Properties
    How to map it correctly. 

    Constructor

    Function: Add Employee (OnlyCompany)

    Function: Withdraw


*/
