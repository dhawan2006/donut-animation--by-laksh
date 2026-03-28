const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

const frameCount = 240;

const images = [];
const imageSeq = {
  frame: 0
};

// preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = `frame_${String(i).padStart(4, "0")}.webp`;
  images.push(img);
}

// render function
function render() {
  if (!images[imageSeq.frame]) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    images[imageSeq.frame],
    0,
    0,
    canvas.width,
    canvas.height
  );
}

// first frame
images[0].onload = () => {
  render();
};

// scroll animation
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  const progress = scrollTop / maxScroll;
  imageSeq.frame = Math.floor(progress * (frameCount - 1));

  render();
});
