document.addEventListener('DOMContentLoaded', () => {
  // Si on est sur la page de connexion : capture et enregistre les valeurs
  const form = document.getElementById('connexion-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[name="email"]')?.value ?? '';
      const password = form.querySelector('input[name="password"]')?.value ?? '';
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => 
            u.email === email.trim() && 
            u.password === password.trim()
        );
      console.log("Tentative de connexion avec :", localStorage.getItem('users'));
      if (foundUser)
      {
        console.log("Utilisateur trouvé :", foundUser);
      }
      // Redirige vers index.html après sauvegarde (optionnel)
      //window.location.href = 'index.html';
    });
    return;
  }




  // Si on est sur index.html : récupère et affiche les valeurs stockées
  const userInfo = document.getElementById('user-info');
  if (userInfo) {
    const email = localStorage.getItem('email') || '';
    const password = localStorage.getItem('password') || '';
    userInfo.innerHTML = `
      <p>Email : ${escapeHtml(email)}</p>
      <p>Mot de passe : ${escapeHtml(password)}</p>
    `;
  }
});

// Petit utilitaire pour échapper le HTML et éviter l'injection
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]
  );
}
