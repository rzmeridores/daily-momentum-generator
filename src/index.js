let form = document.querySelector("#momentum-form");
let result = document.querySelector("#result");

function handleSubmit(event) {
  event.preventDefault();

  let input = document.querySelector("#user-input").value;

  // Simulate loading (important for next phase)
  result.innerHTML = `<div class="loading">Generating your plan...</div>`;

  setTimeout(function () {
    result.innerHTML = `
      <div class="plan-title">Today’s Momentum Plan</div>

      <div class="plan-section">
        <strong>Body:</strong> Do a 20-minute light workout or walk
      </div>

      <div class="plan-section">
        <strong>Work:</strong> Focus on one important task related to "${input}"
      </div>

      <div class="plan-section">
        <strong>Mindset:</strong> Keep it simple and follow through
      </div>
    `;
  }, 1500);
}

form.addEventListener("submit", handleSubmit);