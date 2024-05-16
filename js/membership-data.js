// Prevent button click from bubbling up
document.querySelectorAll('.choose-plan-btn').forEach(button => {
  button.addEventListener('click', function(event) {
    event.stopPropagation();
    // The form will be displayed by the plan container click handler
  });
});

// Event listener for plan containers
document.querySelectorAll('.plan').forEach(plan => {
  plan.addEventListener('click', function() {
    const planType = this.getAttribute('data-plan');
    selectedPlanURL = this.getAttribute('data-payment-url'); // Capture the payment URL
    document.getElementById('plan').value = planType;
    $('#membership-data').modal('show'); // Show the membership form modal
  });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbxDnb9bXD4vCxCUAgLLE1uJaQosfgpHHtatQXPFwbnzBWvyliE8urfr-1jkqu0Vy9il/exec';
const form = document.forms['membership-data'];
const loadingElement = document.getElementById('loading');
let selectedPlanURL = ''; // To store the selected plan's payment URL

// Hide the loading element by default
loadingElement.style.display = 'none';

// Event listener for form submission
form.addEventListener('submit', e => {
  e.preventDefault();
  // Show the loading spinner when the form is submitted
  loadingElement.style.display = 'block';
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => {
    window.location.href = selectedPlanURL; // Redirect to the selected plan's payment URL
  })
  .catch(error => {
    console.error('Error!', error.message);
    // Hide the loading spinner on error
    loadingElement.style.display = 'none';
  });
});
