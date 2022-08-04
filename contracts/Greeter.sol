//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Greeter is ERC721, EIP712, ERC721URIStorage {
  string private greeting;
  address private _owner;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  // struct Course {
  //     uint128 course_id;
  //     uint128 currentCheckpoints;
  // }
  struct Student {
    address from;
    uint256 timestamp;
    string name;
    uint128 course_id;
    uint128 currentCheckpoints;
  }

  Student[] students;
  modifier onlyOwner() {
    require(msg.sender == _owner, "Not an owner");
    _;
  }

  constructor() ERC721("EduChain", "EDC") EIP712("EduChain", "1") {
    console.log("Deployed the Contract:");
  }

  function safeMint(address to, string memory uri) public  {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

      function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {

        
        super._burn(tokenId);
    }

  function putStake(uint128 course_id) public payable {
    require(msg.value == 10000000000000, "Not enough ETH to enroll");
    students.push(
      Student(msg.sender, block.timestamp, "Mustahid", course_id, 0)
    );
  }

  function transferValue() external {
    for (uint256 i; i < students.length; i++) {
      if (students[i].from == msg.sender) {
        require(students[i].currentCheckpoints <= 4, "Checkpoints Completed!");
        uint128 sendValue = 10000000000000 / 4;
        (bool sent, bytes memory data) = msg.sender.call{ value: sendValue }(
          ""
        );

        // require(owner.send(address(this).balance));

        require(sent, "Failed to send Ether");
        students[i].currentCheckpoints++;
      }
    }
  }

  function _afterTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721) {
    super._afterTokenTransfer(from, to, tokenId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721) {
    require(from == address(0), "Err: token is SOUL BOUND");
    super._beforeTokenTransfer(from, to, tokenId);
  }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
