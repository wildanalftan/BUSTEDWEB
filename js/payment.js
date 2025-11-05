// payment.js

document.addEventListener("DOMContentLoaded", function () {
  const paymentTable = document.getElementById("paymentTable");
  const totalPembayaran = document.getElementById("totalPembayaran");
  const form = document.getElementById("paymentForm");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderPayment() {
    paymentTable.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const row = `
        <tr>
          <td>${item.name}</td>
          <td>Rp ${item.price.toLocaleString()}</td>
          <td>${item.quantity}</td>
          <td>Rp ${subtotal.toLocaleString()}</td>
        </tr>
      `;
      paymentTable.insertAdjacentHTML("beforeend", row);
    });

    totalPembayaran.textContent = `Rp ${total.toLocaleString()}`;
  }

  renderPayment();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const metode = document.getElementById("metodePembayaran").value;

    if (!cart.length) {
      alert("Keranjang masih kosong!");
      return;
    }

    if (nama && alamat && metode) {
      alert(
        `Terima kasih ${nama}! Pembayaran sebesar ${
          totalPembayaran.textContent
        } dengan metode ${metode.toUpperCase()} berhasil dilakukan.`
      );

      // Hapus keranjang setelah pembayaran
      localStorage.removeItem("cart");

      // Arahkan ke halaman utama
      window.location.href = "index.html";
    }
  });
});
