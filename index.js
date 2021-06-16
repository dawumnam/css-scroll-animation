const html = document.documentElement;
const canvasWrapper = document.querySelector(".canvasWrapper")
const canvas = document.getElementById("hero-lightpass");
const headCanvas = document.getElementById("hero-head")
const context = canvas.getContext("2d");
const headContext = headCanvas.getContext("2d");
const sceneCount = 2
const currentPosition = html.scrollTop
const pixelsPerImage = 33

const frameCount = 148;
const frameCount1 = 132;
const images = [];
const images1 = [];

canvasWrapper.style.height = `${((frameCount+frameCount1)*pixelsPerImage)/10}vh`


const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)

const currentFrame1 = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/${index.toString().padStart(4,'0')}.jpg`
)

const preloadImages = () => {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img)
  }
  for (let i = 0; i < frameCount1; i++) {
    const img = new Image();
    img.src = currentFrame1(i);
    images1.push(img)
  }
};
const img = new Image()
img.src = currentFrame(0);
canvas.width=1458;
canvas.height=820;
headCanvas.width=1458;
headCanvas.height=820;
headContext.transform(1.2,0,0,1.2,headContext.canvas.width / 2,headContext.canvas.height / 2)
context.translate(context.canvas.width / 2,context.canvas.height / 2)

img.onload=function(){
  canvas.style.transform = `matrix(0.8,0,0,0.8,${-context.canvas.width / 2},${-context.canvas.height / 2})`;
  context.drawImage(img, -img.width / 2, -img.height / 2);
}

const updateImage = index => {
  canvas.style.transform = `matrix(${0.8-(index/frameCount)*0.2},0,0,${0.8-(index/frameCount)*0.2},${-context.canvas.width / 2},${-context.canvas.height / 2})`;
  const img = images[index];
  context.drawImage(img, -img.width / 2, -img.height / 2);
}
const updateImage1 = index => {
  const img1 = images1[index];
  headContext.drawImage(img1, -img1.width / 2, -img1.height / 2);
}


window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight - frameCount * pixelsPerImage ;
  const maxScrollTop1 = html.scrollHeight - window.innerHeight - frameCount1 * pixelsPerImage ;
  const scrollFraction = scrollTop / maxScrollTop;
  let scrollFraction1

  if (scrollTop < maxScrollTop1) scrollFraction1 = 0
  else scrollFraction1 = (scrollTop - maxScrollTop1) / maxScrollTop1


  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  const frameIndex1 = Math.min(
    frameCount1 - 1,
    Math.ceil(scrollFraction1 * frameCount1)
  )

  if (scrollTop < maxScrollTop1) {
    requestAnimationFrame(() => updateImage(frameIndex))
    canvas.style.display = "block"
    headCanvas.style.display = "none"
  }
  else {
    requestAnimationFrame(() => updateImage1(frameIndex1))
    headCanvas.style.display = "block"
    canvas.style.display = "none"
 }
 if (scrollFraction1 > 0.9) {
   headCanvas.style.opacity = ((1-scrollFraction1)/0.1)
 } else {
  headCanvas.style.opacity =1
 }

 
});

preloadImages()