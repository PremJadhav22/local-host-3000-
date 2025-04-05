// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MentalHealthToken is ERC20, Ownable {
    constructor() ERC20("MentalHealthToken", "MHT") Ownable(msg.sender) {
        // Mint initial supply to the owner (the deployer of the contract)
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function rewardUser(address user, uint256 amount) external onlyOwner {
        require(amount > 0, "Reward amount must be greater than zero");
        _mint(user, amount); // Mint new tokens to the user as a reward
    }
}

contract MentalHealthPlatform {
    struct Post {
        address author;
        string content;
        uint256 timestamp;
        uint256 rewardAmount;
    }

    MentalHealthToken public token;
    Post[] public posts;

    event NewPost(address indexed author, string content, uint256 rewardAmount);

    constructor(address tokenAddress) {
        token = MentalHealthToken(tokenAddress);
    }

    function createPost(string memory content) public {
        require(bytes(content).length > 0, "Post content cannot be empty");

        uint256 rewardAmount = 10 * 10 ** token.decimals(); // Reward for creating a post
        posts.push(Post(msg.sender, content, block.timestamp, rewardAmount));

        // Reward the user with tokens
        token.rewardUser(msg.sender, rewardAmount);

        emit NewPost(msg.sender, content, rewardAmount); // Emit event after post creation
    }

    function getPosts() public view returns (Post[] memory) {
        return posts; // Return all posts
    }
}
