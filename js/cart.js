// cart.js

document.addEventListener("DOMContentLoaded", function () {
  const cartTable = document.getElementById("cartTable");
  const totalHarga = document.getElementById("totalHarga");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartTable.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const row = `
        <tr>
          <td>${item.name}</td>
          <td>Rp ${item.price.toLocaleString()}</td>
          <td>${item.quantity}</td>
          <td>Rp ${subtotal.toLocaleString()}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Hapus</button>
          </td>
        </tr>
      `;
      cartTable.insertAdjacentHTML("beforeend", row);
    });

    totalHarga.textContent = `Rp ${total.toLocaleString()}`;
  }

  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  renderCart();
});
