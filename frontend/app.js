// Bharat Explorer - Frontend (app.js)
// This script connects frontend contact form with backend API (http://localhost:5000/api/contact)

document.addEventListener("DOMContentLoaded", () => {
  console.log("🌐 Frontend loaded successfully!");

  // Contact form element
  const contactForm = document.getElementById("contactForm");

  // ✅ Check if contact form exists on the page
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get input values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill all fields before submitting.");
        return;
      }

      try {
        // 🌍 Send data to backend
        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        });

        // 🧾 Handle backend response
        if (response.ok) {
          const data = await response.json();
          console.log("✅ Backend response:", data);
          alert("Message sent successfully!");
          contactForm.reset();
        } else {
          const errData = await response.json();
          console.error("❌ Backend error:", errData);
          alert("Something went wrong while sending your message.");
        }
      } catch (error) {
        console.error("🚫 Network error:", error);
        alert("Unable to connect to backend server. Please try again later.");
      }
    });
  } else {
    console.warn("⚠️ No contact form found on this page.");
  }
});
