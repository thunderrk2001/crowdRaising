window.onload = async() => {
    const web_3 = new window.Web3("HTTP://127.0.0.1:7545");
    await connect3();
    const fundContractAddress = document.getElementById("container").getAttribute("data-address")

    const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)

    const res = await fundContarctInstance.methods.getDetails().call()
    const myContribution = await fundContarctInstance.methods.total(accounts[0]).call();
    displayDetails(res, myContribution)
    if (res[2] != accounts[0]) {

        document.getElementById("ex1-tab-3").style.display = 'none'
    }

    await getRequests()
    const t = await fundInstance.getContributionBalance()
    if (t == 0) {
        document.getElementById("votingStatus").innerText = "DOWN"
    } else {
        document.getElementById("votingStatus").innerText = "UP"

    }

    /*
     */




}
var fundInstance = (function main() {
    function instance() {

    }
    instance.prototype.getManagerStatus = async() => {
        const fundContractAddress = document.getElementById("container").getAttribute("data-address")
        const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)
        const res = await fundContarctInstance.methods.getDetails().call()
        if (accounts[0] == res[2]) {
            return true
        } else {
            return false
        }
    }
    instance.prototype.getContributionBalance = async() => {
        const fundContractAddress = document.getElementById("container").getAttribute("data-address")
        const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)
        const res = await fundContarctInstance.methods.approvers(accounts[0]).call()
        return web_3.utils.fromWei(res, "ether")
    }
    return new instance()
})()

function displayDetails(details, myContribution) {

    document.getElementById("title").innerText = details[0]
    document.getElementById("description").innerText = details[1]
    document.getElementById("manager_address").innerText = details[2]
    document.getElementById("balance").innerText = web_3.utils.fromWei(details[3], "ether")
    document.getElementById("minimum_contribution").innerText = web_3.utils.fromWei(details[4], "ether")
    document.getElementById("raised_amount").innerText = web_3.utils.fromWei(details[5], "ether")
    document.getElementById("myContribution").innerText = web_3.utils.fromWei(myContribution, "ether")


}

function getContractInstance(abi, address) {
    const web_3 = new window.Web3("HTTP://127.0.0.1:7545");
    const contract = new web_3.eth.Contract(JSON.parse(abi), address, {
        from: accounts[0],
        gas: 2000000,
    });
    return contract;
}
document.getElementById("donate").addEventListener("click", async() => {

    const fundContractAddress = document.getElementById("container").getAttribute("data-address")
    const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)
    const amount = web_3.utils.toWei(document.getElementById("inputAmount").value, "ether");
    const res = await fundContarctInstance.methods.getDetails().call()
    try {
        await fundContarctInstance.methods.donate().send({
            from: accounts[0],
            value: amount
        });

        showSuccess()
    } catch (err) {
        showErrorAlert(err)

    }

})


document.querySelector('#close').addEventListener('click', () => {
    document.getElementById("message").style.display = "none";
    document.querySelector('#messageText').innerText = ''
})
var accounts = null
async function connect3() {
    if (typeof web3 === 'undefined')
        alert("Install meta Mask to use")
    else {
        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        accounts[0] = await web_3.utils.toChecksumAddress(accounts[0])
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


    }
}
document.getElementById("createRequest").addEventListener("click", async() => {
    const name = document.getElementById("reqName").value
    const desc = document.getElementById("reqDesc").value
    const minAmount = document.getElementById("reqAmount").value
    const recAddress = document.getElementById("reqAddress").value
    try {
        await createRequest(name, desc, minAmount, recAddress)

    } catch (e) {

        showErrorAlert(e)
    }

})
async function createRequest(name, desc, minAmount, recAddress) {
    const fundContractAddress = document.getElementById("container").getAttribute("data-address")
    const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)
    const amount = web_3.utils.toWei(minAmount, "ether");
    try {
        const a = await fundContarctInstance.methods.createRequest(name, desc, amount, recAddress).send({ from: accounts[0] })
        console.log(a)
        showSuccess()
    } catch (e) {
        showErrorAlert(e)

    }

}

function showErrorAlert(err) {
    document.getElementById("message").style.background = 'rgb(242, 222, 222)';
    document.getElementById('message').style.border = ' 1px solid rgb(238, 211, 215)';
    document.querySelector('#messageText').innerText = err
    document.getElementById("message").style.display = "flex";
}

function showSuccess() {
    document.getElementById("message").style.background = 'rgb(223, 240, 216)';
    document.getElementById('message').style.border = '1 px solid rgb(214, 233, 198)';
    document.querySelector('#messageText').innerText = 'Success'
    document.getElementById("message").style.display = "flex";
    setTimeout(() => { window.location.reload(); }, 1000)

}

async function getRequests() {
    const status = { true: "Finalised", false: "Open" }
    let isManager = await fundInstance.getManagerStatus()
    if (isManager) {
        isManager = "block"
    } else {
        isManager = "none"
    }
    console.log(isManager)
    const size = await requestsSize()
    for (let i = 0; i < size; i++) {

        const { requestName, requestDesc, receiverAddress, requestedAmount, isCompleted } = await getRequestDetails(i);
        const reqAmount = web_3.utils.fromWei(requestedAmount, "ether")
        const content = `<div class="list-group-item list-group-item-action" style="background:#ecf0e2;
    color: black;" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1" id="t1">${requestName}</h5>

                <label for="t1" style=" font-size: 25px;">${status[isCompleted]}</label>

            </div>
            <p class="mb-1" style="color: #385277;">
                  ${requestDesc}
            </p>
            <div style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;">
                <div style="display: flex;flex-wrap: wrap;">
                      <label for="targetReqAmount" style="font-weight: bolder;">Requested Amount(ETH) :</label>
                    <div id="targetReqAmount" style="margin-right: 10px;">${reqAmount}</div>


                      <label for="recipientAddress" style="font-weight: bolder;">Recipient:</label>

            <div id="recipientAddress">${receiverAddress}</div>

                </div>
            <div style="display: flex;flex-wrap: wrap;">
<div class="btn-group" style="width:100%">
                <button type="button" class="btn btn-success" onclick="voteRequest(${i})"  style="margin-bottom: 5px ;width: 65px; height: 35px;"  >VOTE</button></div>
                <div class="btn-group" style="width:100%">
                <button type="button" class="btn btn-primary" onclick="finaliseRequest(${i})"   style="width: 65px; height: 35px;display:${isManager}"  >Finalise
                </button></div>
            </div>
            </div>

        </div>`
        const ele = document.createElement('div')
        ele.innerHTML = content
        document.getElementById('ex1-tabs-2').appendChild(ele)
    }

}
async function getRequestDetails(idx) {
    const fundContractAddress = document.getElementById("container").getAttribute("data-address")
    const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)
    const res = await fundContarctInstance.methods.requests(idx).call()
    return res
}
async function requestsSize() {
    const fundContractAddress = document.getElementById("container").getAttribute("data-address")
    const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)
    const size = await fundContarctInstance.methods.getRequestsSize().call()
    return size
}

async function voteRequest(idx) {
    const fundContractAddress = document.getElementById("container").getAttribute("data-address")
    const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)
    try {
        const res = await fundContarctInstance.methods.voteRequest(idx).send({ from: accounts[0] })
        showSuccess()
    } catch (e) {
        showErrorAlert(e)
    }


}
async function finaliseRequest(idx) {
    const fundContractAddress = document.getElementById("container").getAttribute("data-address")
    const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)
    try {
        const res = await fundContarctInstance.methods.finaliseAndSend(idx).send({ from: accounts[0] })
        showSuccess()

    } catch (e) {
        showErrorAlert(e)
    }

}