const apiUrl =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_DRHXlHNYhRfOrqIAxLCPh2M6FUsL9FzNsrnbxJCO";

const amountInput = document.getElementById("amount");
const selectFrom = document.getElementById("from");
const selectTo = document.getElementById("to");
const button = document.getElementById("button");
const rateNumber = document.querySelector(".rate-number");

async function appData() {
  const response = await fetch(
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_DRHXlHNYhRfOrqIAxLCPh2M6FUsL9FzNsrnbxJCO"
  );
  const data = await response.json();
  return data;
}

const showData = async function () {
  const currencyData = await appData();
  const fromCheckBox = selectFrom.value;
  const toCheckBox = selectTo.value;
  if (fromCheckBox in currencyData.data && toCheckBox in currencyData.data) {
    const rate = currencyData.data[fromCheckBox];
    const anotherRate = currencyData.data[toCheckBox];
    const amount = parseFloat(amountInput.value);
    const converssion = anotherRate / rate;
    const result = amount * converssion;
    rateNumber.innerHTML = result.toFixed(2);
  }
};
const populateCurrencyOption = async function () {
  const currencyData = await appData();
  for (const currencyCode in currencyData.data) {
    const optionFrom = document.createElement("option");
    optionFrom.textContent = currencyCode;
    selectFrom.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.textContent = currencyCode;
    selectTo.appendChild(optionTo);
  }
};
button.addEventListener("click", (e) => {
  e.preventDefault();
  showData();
});
populateCurrencyOption();
