let form = document.querySelector("#momentum-form");
let result = document.querySelector("#result");

// Handle API response
function displayPlan(response) {
  console.log("Full response:", response);
  console.log("AI output:", response.data.answer);

  let answer = response.data.answer;

  // Clean up AI formatting
  answer = answer
    .replace(/\*\*/g, "")
    .replace(/###/g, "")
    .replace(/##/g, "")
    .replace(/#/g, "");

  // Extract each section
  let bodyMatch = answer.match(/Body:\s*(.*?)(?=Work:|Mindset:|$)/is);
  let workMatch = answer.match(/Work:\s*(.*?)(?=Mindset:|Body:|$)/is);
  let mindsetMatch = answer.match(/Mindset:\s*(.*?)(?=Body:|Work:|$)/is);

  let body = bodyMatch ? bodyMatch[1].trim() : "Move gently for 10–20 minutes.";
  let work = workMatch ? workMatch[1].trim() : "Choose one task and make focused progress.";
  let mindset = mindsetMatch ? mindsetMatch[1].trim() : "Keep it small and follow through.";

  result.innerHTML = `
    <div class="plan-title">Today’s Momentum Plan</div>

    <div class="plan-grid">
      <div class="plan-card">
        <h3>Body</h3>
        <p>${body}</p>
      </div>

      <div class="plan-card">
        <h3>Work</h3>
        <p>${work}</p>
      </div>

      <div class="plan-card">
        <h3>Mindset</h3>
        <p>${mindset}</p>
      </div>
    </div>
  `;
}

// Handle form submit
function generatePlan(event) {
  event.preventDefault();

  let userInput = document.querySelector("#user-input").value;

  result.innerHTML = `<div class="loading">Generating your plan...</div>`;

  let apiKey = "cfdd8988391fb88a399ddd7ecod46tf0";

  let prompt = `Create a Daily Momentum Plan for someone who wants more ${userInput} today.

A Daily Momentum Plan is a short, structured plan that helps someone make progress in one day.

Include exactly:
Body: one simple physical action under 30 minutes and beginner-friendly
Work: one focused, high-impact task
Mindset: one short reminder to stay consistent

Rules:
Keep it practical and specific.
No vague advice or motivational fluff.
Maximum 60 words total.
Do not use Markdown, hashtags, bullets, asterisks, or numbering.
Do not include a title.`;

  let context =
    "You are a practical coach who helps people build momentum through small, realistic daily actions. Avoid vague motivational advice.";

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  axios
    .get(apiUrl)
    .then(displayPlan)
    .catch(function (error) {
      console.error(error);
      result.innerHTML = "Something went wrong. Please try again.";
    });
}

form.addEventListener("submit", generatePlan);

// Reset when title is clicked
let homeLink = document.querySelector("#home-link");

homeLink.addEventListener("click", function () {
  let input = document.querySelector("#user-input");

  input.value = "";
  result.innerHTML = `<p class="placeholder">Your plan will appear here</p>`;
  input.focus();
});