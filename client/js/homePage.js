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

                      const minAmount = web_3.utils.toWei(document.getElementById("minAmount").value, "ether")


                      const fundFactoryContarctInstance = getContractInstance(fundFactoryContractAbi, contractAddress)
                      try {
                          await fundFactoryContarctInstance.methods.createFund(name, desc, minAmount).send({ from: accounts[0] })
                          window.location = "/"
                      } catch (e) {
                          document.getElementById("errorMessage").innerText = e

                      }
                  }
                  form.classList.add('was-validated')
              }, false)
          })
  })()
  let accounts = null;

  window.onload = async() => {
      await connect3();
      displayFundsWithDetail();
  }
  document.getElementById("myAccount").addEventListener("click", async() => {
      connect3();

  });

  function getContractInstance(abi, address) {

      const contract = new web_3.eth.Contract(JSON.parse(abi), address, {
          from: accounts[0],
          gas: 2000000,
      });
      return contract;
  }
  async function displayFundsWithDetail() {

      const fundFactoryContarctInstance = getContractInstance(fundFactoryContractAbi, contractAddress)
      const res = await fundFactoryContarctInstance.methods.getFundsDetails().call()

      let fundsDetails = [];

      for (let i = 0; i < res.length; i++) {
          const fundAddress = res[i];
          const contarctInstance = getContractInstance(fundContractAbi, fundAddress);
          const fundDetails = await contarctInstance.methods.getDetails().call();
          await fundsDetails.push([fundDetails, res[i]]);

      }

      fundsDetails.forEach((info) => {
          console.log(info)
          let element = document.createElement('div');
          element.innerHTML = ` <div class=" p-5 rounded mb-3 sD"  >

            <h5 style="color:white;text-shadow: 0px 0px 4px #5e5857;">${info[0][0]}</h5>
            <p class="lead" style="color: #3f4856;font-size: 16px; font-weight:600;">${info[0][1]}</p>
            <a class="btn btn-lg btn-primary" href="/fund/${info[1]}" role="button" style="background-color: #385277;overflow: hidden;
            width: 190px;

            height: 40px;font-size: 15px;">View Community »</a>
        </div>
        `
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