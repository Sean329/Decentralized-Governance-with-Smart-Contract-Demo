const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;
const { mine } = require("@nomicfoundation/hardhat-network-helpers");



async function main() {

    const governorAddr = '0x830829d3A9E6d2D280b8130129d466953E286fc1';
    const tokenAddr = '0xC6B817d6b34D367a5e92322735b43B37aa4D72CD';
    const [wallet] = await ethers.getSigners();

    const governor = await ethers.getContractAt("MyGovernor", governorAddr);
    const token = await ethers.getContractAt("MyToken", tokenAddr);

    // await token.delegate(wallet.address);
    // console.log("delegate success");

// async function propose() {
//     const tx = await governor.propose(
//         [token.address],
//         [0],
//         [token.interface.encodeFunctionData("mint", [wallet.address, parseEther("25000")])],
//         "Give the owner more tokens!"
//       );

//     const receipt = await tx.wait();
//     const event =  receipt.events.find(x => x.event === 'ProposalCreated');
//     const { proposalId } =  event.args;

//     await mine(5);
//     console.log("propose success");

//     return proposalId;
// }

// async function vote(_proposalId) {
//     const tx = await governor.castVote(_proposalId, 1);
//     const receipt = await tx.wait();
//     const voteCastEvent = receipt.events.find(x => x.event === 'VoteCast');

//     await mine(16);
//     console.log("vote success");

//     return voteCastEvent;
// }

async function execute() {
    await governor.execute(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [wallet.address, parseEther("25000")])],
        keccak256(toUtf8Bytes("Give the owner more tokens!"))
      );

      console.log("execute success");
}


    // const proposalId = await propose();
    // console.log(proposalId);
    // const voteCastEvent = await vote(BigInt('57714504091114374876215220436830596607257139384924717560829542061356087081987'));
    await execute();

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  