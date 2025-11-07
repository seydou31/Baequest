const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function createUser(user) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify(user),
  }).then(checkResponse);
}

function login(user) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  }).then(checkResponse);
}

function createProfile(profile) {
  return fetch(`${baseUrl}/users/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profile),
  }).then(checkResponse);
}

function getProfile() {
  return fetch(`${baseUrl}/users/profile`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then(checkResponse);
}

  function logout() {

  return fetch(`${baseUrl}/logout`, {
     method: "POST",
      credentials: "include",
  }).then(checkResponse);
}

function updateProfile(profile){
   return fetch(`${baseUrl}/users/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profile),
  }).then(checkResponse);
}


export { createUser, login, createProfile, getProfile, logout, updateProfile };
