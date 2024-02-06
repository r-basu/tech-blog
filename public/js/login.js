const loginForm = document.getElementById("login-form");
const createForm = document.getElementById("create-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userObj = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  login(userObj);
});

const login = async (userObj) => {
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.href = "/";
    } else {
      alert("Wrong information");
    }
  });
};

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userObj = {
    username: document.getElementById("create-username").value,
    password: document.getElementById("create-password").value,
  };
  createUsr(userObj);
});

const createUsr = async (userObj) => {
  fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.href = "/";
    }
  });
};
