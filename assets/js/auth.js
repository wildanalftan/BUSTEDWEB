// LOGIN
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // ambil input
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // contoh validasi sederhana
      if (email && password) {
        alert("Login berhasil!");
        window.location.href = "Home.html"; 
      } else {
        alert("Isi semua data login dengan benar!");
      }
    });
  }

  // REGISTER
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullname = document.getElementById("fullname").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (!fullname || !email || !password || !confirmPassword) {
        alert("Semua kolom harus diisi!");
        return;
      }

      if (password !== confirmPassword) {
        alert("Konfirmasi password tidak cocok!");
        return;
      }

      alert("Registrasi berhasil! Silakan login.");
      window.location.href = "login.html";
    });
  }
});
