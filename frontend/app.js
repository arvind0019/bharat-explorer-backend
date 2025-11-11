// 🌏 Bharat Explorer Frontend Logic

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Bharat Explorer frontend ready!");

  // ---------- CONTACT FORM ----------
  const contactForm = document.getElementById("contactForm");
  const responseMsg = document.getElementById("responseMsg");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        responseMsg.textContent = "⚠️ Please fill all fields!";
        responseMsg.style.color = "orange";
        return;
      }

      responseMsg.textContent = "⏳ Sending...";
      responseMsg.style.color = "gray";

      try {
        const res = await fetch("https://bharat-explorer-backend-1.onrender.com/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        if (res.ok) {
          responseMsg.textContent = "✅ Message sent successfully!";
          responseMsg.style.color = "green";
          contactForm.reset();
        } else {
          responseMsg.textContent = "❌ Failed to send message.";
          responseMsg.style.color = "red";
        }
      } catch (error) {
        console.error(error);
        responseMsg.textContent = "🚫 Unable to connect to backend.";
        responseMsg.style.color = "red";
      }
    });
  }

  // ---------- SEARCH GUIDE ----------
  const searchBtn = document.getElementById("searchBtn");
  const searchQuery = document.getElementById("searchQuery");
  const searchResult = document.getElementById("searchResult");

  if (searchBtn) {
    searchBtn.addEventListener("click", async () => {
      const query = searchQuery.value.trim();
      if (!query) {
        searchResult.textContent = "⚠️ Please enter a question!";
        searchResult.style.color = "orange";
        return;
      }

      searchResult.textContent = "⏳ Searching...";
      searchResult.style.color = "gray";

      try {
        const res = await fetch("https://bharat-explorer-backend-1.onrender.com/api/guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        const data = await res.json();
        searchResult.textContent = data.answer || "No information found.";
        searchResult.style.color = "green";
      } catch (error) {
        console.error(error);
        searchResult.textContent = "🚫 Cannot connect to backend.";
        searchResult.style.color = "red";
      }
    });
  }
});
