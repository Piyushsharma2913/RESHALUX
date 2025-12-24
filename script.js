const container = document.getElementById("card-container");
const likeBtn = document.querySelector(".like");
const skipBtn = document.querySelector(".skip");

let mode = "rent";
let category = "all";
let currentIndex = 0;

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
  return data[mode].filter(
    item => category === "all" || item.cat === category
  );
}

function loadCard() {
  container.innerHTML = "";
  const items = getItems();
  if (!items[currentIndex]) return;

  const item = items[currentIndex];
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${item.img}">
    <div class="card-info">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
    </div>
  `;

  enableSwipe(card, item);
  container.appendChild(card);
}

function enableSwipe(card, item) {
  let startX = 0, moveX = 0;

  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    card.style.transition = "none";
  });

  card.addEventListener("touchmove", e => {
    moveX = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${moveX}px) rotate(${moveX / 15}deg)`;
  });

  card.addEventListener("touchend", () => {
    card.style.transition = "transform 0.3s ease";
    if (moveX > 120) likeItem(item);
    else if (moveX < -120) skipItem();
    else card.style.transform = "translateX(0)";
  });
}

function likeItem(item) {
  container.firstChild.style.transform = "translateX(120vw)";
  window.open(
    `https://wa.me/${whatsappNumber}?text=I%20want%20to%20${mode}%20${item.name}`,
    "_blank"
  );
  next();
}

function skipItem() {
  container.firstChild.style.transform = "translateX(-120vw)";
  next();
}

function next() {
  setTimeout(() => {
    currentIndex++;
    loadCard();
  }, 300);
}

likeBtn.onclick = () => {
  const item = getItems()[currentIndex];
  if (item) likeItem(item);
};

skipBtn.onclick = skipItem;

function switchMode(m) {
  mode = m;
  currentIndex = 0;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  event.target.classList.add("active");
  loadCard();
}

function setCategory(cat) {
  category = cat;
  currentIndex = 0;
  document.querySelectorAll(".categories span").forEach(s => s.classList.remove("active"));
  event.target.classList.add("active");
  loadCard();
}

loadCard();
// ABOUT POPUP FUNCTIONS
function openAbout() {
  document.getElementById("aboutModal").style.display = "flex";
}

function closeAbout() {
  document.getElementById("aboutModal").style.display = "none";
}
