(function() {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    console.log(document.getElementById("fundName").value)
                    console.log(document.getElementById('fundDesc').value)
                    console.log(document.getElementById("minAmount").value)
                    event.preventDefault()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()
window.onload = async() => { connect3() }
document.getElementById("myAccount").addEventListener("click", async() => {
    connect3();
});
async function connect3() {
    if (typeof web3 === 'undefined')
        alert("Install meta Mask to use")
    else {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

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
setTimeout(async() => { callF() }, 3000)
async function callF() {
    var contractAbi = `[
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
      "name": "createFund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
  ]` //here put your contract abi in json string
    const web_3 = new window.Web3("HTTP://127.0.0.1:7545");
    const contract = new web_3.eth.Contract(JSON.parse(contractAbi), "0xcE9716aAA5B7Ccff304A3Eb1d7fFEb228233b785", {
        from: '0x464Ff25A4A6bB9E00F2D4B0E3454c1Db83788375',
        gasPrice: '20000000000'
    });
    console.log(contract.methods)
    try {
        const res = await contract.methods.createFund("first", "hello", 2).send({ from: '0x464Ff25A4A6bB9E00F2D4B0E3454c1Db83788375' });
        console.log(res);
    } catch (e) {
        console.log(e)
    }

}