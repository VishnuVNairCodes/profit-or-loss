"use strict";

const initialPrice = document.querySelector(".initial-price");
const quantityOfStocks = document.querySelector(".quantity-of-stocks");
const currentPrice = document.querySelector(".current-price");
const btnTellMe = document.querySelector(".btn-tell-me");
const outputMessage = document.querySelector(".message-to-user");
const body = document.querySelector(".body");
const inputs = document.querySelectorAll(".inputs");
const footer = document.querySelector(".footer");

function showOutput(message) {
  outputMessage.innerText = message;
}

function calculateProfitAndLoss(initial, quantity, current) {
  if (body.classList.contains("body-sad")) {
    body.classList.remove("body-sad");
    btnTellMe.classList.remove("btn-sad");
    footer.classList.remove("footer-sad");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("input-sad");
    }
  }
  if (
    initialPrice.value === "" ||
    quantityOfStocks.value === "" ||
    currentPrice.value === ""
  ) {
    outputMessage.style.color = "white";
    showOutput("Please fill all the fields");
  } else if (
    initialPrice.value <= 0 ||
    quantityOfStocks.value <= 0 ||
    currentPrice.value === 0
  ) {
    outputMessage.style.color = "white";
    showOutput("All values entered should be positive");
  } else if (quantityOfStocks.value % 1 !== 0) {
    outputMessage.style.color = "white";
    showOutput("Quantity of stocks should be a whole number");
  } else {
    const principal = initial * quantity;
    if (initial > current) {
      const loss = ((initial - current) * quantity).toFixed(2);
      const lossPercentage = ((loss / principal) * 100).toFixed(2);
      outputMessage.style.color = "#dc2626";
      showOutput(
        `Hey the loss is ${loss} and the percent is ${lossPercentage}`
      );
      if (lossPercentage > 50) {
        body.classList.add("body-sad");
        btnTellMe.classList.add("btn-sad");
        footer.classList.add("footer-sad");
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].classList.add("input-sad");
        }
      }
    } else if (initial < current) {
      const profit = ((current - initial) * quantity).toFixed(2);
      const profitPercentage = ((profit / principal) * 100).toFixed(2);
      outputMessage.style.color = "#10b981";
      showOutput(
        `Hey the profit is ${profit} and the percent is ${profitPercentage}`
      );
    } else {
      outputMessage.style.color = "white";
      showOutput(`No pain no gain and No gain no pain !`);
    }
  }
}

function clickHandler() {
  const ip = Number(initialPrice.value);
  const qty = Number(quantityOfStocks.value);
  const curr = Number(currentPrice.value);

  calculateProfitAndLoss(ip, qty, curr);
}

btnTellMe.addEventListener("click", clickHandler);
