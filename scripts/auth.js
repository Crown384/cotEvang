// 

const signupForm = document.querySelector('#signup-form');


// SIGNUP USERS
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // console.log(cred.user.uid);
    return db.collection("users").doc(cred.user.uid).set({
      name: signupForm.username.value,
      phone: signupForm['signup-phone'].value,
      whatsapp: signupForm['signup-whatsapp'].value,
    });
  }).then (() => {
    signupForm.reset();
    const modalInstance = 
    M.Modal.getInstance(document.querySelector('#modal-signup')).close();
  }).catch(err => {
    console.log(err.message)
  })
})
