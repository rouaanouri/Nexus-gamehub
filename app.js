const gamesData = {
  snake: {
    emoji: "🐍",
    num: "GAME 01",
    title: "SNAKE",
    badge: "صعب",
    bClass: "d-hard",
    desc: "تحرّك الثعبان وكُل الطعام دون أن تصطدم. 5 مستويات والسرعة تتزايد!",
    link: "Snak/snak.html",
  },
  guess: {
    emoji: "🔢",
    num: "GAME 02",
    title: "GUESSING THE NUMBERS",
    badge: "سهل",
    bClass: "d-easy",
    desc: "الكمبيوتر اختار رقماً بين 1 و100. خمّنه باستخدام تلميحات أكبر/أصغر في أقل محاولات!",
    link: "gusess/Number gusses.html",
  },
  rps: {
    emoji: "✂️",
    num: "GAME 03",
    title: "ROCK · PAPER · SCISSORS",
    badge: "سهل",
    bClass: "d-easy",
    desc: "اختر حجرة أو ورقة أو مقص وتحدّ الكمبيوتر. أول من يصل لـ 5 انتصارات يفوز!",
    link: "rps/rock.html",
  },
  xo: {
    emoji: "❌",
    num: "GAME 04",
    title: "XO",
    badge: "متوسط",
    bClass: "d-med",
    desc: "Tic-Tac-Toe الكلاسيكية! العب ضد AI أو صديق على نفس الجهاز. أكمل صفاً أو عموداً أو قطراً!",
    link:  "XO/XO game.html" ,
  },
  higher: {
    emoji: "📈",
    num: "GAME 05",
    title: "LOWER OR HIGHER",
    badge: "متوسط",
    bClass: "d-med",
    desc: "رقم يظهر أمامك — هل الرقم التالي أكبر أو أصغر؟ تسلسل لا نهاية له، كم إجابة صحيحة تجمع؟",
    link: "higher/index.html" ,
  },
  dice: {
    emoji: "🎲",
    num: "GAME 06",
    title: "DICE ",
    badge: "سهل",
    bClass: "d-easy",
    desc: "ارمِ النرد وقارن نتيجتك بالكمبيوتر. أعلى رقم يأخذ النقطة. أول من يصل لـ10 يفوز!",
    link:  "dice/index.html" ,
  },
};

function openModal(id) {
  const g = gamesData[id];
  if (!g) return;
  document.getElementById("mEmoji").textContent = g.emoji;
  document.getElementById("mNum").textContent = g.num;
  document.getElementById("mTitle").textContent = g.title;
  document.getElementById("mDesc").textContent = g.desc;
  const b = document.getElementById("mBadge");
  b.textContent = g.badge;
  b.className = "dbadge " + g.bClass;
  document.getElementById("mHeader").style.background =
    "linear-gradient(135deg, rgba(120,100,255,0.08) 0%, transparent 80%)";
  document.getElementById("mGo").onclick = () =>
    (window.location.href = g.link);
  document.getElementById("overlay").classList.add("show");
}
function closeModal() {
  document.getElementById("overlay").classList.remove("show");
}
document.getElementById("overlay").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener("mousemove", (e) => {
  const g = document.getElementById("cursorGlow");
  g.style.left = e.clientX + "px";
  g.style.top = e.clientY + "px";
});
