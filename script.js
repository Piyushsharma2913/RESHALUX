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
        "https://res.cloudinary.com/di5hjrvgg/image/upload/v1766689372/white_bz8o8q.jpg",
        "https://res.cloudinary.com/di5hjrvgg/image/upload/v1766689372/green_lahenga_kqqsy8.jpg"
      ]
    },
    {
      name: "Silk Saree",
      price: "₹499/day",
      cat: "saree",
      imgs: [
        "https://res.cloudinary.com/di5hjrvgg/image/upload/v1766690411/d7623a870e2795fc54020220ab8cba7c_fcjnkk.jpg",
        "https://res.cloudinary.com/di5hjrvgg/image/upload/v1766690411/9b0e2c88a83e4d4338820b10c8f75ae2_dkivxb.jpg"
      ]
    },
    {
      name: "GOLD Net Lehenga",
      price: "₹499/day",
      cat: "lehenga",
      imgs: [
        "https://res.cloudinary.com/di5hjrvgg/image/upload/v1766690411/d7623a870e2795fc54020220ab8cba7c_fcjnkk.jpg"
      ]
    }
  ],
  buy: [
    {
      name: "Designer Kurti",
      price: "₹1999",
      cat: "kurti",
      imgs: [
        "https://res.cloudinary.com/di5hjrvgg/image/upload/v1766689372/kurti_for_sale_jlopte.jpg"
      ]
    },
    {
      name: "Party Gown",
      price: "₹3499",
      cat: "gown",
      imgs: [
        "https://res.cloudinary.com/di5hjrvgg/image/upload/v1766690604/2f34f9cd9ecaeab9e0d2cd77bc10dcff_hbctfb.jpg"
      ]
    }
  ]
};
  buy: [
    {
      name: "Designer Kurti",
      price: "₹1999",
      cat: "kurti",
      imgs: [
        "https://res.cloudinary.com/di5hjrvgg/image/upload/v1766689372/kurti_for_sale_jlopte.jpg,
        ""
      ]
    },
    {
      name: "Party Gown",
      price: "₹3499",
      cat: "gown",
      imgs: [
        "https://res.cloudinary.com/di5hjrvgg/image/upload/v1766690604/2f34f9cd9ecaeab9e0d2cd77bc10dcff_hbctfb.jpg"
      ]
    }
  ]
};

let currentItem = null;
let currentImgIndex = 0;

function getItems(){
  return data[mode].filter(i => category === "all" || i.cat === category);
}

function loadCard(){
  container.innerHTML = "";
  const items = getItems();
  if(!items.length){
    container.innerHTML = "<p style='text-align:center;color:#888'>No more dresses</p>";
    return;
  }

  currentItem = items[0];
  currentImgIndex = 0;

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-img-container" onclick="openImageModal()">
      <img id="card-image" src="${currentItem.imgs[currentImgIndex]}" draggable="false" alt="${currentItem.name}">
      <div class="dots">
        ${currentItem.imgs.map((_, i) => `<span class="${i === currentImgIndex ? 'active' : ''}" onclick="changeImage(event, ${i})"></span>`).join('')}
      </div>
    </div>
    <div class="card-info">
      <h3>${currentItem.name}</h3>
      <p>${currentItem.price}</p>
    </div>
    <div class="card-actions">
      <button class="skip" onclick="skip(currentItem)"><i class="fa-solid fa-xmark"></i></button>
      <button class="like" onclick="order(currentItem)"><i class="fa-solid fa-heart"></i></button>
    </div>
  `;

  container.appendChild(card);
  enableSwipe(card, currentItem);
}

function changeImage(e, index){
  e.stopPropagation();
  currentImgIndex = index;
  const img = document.getElementById("card-image");
  img.src = currentItem.imgs[currentImgIndex];

  // Update dots active state
  const dots = img.nextElementSibling;
  if(dots){
    dots.querySelectorAll("span").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentImgIndex);
    });
  }
}

function openImageModal(){
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modalImg.src = currentItem.imgs[currentImgIndex];
  modal.style.display = "flex";
}

function closeImageModal(){
  document.getElementById("imageModal").style.display = "none";
}

function enableSwipe(card, item){
  let startX = 0;
  let currentX = 0;

  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    card.style.transition = "none";
  });

  card.addEventListener("touchmove", e => {
    currentX = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 15}deg)`;
  });

  card.addEventListener("touchend", () => {
    card.style.transition = "0.3s";
    if (currentX > 100) order(item);
    else if (currentX < -100) skip(item);
    else card.style.transform = "translateX(0)";
    currentX = 0;
  });
}

function order(item){
  const card = container.firstChild;
  card.style.transform = "translateX(120vw) rotate(15deg)";
  setTimeout(() => {
    window.open(`https://wa.me/${whatsappNumber}?text=I%20want%20to%20${mode}%20${item.name}`, "_blank");
    removeItem(item);
    loadCard();
  }, 300);
}

function skip(item){
  const card = container.firstChild;
  card.style.transform = "translateX(-120vw) rotate(-15deg)";
  setTimeout(() => {
    removeItem(item);
    loadCard();
  }, 300);
}

function removeItem(item){
  const i = data[mode].indexOf(item);
  if(i > -1) data[mode].splice(i, 1);
}

function switchMode(m, btn){
  mode = m;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  loadCard();
}

function setCategory(cat, el){
  category = cat;
  document.querySelectorAll(".categories span").forEach(s => s.classList.remove("active"));
  el.classList.add("active");
  loadCard();
}

function openAbout(){ document.getElementById("aboutModal").style.display = "flex"; }
function closeAbout(){ document.getElementById("aboutModal").style.display = "none"; }

loadCard();




