import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, waffle} from 'hardhat';
import GreeterArtifact from '../artifacts/contracts/Greeter.sol/Greeter.json';
import {Greeter} from '../frontend/src/typechain/contracts/Greeter';

const {deployContract} = waffle;

describe("Greeter tests", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployOnceFixture() {
    let greeter: Greeter;
    // Contracts are deployed using the first signer/account by default
    const [owner, ...otherAccounts] = await ethers.getSigners();

    greeter = (await deployContract(owner, GreeterArtifact)) as Greeter;

    return { greeter, owner, otherAccounts };
  }

  describe("Test suite", function () {
    // it("Check if intiated with hello world", async function () {
    //   const { greeter } = await loadFixture(deployOnceFixture);
      
    //   expect(await greeter.greet()).to.be.eq("Hello, world!");
    // });

    // it("Check if greet can be updated", async function () {
    //   const { greeter, owner } = await loadFixture(deployOnceFixture);
    //   let tx = await greeter.connect(owner).setGreeting("Hello, universe!");
    //   (await tx).wait();
    //   expect(await greeter.greet()).to.be.eq("Hello, universe!");
    // });

    // it("Check if not owner cant change greet", async function () {
    //   const { greeter, owner, otherAccounts } = await loadFixture(deployOnceFixture);
    //   await expect(greeter.connect(otherAccounts[0]).setGreeting("Hello, universe!")).to.be.reverted;
    // });



    
    it("Check the student issue certificate successfully", async function () {   
      const { greeter, owner, otherAccounts } = await loadFixture(deployOnceFixture);
      expect(greeter.connect(otherAccounts[0]).safeMint(otherAccounts[0].address, 'jaiccha'));
    });


    it("Check if contract sends eth after each checkpoint", async function () {   
      const { greeter, owner, otherAccounts } = await loadFixture(deployOnceFixture);
      await expect(greeter.connect(otherAccounts[0]).transferValue());
    });

    it("Check if certificate is viewed ", async function () {   
      const { greeter, owner, otherAccounts } = await loadFixture(deployOnceFixture);
      await expect(greeter.connect(otherAccounts[0]).tokenURI(4)).to.equal('jaiccha');
    });




    it("Check putstake is working", async function () {   
      const { greeter, owner, otherAccounts } = await loadFixture(deployOnceFixture);
      await (await greeter.connect(otherAccounts[0]).putStake(1,{value: 10000000000000}));
    });

    
  
    it("Check current student is the owner of current wallet", async function () {   
      const { greeter, owner, otherAccounts } = await loadFixture(deployOnceFixture);
      await expect(greeter.connect(otherAccounts[0]).getStudent());
    });


  });

 
});
