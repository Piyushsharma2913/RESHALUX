const container = document.getElementById("card-container");
const likeBtn = document.querySelector(".like");
const skipBtn = document.querySelector(".skip");

let mode = "rent";
let category = "all";

const whatsappNumber = "918107249155";

const data = {
  rent: [
    { name: "Royal Lehenga", price: "₹799/day", cat: "lehenga", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990" },
    { name: "Silk Saree", price: "₹499/day", cat: "saree", img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2" }
  ],
  buy: [
    { name: "Designer Kurti", price: "₹1999", cat: "kurti", img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6" },
    { name: "Party Gown", price: "₹3499", cat: "gown", img: "https://images.unsplash.com/photo-1612423284934-2850a4cb8f23" }
  ]
};

function getItems() {
  return data[mode].filter(item =>
    category === "all" || item.cat === category
  );
}

function loadCard() {
  container.innerHTML = "";
  const items = getItems();

  if (items.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#888;margin-top:40px;">No more dresses</p>`;
    return;
  }

  const item = items[0];
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    card.innerHTML = `
  <img src="${item.img}">

  <div class="card-actions">
    <button class="skip"><i class="fa-solid fa-xmark"></i></button>
    <button class="like"><i class="fa-solid fa-heart"></i></button>
  </div>

  <div class="card-info">
    <h3>${item.name}</h3>
    <p>${item.price}</p>
  </div>
    const likeBtn = card.querySelector(".like");
const skipBtn = card.querySelector(".skip");

likeBtn.onclick = () => likeItem(item);
skipBtn.onclick = skipItem;

`;

  `;

  enableSwipe(card, item);
  container.appendChild(card);
}

/* 🔥 SWIPE ENGINE */
function enableSwipe(card, item) {
  let startX = 0;
  let moveX = 0;

  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    card.style.transition = "none";
  });

  card.addEventListener("touchmove", e => {
    moveX = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${moveX}px) rotate(${moveX / 20}deg)`;
  });

  card.addEventListener("touchend", () => {
    card.style.transition = "transform 0.3s ease";

    if (moveX > 100) {
      likeItem(item);
    } else if (moveX < -100) {
      skipItem(item);
    } else {
      card.style.transform = "translateX(0)";
    }
  });
}

/* ✅ RIGHT SWIPE */
function likeItem(item) {
  container.firstChild.style.transform = "translateX(120vw)";
  setTimeout(() => {
    removeItem(item);
    window.open(
      `https://wa.me/${whatsappNumber}?text=I%20want%20to%20${mode}%20${item.name}`,
      "_blank"
    );
    loadCard();
  }, 300);
}

/* ✅ LEFT SWIPE */
function skipItem(item) {
  container.firstChild.style.transform = "translateX(-120vw)";
  setTimeout(() => {
    removeItem(item);
    loadCard();
  }, 300);
}

/* 🔥 ITEM REMOVE (MOST IMPORTANT) */
function removeItem(item) {
  const index = data[mode].indexOf(item);
  if (index > -1) {
    data[mode].splice(index, 1);
  }
}

/* BUTTON SUPPORT */
likeBtn.onclick = () => {
  const item = getItems()[0];
  if (item) likeItem(item);
};

skipBtn.onclick = () => {
  const item = getItems()[0];
  if (item) skipItem(item);
};

/* MODE SWITCH */
function switchMode(m) {
  mode = m;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  event.target.classList.add("active");
  loadCard();
}

/* CATEGORY */
function setCategory(cat) {
  category = cat;
  document.querySelectorAll(".categories span").forEach(s => s.classList.remove("active"));
  event.target.classList.add("active");
  loadCard();
}

/* ABOUT */
function openAbout() {
  document.getElementById("aboutModal").style.display = "flex";
}
function closeAbout() {
  document.getElementById("aboutModal").style.display = "none";
}

loadCard();
setTimeout(() => {
  document.getElementById("listPopup").style.display = "flex";
}, 2000);

function closeListPopup() {
  document.getElementById("listPopup").style.display = "none";
}


