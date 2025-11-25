// Validation simple 
(function(){
  const form = document.getElementById('inscription-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorBox = document.getElementById('error');

  // email doit être du domaine laplateforme.io 
  const domainRe = /^[a-zA-Z0-9._%+-]+@laplateforme\.io$/i;

/*   localStorage.clear(); */

  form.addEventListener('submit', function(e){
    e.preventDefault();
    errorBox.style.color = ''; 
    errorBox.textContent = '';

    if (!nameInput.value.trim()) {
      errorBox.textContent = 'Le nom est requis.';
      nameInput.focus();
      return;
    }

    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      errorBox.textContent = "L'adresse e-mail est requise.";
      emailInput.focus();
      return;
    }

    if (!domainRe.test(emailVal)) {
      errorBox.textContent = "E-mail invalide — utilisez une adresse au format user@laplateforme.io";
      emailInput.focus();
      return;
    }

    if (passwordInput.value.length < 6) {
      errorBox.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
      passwordInput.focus();
      return;
    }

    // --- stockage dans localStorage ---
    const users = JSON.parse(localStorage.getItem('users') || '[{"id" : 0, "email" : "admin@laplateforme.io", "role" : "admin", "password" : "admin"}]');

    // 2) vérifier doublon par e‑mail (insensible à la casse)
    if (users.some(u => u.email.toLowerCase() === emailVal.toLowerCase())) {
      errorBox.textContent = "Cet e-mail est déjà inscrit.";
      emailInput.focus();
      return;
    }

    // 3) ajouter l'utilisateur 
    users.push({
      name: nameInput.value.trim(),
      email: emailVal.toLowerCase(),
      password: passwordInput.value,
      role: "user",
      id: users.length
    });

    //  convertir le tableau en chaîne JSON
    localStorage.setItem('users', JSON.stringify(users));
  

    // feedback et reset du formulaire
    errorBox.style.color = 'green';
    errorBox.textContent = "Inscription enregistrée en local .";
    console.log (localStorage.getItem ('users'));
    form.reset();
  });
})();