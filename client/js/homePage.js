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
window.onload = async() => {
    if (typeof web3 === 'undefined')
        console.log("Not connected")
    else {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts)
    }
}