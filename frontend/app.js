const API_URL = "https://bharat-explorer-backend.onrender.com/api/states";
let allStates = [];

// Load states
async function loadStates() {
  const res = await fetch(API_URL);
  allStates = await res.json();
  displayStates(allStates);
}

// Display states
function displayStates(states) {
  const container = document.getElementById("states-container");
  container.innerHTML = states.map(state => `
    <div class="state-card" data-tilt>
      <img src="${state.image || 'https://source.unsplash.com/300x200/?' + state.name}" alt="${state.name}">
      <h2>${state.name}</h2>
      <p><b>Capital:</b> ${state.capital}</p>
      <p>${state.famousFor}</p>
      <div class="state-actions">
        <button class="fav-btn" onclick="toggleFavorite('${state.name}')">❤️</button>
        <button class="share-btn" onclick="shareState('${state.name}')">📤</button>
      </div>
    </div>`).join('');
  updateFavoriteCount();
}

// Search
function searchStates() {
  const q = document.getElementById("searchBar").value.toLowerCase();
  displayStates(allStates.filter(s => s.name.toLowerCase().includes(q)));
}

// Favorites
function toggleFavorite(name) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.includes(name) ? favorites = favorites.filter(n => n !== name) : favorites.push(name);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoriteCount();
  alert(`❤️ Updated your favorites`);
}

// Update favorite counter
function updateFavoriteCount() {
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  document.getElementById("favCount").textContent = favs.length;
}

// Share button
function shareState(state) {
  const text = `🌏 Check out ${state} on Bharat Explorer!`;
  const url = window.location.href;
  if (navigator.share) navigator.share({ title: "Bharat Explorer", text, url });
  else window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, "_blank");
}

// Menu toggle + Dark mode
function toggleMenu() { document.getElementById("navLinks").classList.toggle("active"); }
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");

// Load recommendations
async function loadRecommendations() {
  const categories = ["Hill Station", "Desert", "Beach", "Cultural", "Historical"];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const res = await fetch(`${API_URL}/recommendations?category=${category}`);
  const data = await res.json();
  document.getElementById("recommend-container").innerHTML = data.map(s => `
    <div class="state-card">
      <img src="${s.image || 'https://source.unsplash.com/300x200/?' + s.name}">
      <h3>${s.name}</h3><p>${s.famousFor}</p>
    </div>`).join('');
}

// Chatbot
function toggleChat() {
  const chatBody = document.getElementById('chat-body');
  chatBody.style.display = chatBody.style.display === 'block' ? 'none' : 'block';
}
function appendMessage(sender, text) {
  const chat = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'user-msg' : 'bot-msg';
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
async function sendMessage() {
  const input = document.getElementById('userInput');
  const msg = input.value.trim();
  if (!msg) return;
  appendMessage('user', msg);
  input.value = '';
  if (msg.toLowerCase().includes("hill")) showRecommendation("Hill Station");
  else if (msg.toLowerCase().includes("beach")) showRecommendation("Beach");
  else if (msg.toLowerCase().includes("desert")) showRecommendation("Desert");
  else if (msg.toLowerCase().includes("recommend")) showRecommendation();
  else {
    const res = await fetch(API_URL);
    const data = await res.json();
    const found = data.find(s => msg.toLowerCase().includes(s.name.toLowerCase()));
    appendMessage('bot', found ? `${found.name} is known for ${found.famousFor}. Its capital is ${found.capital}.` : "Sorry, I couldn’t find that.");
  }
}
function voiceInput() {
  const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  r.lang = 'en-IN';
  r.start();
  r.onresult = e => { document.getElementById('userInput').value = e.results[0][0].transcript; sendMessage(); };
}

async function showRecommendation(category) {
  let url = `${API_URL}/recommendations`;
  if (category) url += `?category=${category}`;
  const res = await fetch(url);
  const data = await res.json();
  appendMessage('bot', `Here are some ${category || 'recommended'} states:`);
  data.forEach(s => appendMessage('bot', `🌄 ${s.name} - ${s.famousFor}`));
}

// Initialize
loadStates();
loadRecommendations();
