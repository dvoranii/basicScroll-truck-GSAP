// truck moving
const anim = basicScroll.create({
  elem: document.querySelector(".truck-element"),
  from: "top-bottom",
  to: "top-top",
  direct: true,
  props: {
    "--my-prop": {
      from: "-1000px",
      to: "30px",
    },
  },
});

anim.start();

const path = "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80";

const tl = gsap.timeline({ repeat: -1 });

tl.to(".truck-element", {
  duration: 5,
  motionPath: {
    path: path,
    align: path,
    autoRotate: true,
  },
});
// Spinning wheels

let allWheels = document.querySelectorAll(".wheel");

allWheels.forEach((wheel) => {
  const anim2 = basicScroll.create({
    elem: wheel,
    from: "top-bottom",
    to: "top-top",
    direct: true,
    props: {
      "--rotation": {
        from: "0",
        to: "4turn",
      },
    },
  });

  anim2.start();
});

// background fade

const anim3 = basicScroll.create({
  elem: document.querySelector(".bg"),
  from: "viewport-top",
  to: "top-top",
  direct: true,
  duration: 1000,
  props: {
    "--bg-opacity": {
      from: "1",
      to: "0.01",
    },
  },
});

anim3.start();

// TRUCK BACKGROUNF CLOUDS
const canvas = document.getElementById("cloudCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const cloudImage = document.getElementById("cloudImage");

class Cloud {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = Math.random() * 0.5 + 0.1;
  }

  draw() {
    ctx.drawImage(cloudImage, this.x, this.y, this.size, this.size);
  }

  update() {
    this.x += this.speed;
    if (this.x > canvas.width + this.size) {
      this.x = -this.size;
    }
  }
}

class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

const stars2 = [];
for (let i = 0; i < 200; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 1.5 + 0.5;
  stars2.push(new Star(x, y, size));
}

const clouds = [];
for (let i = 0; i < 8; i++) {
  const x = Math.random() * canvas.width - 150;
  const y = Math.random() * canvas.height * 0.5;
  const size = Math.random() * 600 + 90;
  clouds.push(new Cloud(x, y, size));
}

let isNight;

let toggleBtn = document.querySelector("#toggle");

toggleBtn.addEventListener("change", () => {
  console.log(toggleBtn.checked);
  if (toggleBtn.checked === true) {
    isNight = true;
  }

  if (toggleBtn.checked === false) {
    isNight = false;
  }
});

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (!isNight) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#87CEEB");
    gradient.addColorStop(1, "#FFFFFF");
    ctx.fillStyle = gradient;

    clouds.forEach((cloud) => {
      cloud.update();
      cloud.draw();
    });

    document.querySelector(".high-beam-light").style.display = "none";
    document.querySelector(".truck-element").style.filter = `brightness(1)`;
    document.querySelector(".truck-bg-inner").style.background = `
    url("./assets/side-road-view.png")`;
  }

  if (isNight) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.querySelector(
      ".truck-bg-inner"
    ).style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),
    url("./assets/side-road-view.png")`;

    document.querySelector(".truck-element").style.filter = `brightness(0.9)`;

    stars2.forEach((star) => {
      star.draw(ctx);
    });

    document.querySelector(".high-beam-light").style.display = "block";
  }

  requestAnimationFrame(updateCanvas);
}

updateCanvas();
