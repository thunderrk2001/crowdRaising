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