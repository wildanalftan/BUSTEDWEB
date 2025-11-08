// payment.js

document.addEventListener("DOMContentLoaded", function () {
  const paymentTable = document.getElementById("paymentTable");
  const totalPembayaran = document.getElementById("totalPembayaran");
  const form = document.getElementById("paymentForm");
  let cart = JSON.parse(localStorage.getItem("checkoutCart")) || JSON.parse(localStorage.getItem("cart")) || [];

  function renderPayment() {
    paymentTable.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      paymentTable.innerHTML = `
        <tr>
          <td colspan="4" class="text-center text-secondary">Tidak ada data pembayaran.</td>
        </tr>
      `;
      totalPembayaran.textContent = "Rp 0";
      return;
    }

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

    if (!nama || !alamat || !metode) {
      alert("Harap isi semua data pembayaran!");
      return;
    }
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const tanggal = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

    cart.forEach((item) => {
      history.push({
        tanggal: tanggal,
        produk: item.name,
        jumlah: item.quantity,
        total: `Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`,
        status: "Selesai",
      });
    });
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCart");

    alert(`Terima kasih ${nama}! Pembayaran sebesar ${totalPembayaran.textContent} berhasil dilakukan.`);
    window.location.href = "history.html";
  });
});
