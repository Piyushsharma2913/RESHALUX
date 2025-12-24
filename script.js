const container = document.getElementById("card-container");

let mode = "rent";
let category = "all";

const whatsappNumber = "918107249155";

const data = {
  rent: [
    {
      name: "Royal Lehenga",
      price: "₹799/day",
      cat: "lehenga",
      img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990"
    },
    {
      name: "Silk Saree",
      price: "₹499/day",
      cat: "saree",
      img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2"
    }
  ],
  buy: [
    {
      name: "Designer Kurti",
      price: "₹1999",
      cat: "kurti",
      img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6"
    },
    {
      name: "Party Gown",
      price: "₹3499",
      cat: "gown",
      img: "https://images.unsplash.com/photo-1612423284934-2850a4cb8f23"
    }
  ]
};

/* ---------- HELPERS ---------- */
function getItems() {
  return data[mode].filter(i => category === "all" || i.cat === category);
}

/* ---------- LOAD CARD ---------- */
function loadCard() {
  container.innerHTML = "";
  const items = getItems();

  if (!items.length) {
    container.innerHTML =
      `<p style="text-align:center;color:#888;margin-top:40px">No more dresses</p>`;
    return;
  }

  const item = items[0];
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${item.img}">
    <div class="card-info">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
    </div>

    <div class="card-actions">
      <button class="skip"><i class="fa-solid fa-xmark"></i></button>
      <button class="like"><i class="fa-solid fa-heart"></i></button>
    </div>
  `;

  container.appendChild(card);

  enableSwipe(card, item);

  card.querySelector(".like").onclick = () => likeItem(item);
  card.querySelector(".skip").onclick = () => skipItem(item);
}

/* ---------- SWIPE ENGINE (iOS SAFE) ---------- */
function enableSwipe(card, item) {
  let startX = 0;
  let moveX = 0;

  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    card.style.transition = "none";
  }, { passive: true });

  card.addEventListener("touchmove", e => {
    moveX = e.touches[0].clientX - startX;
    card.style.transform =
      `translateX(${moveX}px) rotate(${moveX / 15}deg)`;
  }, { passive: true });

  card.addEventListener("touchend", () => {
    card.style.transition = "transform 0.3s ease";

    if (moveX > 120) likeItem(item);
    else if (moveX < -120) skipItem(item);
    else card.style.transform = "translateX(0)";
  });
}

/* ---------- ACTIONS ---------- */
function likeItem(item) {
  animateOut(1);
  setTimeout(() => {
    removeItem(item);
    window.open(
      `https://wa.me/${whatsappNumber}?text=I%20want%20to%20${mode}%20${item.name}`,
      "_blank"
    );
    loadCard();
  }, 300);
}

function skipItem(item) {
  animateOut(-1);
  setTimeout(() => {
    removeItem(item);
    loadCard();
  }, 300);
}

function animateOut(dir) {
  const card = container.firstChild;
  if (!card) return;
  card.style.transform = `translateX(${dir * 120}vw) rotate(${dir * 15}deg)`;
}

function removeItem(item) {
  const index = data[mode].indexOf(item);
  if (index > -1) data[mode].splice(index, 1);
}

/* ---------- MODE & CATEGORY ---------- */
function switchMode(m, btn) {
  mode = m;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  loadCard();
}

function setCategory(cat, el) {
  category = cat;
  document.querySelectorAll(".categories span")
    .forEach(s => s.classList.remove("active"));
  el.classList.add("active");
  loadCard();
}

/* ---------- ABOUT POPUP ---------- */
function openAbout() {
  document.getElementById("aboutModal").style.display = "flex";
}

function closeAbout() {
  document.getElementById("aboutModal").style.display = "none";
}

/* ---------- LIST POPUP ----------*
