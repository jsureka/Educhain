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
    _owner = payable(msg.sender);
  }

  function unsafe_inc(uint x) private pure returns (uint) 
  {
    unchecked {
        return x+1;
    }
  }

  function safeMint(address to, string memory uri) public {
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
    Student[] storage _studentTemp= students;

// gas optimization
    for (uint256 i; i < _studentTemp.length; i= unsafe_inc(i)) {
      if (_studentTemp[i].from == msg.sender) {
        require(_studentTemp[i].currentCheckpoints <= 4, "Checkpoints Completed!");

        // To make profit
        uint128 sendValue = 10000000000000 / 5;
        (bool sent, bytes memory data) = msg.sender.call{ value: sendValue }(
          ""
        );

        require(sent, "Failed to send Ether");
      _studentTemp[i].currentCheckpoints++;
      }

  Student[] students;
  modifier onlyOwner() {
    require(msg.sender == _owner, "Not an owner");
    _;
  }

  constructor() ERC721("EduChain", "EDC") EIP712("EduChain", "1") {
    console.log("Deployed the Contract:");
  }

  function unsafe_inc(uint x) private pure returns (uint) 
  {
    unchecked {
        return x+1;
    }
  }

  function safeMint(address to, string memory uri) public {
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
    Student[] storage _studentTemp= students;

// gas optimization
    for (uint256 i; i < _studentTemp.length; i= unsafe_inc(i)) {
      if (_studentTemp[i].from == msg.sender) {
        require(_studentTemp[i].currentCheckpoints <= 4, "Checkpoints Completed!");

        // To make profit
        uint128 sendValue = 10000000000000 / 8;
        (bool sent, bytes memory data) = msg.sender.call{ value: sendValue }(
          ""
        );

        // require(owner.send(address(this).balance));

    students=_studentTemp;
  }


  function getStudents() public view returns (Student[] memory) {
    return students;
  }

  function getStudent() public view returns (Student memory) {
// gas optimization ,using unsafe_inc,local storage to decrease gas fee
    for (uint256 i; i < students.length; i= unsafe_inc(i)) {
      if (students[i].from == msg.sender) return students[i];
        require(sent, "Failed to send Ether");
      _studentTemp[i].currentCheckpoints++;
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


// Check if certificates are not transferrable
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721) {
    require(from == address(0), "Err: token is SOUL BOUND");
    super._beforeTokenTransfer(from, to, tokenId);
  }


// View issued certificate
  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

    students=_studentTemp;
  }


  function getStudents() public view returns (Student[] memory) {
    return students;
  }

  function getStudent() public view returns (Student memory) {
// gas optimization ,using unsafe_inc,local storage to decrease gas fee
    for (uint256 i; i < students.length; i= unsafe_inc(i)) {
      if (students[i].from == msg.sender) return students[i];
    }
    
  }


  function _afterTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721) {
    super._afterTokenTransfer(from, to, tokenId);
  }


// Check if certificates are not transferrable
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721) {
    require(from == address(0), "Err: token is SOUL BOUND");
    super._beforeTokenTransfer(from, to, tokenId);
  }


// View issued certificate
  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }
}
