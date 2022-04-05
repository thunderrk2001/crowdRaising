window.onload = async() => {
    const web_3 = new window.Web3("HTTP://127.0.0.1:7545");
    await connect3();
    const fundContractAddress = document.getElementById("container").getAttribute("data-address")

    const fundContarctInstance = getContractInstance(fundContractAbi, fundContractAddress)

    const res = await fundContarctInstance.methods.getDetails().call()
    const myContribution = await fundContarctInstance.methods.total(accounts[0]).call();
    displayDetails(res, myContribution)


    /*
     */



}

function displayDetails(details, myContribution) {
    document.getElementById("title").innerText = details[0]
    document.getElementById("description").innerText = details[1]
    document.getElementById("manager_address").innerText = details[2]
    document.getElementById("raised_amount").innerText = web_3.utils.fromWei(details[3], "ether")
    document.getElementById("minimum_contribution").innerText = web_3.utils.fromWei(details[4], "ether")
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

    } catch (err) {
        console.log(err)
        alert(err)

    }
})
var accounts = null
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