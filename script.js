// *** Lichter-Animation ***
const colors = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'];
const lightsContainer = document.getElementById('lights');
const toggleButton = document.getElementById('toggleBtn');
const numberOfLights = 10;

function createLights() {
  for (let i = 0; i < numberOfLights; i++) {
    const light = document.createElement('div');
    light.classList.add('light');
    lightsContainer.appendChild(light);
  }
}

function changeLightColors() {
  const allLights = document.querySelectorAll('.light');
  allLights.forEach((light) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    light.style.backgroundColor = randomColor;
  });
}

let interval;
let lightsOn = false;
function toggleLights() {
  if (lightsOn) {
    clearInterval(interval);
    toggleButton.innerText = 'Lichter an';
  } else {
    interval = setInterval(changeLightColors, 500);
    toggleButton.innerText = 'Lichter aus';
  }
  lightsOn = !lightsOn;
}

createLights();
toggleButton.addEventListener('click', toggleLights);

// *** Schneeflocken-Animation ***
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

let snowflakes = [];

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createSnowflake() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 0.5,
    wind: Math.random() * 2 - 1,
  };
}

function updateSnowflakes() {
  snowflakes.forEach((flake) => {
    flake.y += flake.speed;
    flake.x += flake.wind;

    // Wieder oben erscheinen, wenn sie unten sind
    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }

    // Seitlich wieder erscheinen
    if (flake.x > canvas.width) {
      flake.x = 0;
    } else if (flake.x < 0) {
      flake.x = canvas.width;
    }
  });
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.beginPath();

  snowflakes.forEach((flake) => {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
  });

  ctx.fill();
}

function animateSnowflakes() {
  updateSnowflakes();
  drawSnowflakes();
  requestAnimationFrame(animateSnowflakes);
}

// Fenstergröße anpassen und Schneeflocken neu initialisieren
window.addEventListener('resize', () => {
  setupCanvas();
  snowflakes = Array.from({ length: 100 }, createSnowflake);
});

// Setup und Start der Animation
setupCanvas();
snowflakes = Array.from({ length: 100 }, createSnowflake);
animateSnowflakes();
