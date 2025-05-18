const signIn = () => {
  document.querySelector('.general').style.display = "none";
  document.querySelector('#signInOut').classList.remove('hidden');
  document.querySelector('.signin-container').classList.remove('hidden');
  document.querySelector('.signup-container').classList.add('hidden');
};

const signUp = () => {
  document.querySelector('.general').style.display = "none";
  document.querySelector('#signInOut').classList.remove('hidden');
  document.querySelector('.signup-container').classList.remove('hidden');
  document.querySelector('.signin-container').classList.add('hidden');
};

const logOut = () => {
  auth.signOut()
    .then(() => alert("You logged out"))
    .catch(err => alert(`${err.message}`));
};

const freshersFuc = () => {
  console.log('fresher');
  document.querySelector('#freshersForm').classList.remove('hidden');
  document.querySelector('#allExcelFiles').classList.add('hidden');
  document.querySelector('#staylitesForm').classList.add('hidden');
  document.querySelector('.triggerFresh').classList.remove('inactive');
  document.querySelector('.triggerStay').classList.add('inactive');
  document.querySelector('.triggerAllEcelFiles').classList.add('inactive');
};

const staylitesFuc = () => {
  document.querySelector('#freshersForm').classList.add('hidden');
  document.querySelector('#allExcelFiles').classList.add('hidden');
  document.querySelector('#staylitesForm').classList.remove('hidden');
  document.querySelector('.triggerFresh').classList.add('inactive');
  document.querySelector('.triggerStay').classList.remove('inactive');
  document.querySelector('.triggerAllEcelFiles').classList.add('inactive');
};

const excelFilesFuc = () => {
  document.querySelector('#freshersForm').classList.add('hidden');
  document.querySelector('#allExcelFiles').classList.remove('hidden');
  document.querySelector('#staylitesForm').classList.add('hidden');
  document.querySelector('.triggerFresh').classList.add('inactive');
  document.querySelector('.triggerStay').classList.add('inactive');
  document.querySelector('.triggerAllEcelFiles').classList.remove('inactive');
};


document.addEventListener('click', (e) => {
  if (e.target.matches('.triggerFresh')) freshersFuc();
  else if (e.target.matches('.triggerStay')) staylitesFuc();
  else if (e.target.matches('.triggerAllEcelFiles')) excelFilesFuc();
});