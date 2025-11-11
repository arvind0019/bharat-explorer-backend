import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// 🗺️ Static fallback data (basic guide)
const travelData = {
  "uttar pradesh": "Famous for Varanasi ghats, Taj Mahal (Agra), Ayodhya Ram Mandir, and Lucknow cuisine.",
  "rajasthan": "Known for royal forts, palaces, and cities like Jaipur, Udaipur, and Jaisalmer.",
  "goa": "Popular for beaches, nightlife, and water sports. Best time: November to February.",
  "kashmir": "Heaven on earth — Dal Lake, Gulmarg, Sonmarg. Best time: April–October.",
  "tamil nadu": "Rich in temples like Meenakshi Amman, and beaches like Marina.",
  "kerala": "Famous for backwaters, Munnar, Alleppey, and ayurvedic treatments.",
  "gujarat": "Visit Statue of Unity, Somnath Temple, Gir National Park.",
  "bihar": "Home to Bodh Gaya, Nalanda University ruins, and Vaishali.",
};

router.post("/guide", async (req, res) => {
  const { query } = req.body;

  if (!query) return res.status(400).json({ message: "Missing query text!" });

  try {
    const normalized = query.toLowerCase();

    // 🧩 Step 1: Static match
    for (const [state, info] of Object.entries(travelData)) {
      if (normalized.includes(state)) {
        return res.json({ answer: `📍 ${info}` });
      }
    }

    // 🧠 Step 2: Fallback to OpenAI API (AI-generated answer)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.json({
        answer: "AI key missing. Add your OpenAI API key in .env to enable smart answers.",
      });
    }

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Bharat Explorer, a travel guide for India." },
          { role: "user", content: query },
        ],
        max_tokens: 200,
      }),
    });

    const data = await aiResponse.json();
    const answer = data.choices?.[0]?.message?.content || "No AI response received.";

    res.json({ answer });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error generating guide." });
  }
});

export default router;
