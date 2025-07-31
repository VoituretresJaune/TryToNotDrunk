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
    // Réduire la fréquence des messages pour éviter le spam
    if (Math.random() < 0.1) { // Seulement 10% du temps
      afficherMessage('💾 Sauvegarde effectuée', 'success');
    }
    mettreAJourStatutSauvegarde();
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
      console.log('Jeu chargé ! Matière:', matiere, 'Sodas:', sodas, 'Points:', points);
      afficherMessage('📁 Progression restaurée !', 'success');
      mettreAJourStatutSauvegarde();
      return true;
    } else {
      console.log('Aucune sauvegarde trouvée');
      mettreAJourStatutSauvegarde();
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
      mettreAJourStatutSauvegarde();
    } catch (error) {
      console.error('Erreur de réinitialisation:', error);
      afficherMessage('❌ Erreur de réinitialisation', 'error');
    }
  }
}

function mettreAJourStatutSauvegarde() {
  const sauvegarde = localStorage.getItem('jeuSodaSauvegarde');
  const statutElement = document.getElementById('statut-sauvegarde');
  if (statutElement) {
    if (sauvegarde) {
      const donnees = JSON.parse(sauvegarde);
      const date = new Date(donnees.dateSauvegarde);
      statutElement.textContent = `💾 Dernière sauvegarde: ${date.toLocaleString()}`;
      statutElement.style.color = '#4CAF50';
    } else {
      statutElement.textContent = '❌ Aucune sauvegarde';
      statutElement.style.color = '#f44336';
    }
  }
}

function mettreAJourAffichage() {
  document.getElementById('matiere').textContent = matiere;
  document.getElementById('matiere2').textContent = matiere;
  document.getElementById('sodas').textContent = sodas;
  document.getElementById('sodas2').textContent = sodas;
  document.getElementById('points').textContent = points;
  mettreAJourStatutSauvegarde();
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
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOM chargé, tentative de restauration...');
  
  // S'assurer que tous les éléments existent
  const elements = ['matiere', 'matiere2', 'sodas', 'sodas2', 'points'];
  let manquants = [];
  
  elements.forEach(id => {
    if (!document.getElementById(id)) {
      manquants.push(id);
    }
  });
  
  if (manquants.length > 0) {
    console.error('Éléments manquants:', manquants);
  }
  
  const chargementReussi = charger();
  if (!chargementReussi) {
    // Si aucune sauvegarde, initialiser l'affichage
    mettreAJourAffichage();
  }
  console.log('État après chargement - Matière:', matiere, 'Sodas:', sodas, 'Points:', points);
});

// Fonction de debug pour tester la sauvegarde
function testerSauvegarde() {
  console.log('=== TEST DE SAUVEGARDE ===');
  console.log('État actuel:', { matiere, sodas, points });
  
  // Tester si localStorage fonctionne
  try {
    localStorage.setItem('test', 'ok');
    const test = localStorage.getItem('test');
    console.log('LocalStorage fonctionne:', test === 'ok');
    localStorage.removeItem('test');
  } catch (e) {
    console.error('LocalStorage ne fonctionne pas:', e);
  }
  
  // Vérifier la sauvegarde actuelle
  const sauvegarde = localStorage.getItem('jeuSodaSauvegarde');
  console.log('Sauvegarde actuelle:', sauvegarde);
  
  if (sauvegarde) {
    try {
      const donnees = JSON.parse(sauvegarde);
      console.log('Données sauvegardées:', donnees);
    } catch (e) {
      console.error('Erreur parsing sauvegarde:', e);
    }
  }
}

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
