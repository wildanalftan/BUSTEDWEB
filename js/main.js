
    function scrollShop(direction) {
  const container = document.getElementById('shopContainer');
  const card = container.querySelector('.shop-card');
  const gap = 16; 
  const scrollAmount = card.offsetWidth + gap; 
  
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}
  
// main.js

// Jalankan setelah halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
  const cartButtons = document.querySelectorAll(".add-to-cart");

  cartButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();

      // Ambil data produk dari atribut tombol
      const product = {
        name: this.dataset.name,
        price: parseInt(this.dataset.price),
        image: this.dataset.image
      };

      addToCart(product);
      alert(`${product.name} telah ditambahkan ke keranjang!`);
    });
  });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cek apakah produk sudah ada
  const existingProduct = cart.find(item => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  // Simpan kembali ke Local Storage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartIcon = document.querySelector(".cart-count");
  if (cartIcon) {
    cartIcon.textContent = totalQty;
  }
}

// Jalankan setiap kali halaman dimuat
document.addEventListener("DOMContentLoaded", updateCartIcon);

// Menampilkan jumlah item di ikon keranjang
function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartIcon = document.querySelector(".cart-count");
  if (cartIcon) {
    cartIcon.textContent = totalQty;
  }
}

// Jalankan saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();
});
