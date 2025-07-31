let matiere = 0;
let sodas = 0;
let points = 0;

// Système de sauvegarde locale
function sauvegarder() {
  const donnees = {
    matiere: matiere,
    sodas: sodas,
    points: points,
    dateSauvegarde: new Date().toISOString()
  };
  try {
    localStorage.setItem('jeuSodaSauvegarde', JSON.stringify(donnees));
    console.log('Jeu sauvegardé !');
    afficherMessage('💾 Jeu sauvegardé !', 'success');
  } catch (error) {
    console.error('Erreur de sauvegarde:', error);
    afficherMessage('❌ Erreur de sauvegarde', 'error');
  }
}

function charger() {
  try {
    const sauvegarde = localStorage.getItem('jeuSodaSauvegarde');
    if (sauvegarde) {
      const donnees = JSON.parse(sauvegarde);
      matiere = donnees.matiere || 0;
      sodas = donnees.sodas || 0;
      points = donnees.points || 0;
      
      // Mettre à jour l'affichage
      mettreAJourAffichage();
      console.log('Jeu chargé !');
      afficherMessage('📁 Jeu chargé !', 'success');
      return true;
    } else {
      afficherMessage('❌ Aucune sauvegarde trouvée', 'info');
      return false;
    }
  } catch (error) {
    console.error('Erreur de chargement:', error);
    afficherMessage('❌ Erreur de chargement', 'error');
    return false;
  }
}

function reinitialiser() {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ?')) {
    try {
      localStorage.removeItem('jeuSodaSauvegarde');
      matiere = 0;
      sodas = 0;
      points = 0;
      mettreAJourAffichage();
      console.log('Jeu réinitialisé !');
      afficherMessage('🔄 Jeu réinitialisé !', 'success');
    } catch (error) {
      console.error('Erreur de réinitialisation:', error);
      afficherMessage('❌ Erreur de réinitialisation', 'error');
    }
  }
}

function mettreAJourAffichage() {
  document.getElementById('matiere').textContent = matiere;
  document.getElementById('matiere2').textContent = matiere;
  document.getElementById('sodas').textContent = sodas;
  document.getElementById('sodas2').textContent = sodas;
  document.getElementById('points').textContent = points;
}

function afficherMessage(message, type) {
  // Supprimer le message précédent s'il existe
  const ancienMessage = document.getElementById('message-sauvegarde');
  if (ancienMessage) {
    ancienMessage.remove();
  }
  
  // Créer le nouveau message
  const messageDiv = document.createElement('div');
  messageDiv.id = 'message-sauvegarde';
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 1000;
    background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
  `;
  
  document.body.appendChild(messageDiv);
  
  // Supprimer le message après 3 secondes
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 3000);
}

// Charger automatiquement au démarrage
window.addEventListener('load', function() {
  charger();
});

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
  sauvegarder(); // Sauvegarde automatique
}

function fabriquer() {
  if (matiere >= 5) {
    matiere -= 5;
    sodas++;
    document.getElementById('matiere2').textContent = matiere;
    document.getElementById('sodas').textContent = sodas;
    document.getElementById('sodas2').textContent = sodas;
    sauvegarder(); // Sauvegarde automatique
  }
}

function boire() {
  if (sodas > 0) {
    sodas--;
    points += 10;
    document.getElementById('sodas2').textContent = sodas;
    document.getElementById('points').textContent = points;
    document.getElementById('sodas').textContent = sodas;
    sauvegarder(); // Sauvegarde automatique
  }
}
