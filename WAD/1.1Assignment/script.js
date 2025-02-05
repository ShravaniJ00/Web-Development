feather.replace();

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const baseCurrency = document.getElementById("base-currency");
const getRatesBtn = document.getElementById("get-rates-btn");
const exchangeRates = document.getElementById("exchange-rates");
const convertMode = document.getElementById("convert-mode");
const exchangeMode = document.getElementById("exchange-mode");
const toggleBtns = document.querySelectorAll(".toggle-btn");

// Toggle between Convert and Exchange Rates modes
toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const mode = btn.getAttribute("data-mode");
    if (mode === "convert") {
      convertMode.style.display = "flex";
      exchangeMode.style.display = "none";
    } else {
      convertMode.style.display = "none";
      exchangeMode.style.display = "flex";
    }
  });
});

// Simple mock conversion (without API)
convertBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }
  result.textContent = `Converted Amount: ${amount * 1.1} ${toCurrency.value}`;
});

// Mock exchange rates
getRatesBtn.addEventListener("click", () => {
  exchangeRates.innerHTML = `
    <h3>Exchange Rates (Static Example)</h3>
    <ul>
      <li>USD to EUR: 0.91</li>
      <li>USD to GBP: 0.78</li>
      <li>USD to JPY: 145.23</li>
    </ul>
  `;
});
