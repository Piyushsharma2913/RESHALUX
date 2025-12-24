const card = document.querySelector(".card");
const hammer = new Hammer(card);

hammer.on("panend", e => {
  if (e.deltaX > 100) {
    alert("Liked → WhatsApp open hoga");
  } else if (e.deltaX < -100) {
    alert("Skipped");
  }
});
