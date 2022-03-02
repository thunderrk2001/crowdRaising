  (function() {
      'use strict'
      var forms = document.querySelectorAll('.needs-validation')

      Array.prototype.slice.call(forms)
          .forEach(function(form) {
              form.addEventListener('submit', async function(event) {
                  if (!form.checkValidity()) {
                      event.preventDefault()
                      event.stopPropagation()
                  } else {
                      event.preventDefault()
                      const name = document.getElementById("fundName").value

                      const desc = document.getElementById('fundDesc').value

                      const minAmount = document.getElementById("minAmount").value

                      const web_3 = new window.Web3("HTTP://127.0.0.1:7545");
                      const fundFactoryContarctInstance = getContractInstance(fundFactoryContractAbi, contractAddress)
                      try {
                          await fundFactoryContarctInstance.methods.createFund(name, desc, minAmount).send({ from: accounts[0] })
                          window.location = "/"
                      } catch (e) {
                          alert(e)

                      }
                  }
                  form.classList.add('was-validated')
              }, false)
          })
  })()
  let accounts = null;
  const contractAddress = "0xbec4Aa563bfFb921E1DfEE25F5DD846D4Fd462F8"
  const fundFactoryContractAbi = `[
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "funds",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_fundName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_desc",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_minAmount",
          "type": "uint256"
        }
      ],
      "name": "createFund",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "getFundsDetails",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]`
  const fundContarctAbi = `[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_manager",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_fundName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_desc",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_minAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "approvers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "approversCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "desc",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fundName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "manager",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "requests",
      "outputs": [
        {
          "internalType": "string",
          "name": "requestName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "requestDesc",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "requestedAmount",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "receiverAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isCompleted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_requestName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_requestDesc",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_requestedAmount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_receiverAddress",
          "type": "address"
        }
      ],
      "name": "createRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "idx",
          "type": "uint256"
        }
      ],
      "name": "voteRequest",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "idx",
          "type": "uint256"
        }
      ],
      "name": "finaliseAndSend",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDetails",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]`
  window.onload = async() => {
      await connect3();
      displayFundsWithDetail();
  }
  document.getElementById("myAccount").addEventListener("click", async() => {
      connect3();

  });

  function getContractInstance(abi, address) {
      const web_3 = new window.Web3("HTTP://127.0.0.1:7545");
      const contract = new web_3.eth.Contract(JSON.parse(abi), address, {
          from: accounts[0],
          gas: 2000000,
      });
      return contract;
  }
  async function displayFundsWithDetail() {
      const web_3 = new window.Web3("HTTP://127.0.0.1:7545");
      const fundFactoryContarctInstance = getContractInstance(fundFactoryContractAbi, contractAddress)
      const res = await fundFactoryContarctInstance.methods.getFundsDetails().call()
      let fundsDetails = [];
      for (let i = 0; i < res.length; i++) {
          const fundAddress = res[i];
          const contarctInstance = getContractInstance(fundContarctAbi, fundAddress);
          const fundDetails = await contarctInstance.methods.getDetails().call();
          await fundsDetails.push(fundDetails);
      }
      fundsDetails.forEach((info) => {
          let element = document.createElement('div');
          element.innerHTML = ` <div class=" p-5 rounded mb-3" style="background-color: rgb(241 241 241);box-shadow: 0px 0px 4px #bbb8b7";>
            <h5 style="color: var(--bs-orange);">${info[0]}</h5>
            <p class="lead" style="font-size: 18px;">${info[1]}</p>
            <a class="btn btn-lg btn-primary" href="/fund/${info[2]}" role="button" style="background-color: #385277;overflow: hidden;
            width: 190px;
            height: 40px;font-size: 15px;">View Community »</a>
        </div>`
          document.getElementById('container').appendChild(element);
      })

  }
  async function connect3() {
      if (typeof web3 === 'undefined')
          alert("Install meta Mask to use")
      else {
          accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          if (Array(accounts).length > 0) {
              document.getElementById("myAccount").innerText = accounts[0];
          } else
              alert("Account not connected")

      }
  }
  async function getConnectedAccount() {
      if (typeof web3 === 'undefined')
          console.log("Not connected")
      else {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          console.log(accounts)
      }
  }
  document.getElementById("just").addEventListener("click", async() => {
      await callF();
  })
  async function callF() {
      //here put your contract abi in json string
      const web_3 = new window.Web3("HTTP://127.0.0.1:7545");
      const contract = new web_3.eth.Contract(JSON.parse(contractAbi), contractAddress, {
          from: accounts[0],
          gas: 2000000,
      });
      //Was getting error because of *npm i -g  solc* solidity compiler  was not installed
      try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const res = await contract.methods.getFundsDetails().call()
          console.log(res[2])
          var contractAbi2 = ` [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_manager",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_fundName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_desc",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_minAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "approvers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "approversCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "desc",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fundName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "manager",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "requests",
      "outputs": [
        {
          "internalType": "string",
          "name": "requestName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "requestDesc",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "requestedAmount",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "receiverAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isCompleted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_requestName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_requestDesc",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_requestedAmount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_receiverAddress",
          "type": "address"
        }
      ],
      "name": "createRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "idx",
          "type": "uint256"
        }
      ],
      "name": "voteRequest",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "idx",
          "type": "uint256"
        }
      ],
      "name": "finaliseAndSend",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDetails",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]`
          const contract2 = new web_3.eth.Contract(JSON.parse(contractAbi2), res[2], {
              from: '0x464Ff25A4A6bB9E00F2D4B0E3454c1Db83788375',
              gas: 2000000,
          });
          const res2 = await contract2.methods.getDetails().call()
          console.log(res2)
      } catch (e) {
          console.error(e)
      }

  }