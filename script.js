// Variabel Utama
const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loader = document.getElementById('loader');
const aiName = document.getElementById('ai-display-name');
const userName = document.getElementById('user-name');
const aiAvatar = document.getElementById('ai-avatar');
const clock = document.getElementById('clock');
const sidebar = document.getElementById('sidebar');
const settingsModal = document.getElementById('settings-modal');
let voiceOn = false;
let currentTheme = 'blue';

// Jam Realtime (Sederhana)
setInterval(() => {
    clock.innerText = new Date().toLocaleTimeString();
}, 1000);

// Toggle Sidebar
function toggleSidebar() {
    sidebar.classList.toggle('sidebar-hidden');
    sidebar.classList.toggle('sidebar-shown');
}

// Toggle Voice Output
function toggleVoice() {
    voiceOn = !voiceOn;
    document.getElementById('voice-btn').innerText = voiceOn ? "🔊" : "🔈";
    if(voiceOn) speak("Suara aktif, Tuan Wahyu.");
}

// Suara AI (Sederhana)
function speak(text) {
    if (!voiceOn) return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'id-ID';
    utter.pitch = 1.4;
    utter.rate = 1.0;
    synth.speak(utter);
}

// Tambah Bubble Chat
function addBubble(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    
    if (type === 'bot') {
        let i = 0;
        function typeEffect() {
            if (i < text.length) {
                div.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
                i++;
                setTimeout(typeEffect, 20);
            } else {
                speak(div.innerText);
            }
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        typeEffect();
    } else {
        div.innerText = text;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    chatBox.appendChild(div);
}

// Validasi Input (Tidak Ada Perintah Bebas)
const ALLOWED_COMMANDS = [
    "menu", "fitur", "music id", "buat logo", "buat website", 
    "cari script", "ganti nama", "pengaturan", "riwayat chat", "hapus chat"
];

function validateInput(text) {
    const lowerText = text.toLowerCase().trim();
    if (!lowerText) return { valid: false, message: "❌ Perintah tidak boleh kosong!" };
    
    let isAllowed = false;
    for (const cmd of ALLOWED_COMMANDS) {
        if (lowerText.includes(cmd)) {
            isAllowed = true;
            break;
        }
    }
    
    if (!isAllowed) {
        return { valid: false, message: "❌ Perintah tidak dikenali! Ketik 'Menu Fitur' untuk melihat yang tersedia." };
    }
    return { valid: true, message: "OK" };
}

// Proses Perintah
async function process(cmd) {
    const p = cmd.toLowerCase();
    loader.classList.remove('hidden');

    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Ganti Nama AI
       
