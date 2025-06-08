document.querySelector('.lgOut')?.addEventListener('click', async () => {
  try {
    await signOut(auth);
    // M.toast({ html: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    // M.toast({ html: `Logout failed: ${error.message}` });
  }
});


const freshersFuc = () => {
  console.log('fresher');
  document.querySelector('#freshersForm').classList.remove('hidden');
  document.querySelector('#allExcelFiles').classList.add('hidden');
  document.querySelector('#staylitesForm').classList.add('hidden')
  document.querySelector('.triggerFresh').classList.remove('inactive');
  document.querySelector('.triggerStay').classList.add('inactive');
  document.querySelector('.triggerAllEcelFiles').classList.add('inactive');
}

const staylitesFuc = () => {
  document.querySelector('#freshersForm').classList.add('hidden');
  document.querySelector('#allExcelFiles').classList.add('hidden');
  document.querySelector('#staylitesForm').classList.remove('hidden');
  document.querySelector('.triggerFresh').classList.add('inactive');
  document.querySelector('.triggerStay').classList.remove('inactive');
  document.querySelector('.triggerAllEcelFiles').classList.add('inactive');
}

const excelFilesFuc = () => {
  document.querySelector('#freshersForm').classList.add('hidden');
  document.querySelector('#allExcelFiles').classList.remove('hidden');
  document.querySelector('#staylitesForm').classList.add('hidden');
  document.querySelector('.triggerFresh').classList.add('inactive');
  document.querySelector('.triggerStay').classList.add('inactive');
  document.querySelector('.triggerAllEcelFiles').classList.remove('inactive');
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Logout button
  document.querySelector('.lgOut').addEventListener('click', logOut);
  
  // Menu buttons
  document.querySelector('.triggerFresh').addEventListener('click', freshersFuc);
  document.querySelector('.triggerStay').addEventListener('click', staylitesFuc);
  document.querySelector('.triggerAllEcelFiles').addEventListener('click', excelFilesFuc);
});