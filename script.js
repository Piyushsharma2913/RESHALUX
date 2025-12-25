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
      imgs: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      name: "Silk Saree",
      price: "₹499/day",
      cat: "saree",
      imgs: [
        "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1612423284934-2850a4cb8f23?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ],
  buy: [
    {
      name: "Designer Kurti",
      price: "₹1999",
      cat: "kurti",
      imgs: [
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1612423284934-2850a4cb8f23?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      name: "Party Gown",
      price: "₹3499",
      cat: "gown",
      imgs: [
        "https://images.unsplash.com/photo-1612423284934-2850a4cb8f23?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]
};

let currentItem = null;
let currentImgIndex = 0;

function getItems() {
  return data[mode].filter(i => category === "all" || i.cat === category);
}

function loadCard() {
  container.innerHTML = "";
  const items = getItems();
  if (!items.length) {
    container.innerHTML = "<p style='text-align:center;color:#888'>No more dresses</p>";
    return;
  }

  currentItem = items[0];
  currentImgIndex = 0;

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-img-container" onclick="openImageModal()">
      <img id="card-image" src="${currentItem.imgs[currentImgIndex]}" alt="${currentItem.name}" draggable="false" />
      <div class="dots">
        ${currentItem.imgs.map((_, i) => `<span class="${i === currentImgIndex ? 'active' : ''}" onclick="changeImage(event, ${i})"></span>`).join('')}
      </div>
    </div>
    <div class="card-info">
      <h3>${currentItem.name}</h3>
      <p>${currentItem.price}</p>
    </div>
    <div class="card-actions">
      <button class="skip" onclick="skip(currentItem)" title="Skip"><i class="fa-solid fa-xmark"></i></button>
      <button class="like" onclick="order(currentItem)" title="Buy"><i class="fa-solid fa-heart"></i></button>
    </div>
  `;

  container.appendChild(card);
  enableSwipe(card, currentItem);
}

function changeImage(e, index) {
  e.stopPropagation();
  currentImgIndex = index;
  const img = document.getElementById("card-image");
  img.src = currentItem.imgs[currentImgIndex];

  // update dots active state
  const dots = img.nextElementSibling;
  if (dots) {
    dots.querySelectorAll("span").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentImgIndex);
    });
  }
}

function openImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modalImg.src = currentItem.imgs[currentImgIndex];
  modal.style.display = "flex";
}

function closeImageModal(e) {
  if (e.target.id === "imageModal") {
    document.getElementById("imageModal").style.display = "none";
  }
}

function enableSwipe(card, item) {
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    card.style.transition = "none";
    dragging = true;
  });

  card.addEventListener("touchmove", e => {
    if (!dragging) return;
    currentX = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 15}deg)`;
  });

  card.addEventListener("touchend", e => {
    dragging = false;
    card.style.transition = "0.3s ease";
    if (currentX > 100) {
      order(item);
    } else if (currentX < -100) {
      skip(item);
    } else {
      card.style.transform = "translateX(0)";
    }
    currentX = 0;
  });

  // mouse events for desktop swipe simulation
  card.addEventListener("mousedown", e => {
    startX = e.clientX;
    card.style.transition = "none";
    dragging = true;
  });

  document.addEventListener("mousemove",
