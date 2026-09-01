let password = document.getElementById("password");
let bar = document.getElementById("bar");
let text = document.getElementById("strength-text");
let toggle = document.getElementById("toggle");
let suggestion = document.getElementById("suggestion");

password.addEventListener("input", checkStrength);

function checkStrength() {
  let val = password.value;
  let score = 0;

  let hasLength = val.length >= 8;
  let hasUpper = /[A-Z]/.test(val);
  let hasNumber = /[0-9]/.test(val);
  let hasSymbol = /[!@#$%^&*]/.test(val);

  updateChecklist("length", hasLength);
  updateChecklist("upper", hasUpper);
  updateChecklist("number", hasNumber);
  updateChecklist("symbol", hasSymbol);

  if (hasLength) score++;
  if (hasUpper) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;

  if (score <= 1) {
    bar.style.width = "25%";
    bar.style.background = "red";
    text.innerHTML = "Strength: Weak 😟";
    suggestion.innerHTML = "Add more security!";
  } 
  else if (score == 2 || score == 3) {
    bar.style.width = "60%";
    bar.style.background = "orange";
    text.innerHTML = "Strength: Medium 😐";
    suggestion.innerHTML = "Try adding symbols or uppercase!";
  } 
  else {
    bar.style.width = "100%";
    bar.style.background = "green";
    text.innerHTML = "Strength: Strong 😎";
    suggestion.innerHTML = "Great password!";
  }
}

function updateChecklist(id, condition) {
  let item = document.getElementById(id);
  item.innerHTML = condition ? "✔ " + item.innerText.slice(2) : "❌ " + item.innerText.slice(2);
}

toggle.onclick = function() {
  password.type = password.type === "password" ? "text" : "password";
};

function generatePassword() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let pass = "";
  for (let i = 0; i < 10; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  password.value = pass;
  checkStrength();
}

function copyPassword() {
  navigator.clipboard.writeText(password.value);
  alert("Copied!");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}