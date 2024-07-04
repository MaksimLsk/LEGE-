import Groq from "groq-sdk";
import { config } from "dotenv";

config("./.env");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const urlInput = document.getElementById("url-input");
const urlBtnSearch = document.getElementById("url-btn-search");

urlBtnSearch.addEventListener("click", async () => {
  const url = urlInput.value;
  const chatCompletion = await getGroqChatCompletion(url);
  const summary = chatCompletion.choices[0]?.message?.content || "";
  const response = await getResponse(summary);
  const htmlResponse = response.html;
  const markdownResponse = response.markdown;
  const ttsResponse = response.tts;
 
  // Afficher le résumé en HTML
  const htmlElement = document.createElement("div");
  htmlElement.innerHTML = htmlResponse;
  document.body.appendChild(htmlElement);

  // Afficher le résumé en Markdown
  const markdownElement = document.createElement("div");
  markdownElement.innerHTML = markdownResponse;
  document.body.appendChild(markdownElement);

  // Jouer le texte en TTS
  const audioElement = document.createElement("audio");
  audioElement.src = ttsResponse;
  audioElement.play();
});

async function getGroqChatCompletion(url) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: url,
      },
    ],
    model: "llama3-70b-8192",
  });
}

async function getResponse(summary) {
  // Faire une requête API pour récupérer le résumé en HTML, Markdown et TTS
  const response = await fetch(`https://api.example.com/summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ summary }),
  });
  const data = await response.json();
  return data;
}
