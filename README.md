# Crowd Raising 

#### It is a decentralized crowdfunding platform built on the Ethereum blockchain. Its major intent is to achieve transparency and reliability in donation-based funding systems It is removing the third person or central server platform between the fund creator and funder.
### Key features:
1) Any user after connecting to their blockchain address through their wallet can create their own fund and can demand help from other users. The fund should define the use case clearly where it is going to be used for the community.
2) The creator of the fund cannot directly withdraw money from the fund. The funder has to create a request before using money from the fund.
3) The request should define the amount and use case. Only fund creators have access to create requests for their own funds. The approval or decline of a request depends upon the voting power gained by request from funders(users who have donated to the fund).
4) The users or funders who have donated to that fund can vote for requests in which they have donated some amount of money.
5) The voting power of users in a fund depends upon their donation to that fund(more donation high voting power). Once a user votes for a request their voting power is reduced in the respected fund. To gain again voting power users have to donate funds again.

**Home Page**

<img src="https://github.com/thunderrk2001/crowdRaising/blob/main/Doc/Screenshots/HomePage.png"></img>

**Creating Fund**

<img src="https://github.com/thunderrk2001/crowdRaising/blob/main/Doc/Screenshots/CreateFund.png"><img>

**Fund Page (User view)**
<img src="https://github.com/thunderrk2001/crowdRaising/blob/main/Doc/Screenshots/Donate.png"></img>

**Fund Page (Fund creator view)** 
<img src="https://github.com/thunderrk2001/crowdRaising/blob/main/Doc/Screenshots/FinaliseRequest.png"></img>


### Local Setup:
- Clone this repo `git clone https://github.com/thunderrk2001/crowdRaising`.
- Go to the root of this project in cmd and run `npm install` *(Make sure **Node.js** is installed on your machine)*.
- In cmd install **truffle** `npm i -g truffle`. 
- Install **Ganache** on Your machine.
- Create a new project in ganache setup port, host, and current project truffle-config.js file by importing the project in ganache.
- Add the Same port and host in the `truffle-config`file as added in the ganache project.
- Run `truffle migrate --reset` at root project level in cmd or in the shell.
- Open the ganache project and in see in the contract tab where the contract is deployed.
- Pick deployed contract address and update *const contarctAddress* with picked address in`./client/js/abi.js` file.
- Connect or import opened ganache project addresses to the browser by meta mask wallet.
- In shell or cmd run `node index.js`.

Now you are ready to see app running at 2000 port in browser.




