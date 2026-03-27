// script.js

// Tabbatar Pi SDK ya load
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Pi === "undefined") {
    alert("Pi SDK bai load ba. Ka tabbata kana amfani da Pi Browser.");
    return;
  }

  console.log("Pi SDK ya shirya");

  // Login button
  const loginBtn = document.getElementById("loginBtn");
  const payBtn = document.getElementById("payBtn");
  const status = document.getElementById("status");

  // LOGIN
  loginBtn.addEventListener("click", async () => {
    try {
      const scopes = ["username", "payments"];
      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

      status.innerHTML = `
        <p><strong>Login yayi nasara</strong></p>
        <p>Username: ${auth.user.username}</p>
      `;

      payBtn.disabled = false;
    } catch (err) {
      console.error(err);
      status.innerHTML = "<p class='error'>Login ya fadi</p>";
    }
  });

  // PAYMENT
  payBtn.addEventListener("click", async () => {
    try {
      const payment = await Pi.createPayment({
        amount: 1,
        memo: "Gwajin Pi App Payment",
        metadata: { app: "Demo Pi App" }
      });

      console.log(payment);
      status.innerHTML = "<p class='success'>Payment an tura, ana jira tabbaci...</p>";
    } catch (err) {
      console.error(err);
      status.innerHTML = "<p class='error'>Payment ya fadi</p>";
    }
  });
});

// Idan akwai incomplete payment
function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment:", payment);
}