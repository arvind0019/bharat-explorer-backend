// ---------- CONFIG ----------
const BASE_URL = "https://your-backend-url.com"; // <-- REPLACE with Render/Glitch/Cyclic URL or leave empty if not using backend

// ---------- Demo data (will be replaced by API later) ----------
const STATES_SAMPLE = [
  { id: "up", name: "Uttar Pradesh", desc: "Taj Mahal, Kashi, heritage", img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Taj_Mahal_in_March_2004.jpg" },
  { id: "rj", name: "Rajasthan", desc: "Palaces & forts", img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hawa_Mahal.jpg" },
  { id: "kl", name: "Kerala", desc: "Backwaters & beaches", img: "https://upload.wikimedia.org/wikipedia/commons/7/71/Kerala_Backwaters.jpg" },
  { id: "ga", name: "Goa", desc: "Beaches & nightlife", img: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Baga_Beach_Goa.jpg" }
];

const PLACES_SAMPLE = [
  { id: "p1", name: "Taj Mahal", loc: "Agra, Uttar Pradesh", rating: 4.8 },
  { id: "p2", name: "Hawa Mahal", loc: "Jaipur, Rajasthan", rating: 4.5 },
  { id: "p3", name: "Varkala Beach", loc: "Kerala", rating: 4.4 }
];

// ---------- DOM refs ----------
const statesGrid = document.getElementById("statesGrid");
const placesGrid = document.getElementById("placesGrid");
const contactForm = document.getElementById("contactForm");
const contactResp = document.getElementById("contactResp");

// ---------- UI Renderers ----------
function renderStates(list = STATES_SAMPLE) {
  statesGrid.innerHTML = list.map(s => `
    <div class="category-card" role="article" onclick="openState('${s.id}')">
      <div class="category-icon"><i class="fas fa-map"></i></div>
      <h3>${s.name}</h3>
      <p style="color:rgba(255,255,255,0.7);margin-top:0.5rem">${s.desc}</p>
    </div>
  `).join("");
}

function renderPlaces(list = PLACES_SAMPLE) {
  placesGrid.innerHTML = list.map(p => `
    <div class="place-card">
      <div class="place-image"><i class="fas fa-landmark"></i></div>
      <div class="place-info">
        <h3>${p.name}</h3>
        <p style="color:rgba(255,255,255,0.7)">${p.loc}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.8rem">
          <div style="color:#ffd700">${"★".repeat(Math.round(p.rating))}</div>
          <button class="btn btn-outline" onclick="openPlaceDetails('${p.id}')">Details</button>
        </div>
      </div>
    </div>
  `).join("");
}

// ---------- Interactions ----------
function handleSearch() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!q) { renderStates(); renderPlaces(); return; }
  const sf = STATES_SAMPLE.filter(s => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));
  const pf = PLACES_SAMPLE.filter(p => p.name.toLowerCase().includes(q) || p.loc.toLowerCase().includes(q));
  renderStates(sf.length ? sf : [{ id:'no', name:'No results', desc:'Try different keywords', img:'' }]);
  renderPlaces(pf);
}

function openState(id) {
  const st = STATES_SAMPLE.find(s => s.id === id);
  alert(st ? `${st.name}\n\n${st.desc}` : "State not found");
}

function openPlaceDetails(id) {
  const p = PLACES_SAMPLE.find(x => x.id === id);
  alert(p ? `${p.name}\n${p.loc}\nRating: ${p.rating}` : "Place not found");
}

function getLocation(){
  if (!navigator.geolocation) return alert("Geolocation not supported");
  navigator.geolocation.getCurrentPosition(pos=>{
    const {latitude,longitude}=pos.coords;
    alert(`Lat: ${latitude.toFixed(4)}\nLng: ${longitude.toFixed(4)}\nUse this to search nearby places.`);
    // Later call backend with coords to get nearby
  },err=>alert("Unable to get location"));
}

// ---------- Contact submit (calls backend if BASE_URL set) ----------
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  contactResp.textContent = "Sending...";
  const payload = {
    name: document.getElementById('cname').value,
    email: document.getElementById('cemail').value,
    message: document.getElementById('cmessage').value
  };

  if (!BASE_URL || BASE_URL.includes("your-backend-url")) {
    // local fallback demo
    setTimeout(()=>{ contactResp.textContent = "Message simulated (no backend configured)."; contactForm.reset(); },600);
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/contact/send`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    const data = await res.json();
    contactResp.textContent = data?.message || "Message sent";
    contactForm.reset();
  } catch (err) {
    contactResp.textContent = "Server error. Check backend URL.";
  }
});

// ---------- Mock auth forms ----------
function mockLogin(e){ e.preventDefault(); closeModal('loginModal'); alert('Logged in (demo)'); updateAuthUI(); }
function mockSignup(e){ e.preventDefault(); closeModal('signupModal'); alert('Account created (demo)'); updateAuthUI(); }
function updateAuthUI(){ /* replace auth buttons with profile etc. */ }

// ---------- Modal helpers ----------
function openModal(id){ document.getElementById(id).style.display = 'flex'; document.body.style.overflow='hidden'; }
function closeModal(id){ document.getElementById(id).style.display = 'none'; document.body.style.overflow='auto'; }

// ---------- Theme ----------
function switchTheme(){
  const v = document.getElementById('themeSelect').value;
  document.body.classList.remove('light-mode','night-mode');
  if (v==='light') document.body.classList.add('light-mode');
  if (v==='night') document.body.classList.add('night-mode');
  localStorage.setItem('selectedTheme', v);
}
window.addEventListener('DOMContentLoaded',()=>{
  renderStates(); renderPlaces();
  const t = localStorage.getItem('selectedTheme')||'dark';
  document.getElementById('themeSelect').value = t; switchTheme();
});
