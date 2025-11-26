/* storage.js — Gestion des données (JSON + localStorage)*/

/**
 * Clés utilisées dans localStorage
 */
const STORAGE_KEYS = {
  USERS: "users",
  REQUESTS: "calendar-reservations",
};

/* Chargement Utilisateurs */

/**
 * Charge les utilisateurs depuis :
 * 1. localStorage si déjà existant
 * 2. sinon depuis users.json
 */
function loadUsers() {
  let data = localStorage.getItem(STORAGE_KEYS.USERS);

  // Important : doit renvoyer une PROMESSE
  if (data) {
    return Promise.resolve(JSON.parse(data));
  }

  // Sinon on charge depuis le JSON initial
  return fetch("./data/users.json")
    .then((res) => res.json())
    .then((json) => {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(json));
      return json;
    })
    .catch((err) => {
      console.error("Erreur chargement users.json :", err);
      return [];
    });
}

/**
 * Sauvegarde les utilisateurs dans localStorage
 */
function saveUsers(usersArray) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(usersArray));
}

/* Chargement Demandes */

function loadRequests() {
  let data = localStorage.getItem("calendar-reservations");

  if (data) {
    return Promise.resolve(JSON.parse(data));
  } else {
    return fetch("./data/requests.json")
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(json));
        return json;
      })
      .catch((err) => {
        console.error("Erreur chargement requests.json :", err);
        return [];
      });
  }
}

/* Sauvegarde les demandes */
function saveRequests(requestsArray) {
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requestsArray));
}

function resetStorage() {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.REQUESTS);
}
