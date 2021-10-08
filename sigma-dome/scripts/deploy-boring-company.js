const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    const BoringCompanyContract = await hre.ethers.getContractFactory("BoringCompany");
    const boringCompany = await BoringCompanyContract.deploy();
    console.log("My Contract deployed to:", deployer.address);
     d
    console.log("My Contract deployed to:", boringCompany.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    })