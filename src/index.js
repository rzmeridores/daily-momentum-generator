let form = document.querySelector("#momentum-form");
let result = document.querySelector("#result");

function displayPlan(response) {
    console.log(response); 
    result.innerHTML = response.data.answer;
  }

function generatePlan(event) {
  event.preventDefault();

  let userInput = document.querySelector("#user-input").value;

  result.innerHTML = `<div class="loading">Generating your plan...</div>`;

  let apiKey = "cfdd8988391fb88a399ddd7ecod46tf0";

  let prompt = `Create a "Daily Momentum Plan" for someone who wants more ${userInput} today.
A Daily Momentum Plan is a short, structured plan that helps someone make progress in one day.
Include exactly:
- Body: one simple physical action (under 30 minutes, beginner-friendly)
- Work: one focused, high-impact task
- Mindset: one short reminder to stay consistent
Rules:
- Keep it practical and specific
- No vague advice or motivational fluff
- Maximum 60 words total
- Format clearly with headings: Body, Work, Mindset`;
  let context ="You are a practical coach who helps people build momentum through small, realistic daily actions. Avoid vague motivational advice.";

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  axios.get(apiUrl).then(displayPlan);
}

form.addEventListener("submit", generatePlan);

axios.get(apiUrl).then(displayPlan).catch(function (error) {
    console.log(error);
    result.innerHTML = "Sorry, something went wrong. Please try again.";
  });