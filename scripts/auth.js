const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const logOut = document.querySelector('#logout');


// Handle Login Form Submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    M.toast({ html: "Login successful!" });
    alert("Logged in")
  } catch (error) {
    M.toast({ html: `Login failed: ${error.message}` });
  }
});

// Handle Signup Form Submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('username').value;
  const phone = document.getElementById('signup-phone').value;
  const whatsapp = document.getElementById('signup-whatsapp').value;

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(user.uid).set({
      name,
      phone,
      whatsapp,
      isAdmin: false,
    });
    M.toast({ html: "Account created successfully!" });
  } catch (error) {
    M.toast({ html: `Signup failed: ${error.message}` });
  }
});