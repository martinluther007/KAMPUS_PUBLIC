
const paymentForm = document.getElementById('paymentForm');
const xhttp = new XMLHttpRequest()

paymentForm.addEventListener("submit", payWithPaystack, false);
async function payWithPaystack(e) {
  e.preventDefault();
  let handler = PaystackPop.setup({
    key: 'pk_test_429e8ed10259bd26dad440b75744a95ead51492c', // Replace with your public key
    email: document.getElementById("email-address").value,
    amount: document.getElementById("amount").value * 100,
    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function(){
      alert('Window closed.');
    },
    callback: function(response){
      let message = 'Payment complete! Reference: ' + response.reference;
      alert(message);

      if(response.reference) {
        sendReference(response)
      }
    }
    
  });
  handler.openIframe();

}

const sendReference = async (response) => {
  try {
    const res = await axios({
        method:"POST",
        url:"http://127.0.0.1:3300/bookings",
        data:response
    })
    console.log(res)
} catch (error) {
    console.log(error);  
}
}
