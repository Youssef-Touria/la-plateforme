/**Retourne l'utilisateur connecté (depuis localStorage)*/
function getCurrentUser() {
  const data = localStorage.getItem("user_id");
  return data ? JSON.parse(data) : null;
}

/**
 * Redirige vers la page de connexion
 */
function redirectToLogin() {
  window.location.href = "../login.html";
}

/* Vérification d'accès (admin uniquement) */

const currentUser = getCurrentUser();

if (!currentUser || localStorage.getItem("role") !== "admin") {
  redirectToLogin();
}
