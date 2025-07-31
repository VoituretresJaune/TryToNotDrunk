let matiere = 0;
let sodas = 0;
let points = 0;

// Fonction navigation
function openSection(name) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.getElementById('menu').style.display = 'none';
  document.getElementById(name).style.display = 'block';
}

function closeSection() {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.getElementById('menu').style.display = 'block';
}

// Fonctions jeu
function produire() {
  matiere++;
  document.getElementById('matiere').textContent = matiere;
  document.getElementById('matiere2').textContent = matiere;
}

function fabriquer() {
  if (matiere >= 5) {
    matiere -= 5;
    sodas++;
    document.getElementById('matiere2').textContent = matiere;
    document.getElementById('sodas').textContent = sodas;
    document.getElementById('sodas2').textContent = sodas;
  }
}

function boire() {
  if (sodas > 0) {
    sodas--;
    points += 10;
    document.getElementById('sodas2').textContent = sodas;
    document.getElementById('points').textContent = points;
    document.getElementById('sodas').textContent = sodas;
  }
}
