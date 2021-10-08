const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BoringCompany", function () {
  it("Company Admin", async function () {
    const BoringCompany = await ethers.getContractFactory("BoringCompany");
    // let accounts = await web3.eth.getAccounts();
    // const deployer = accounts[0];
    const boringCompany = await BoringCompany.deploy();
    await boringCompany.deployed();

    console.log("BoringCompany deployed to:", boringCompany.address);
    
    expect(await boringCompany.companyAdmin()).to.equal(boringCompany.signer.address);
  });

  it("Company Admin 2", async function () {
    const BoringCompany = await ethers.getContractFactory("BoringCompany");
    const [owner, addr1] = await ethers.getSigners();
    const boringCompany = await BoringCompany.deploy();
    await boringCompany.deployed();

    console.log("owner", owner.address);
    // employees[_employee] = Employee(_amount, block.timestamp + 10, false);

    expect(await boringCompany.companyAdmin()).to.equal(owner.address);
  });

  it("Add Two Employees", async function () {
    const BoringCompany = await ethers.getContractFactory("BoringCompany");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const boringCompany = await BoringCompany.deploy();
    await boringCompany.deployed();

    // console.log('Employee Struct', addr1);
    await boringCompany.addEmployee(addr1.address, 100000);

    // var balance = await instance.balanceOf(account);
    // console.log(balance);    
    expect(await boringCompany.employees(addr1.address));
    expect(await boringCompany.employees(addr2.address));
  });

  it("Withdraw from Address 1", async function () {
    const BoringCompany = await ethers.getContractFactory("BoringCompany");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const boringCompanyToken = await BoringCompany.deploy();
    await boringCompanyToken.deployed();
    const provider = ethers.provider;

    const balance = await provider.getBalance(owner.address);
    const address1Balance = await provider.getBalance(addr1.address);
    // console.log('addr1 add', addr1.address); // 0
    console.log(balance.toString()); // 0
    console.log(address1Balance.toString()); // 0

    // const balance = await prov.getBalance(address);
    // const ownerBalance = await (owner.address);
    const addEmployee = await boringCompanyToken.addEmployee("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", 1, {value: "1000000000000000000000"});
    await addEmployee.wait();

    // console.log(await boringCompanyToken.employees("0x70997970C51812dc3A010C7d01b50e0d17dc79C8"));
    // await boringCompanyToken.withdraw("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", 1, {value: "1000000000000000000000"});
    // console.log('Owner Balance', ownerBalance)
    // console.log('Address 1 Balance', currentBalance)
    await addr1.sendTransaction({
      to: addr2.address,
      value: ethers.utils.parseEther("10") // 1 ether
    })

    console.log('SENT', addr1.address, address1Balance.toString()); // 0

    // await boringCompany.addEmployee(, 1);
    const withdraw = await boringCompanyToken.connect(addr1).withdraw();
    await withdraw.wait();
    console.log(addr1.address, address1Balance.toString()); // 0
    // console.log(address1Balance.toString()); // 0

    // expect(await addr1.balanceOf()).to.greaterThan(currentBalance);
  });
  

});
