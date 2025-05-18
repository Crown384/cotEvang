const freshersForm = document.querySelector('#freshersForm');
const staylitesForm = document.querySelector('#staylitesForm');
const uploadBtnForStaylites = document.querySelector('#uploadExcelStaylite');
const uploadBtnForFreshers = document.querySelector('#uploadExcelFresher');
const allExcelFiles = document.querySelector('#allExcelFiles');
const userInfo = document.querySelectorAll('.logged-in');
const outsidersInfo = document.querySelectorAll('.logged-out');
const adminInfo = document.querySelectorAll(".admin");

// Save form data to localStorage
freshersForm.addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    name: freshersForm.name?.value,
    department: freshersForm.dept?.value,
    address: freshersForm.address?.value,
    phone: freshersForm.phone?.value,
    level: '100'
  };

  let savedData = JSON.parse(localStorage.getItem('freshersData')) || [];
  savedData.push(data);
  localStorage.setItem('freshersData', JSON.stringify(savedData));

  M.toast({ html: "Saved Offline" });
  freshersForm.reset();
});
staylitesForm.addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    name: staylitesForm.name?.value,
    department: staylitesForm.dept?.value,
    address: staylitesForm.address?.value,
    phone: staylitesForm.phone?.value,
    level: staylitesForm.level?.value
  };

  let savedData = JSON.parse(localStorage.getItem('staylitesData')) || [];
  savedData.push(data);
  localStorage.setItem('staylitesData', JSON.stringify(savedData));

  M.toast({ html: "Saved Offline" });
  staylitesForm.reset();
});

// Convert local data to Excel and download
function downloadExcel() {
  const data = JSON.parse(localStorage.getItem("staylitesData")) || [];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "cot_fresher.xlsx");
}

function downloadExcelStay() {
  console.log('hi')
  const data = JSON.parse(localStorage.getItem("freshersData")) || [];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "cot_staylites.xlsx");
}

// Upload Excel to Cloudinary
function uploadFresherFile(userUID) {
  const data = JSON.parse(localStorage.getItem("freshersData")) || [];
  if (data.length === 0) {
    return alert("No data found to upload.");
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const fileBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  const formData = new FormData();
  formData.append("file", fileBlob, "cot_fresher.xlsx");
  formData.append("upload_preset", UPLOAD_PRESET); // Define this globally
  formData.append("public_id", `${userUID}_${Date.now()}`);
  formData.append("folder", "EvangApp");

  fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.secure_url) {
        M.toast({ html: `File Uploaded Successfully` });
        fetchExcelFiles(); // Optional: Refresh list
      } else {
        console.log("Upload error:", data);
        M.toast({ html: `Upload failed` });
      }
    })
    .catch(error => {
      console.error("Upload error:", error);
      M.toast({ html: `Upload failed` });
    });
}
function uploadaStayliteFile(userUID) {
  const data = JSON.parse(localStorage.getItem("staylitesData")) || [];
  if (data.length === 0) {
    return alert("No data found to upload.");
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const fileBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  const formData = new FormData();
  formData.append("file", fileBlob, "cot_staylites.xlsx");
  formData.append("upload_preset", UPLOAD_PRESET); // Define this globally
  formData.append("public_id", `${userUID}_${Date.now()}`);
  formData.append("folder", "EvangAppStaylites");

  fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.secure_url) {
        M.toast({ html: `File Uploaded Successfully` });
        fetchExcelFiles(); // Optional: Refresh list
      } else {
        console.log("Upload error:", data);
        M.toast({ html: `Upload failed` });
      }
    })
    .catch(error => {
      console.error("Upload error:", error);
      M.toast({ html: `Upload failed` });
    });
}

// Fetch and display all uploaded Excel files
async function fetchExcelFiles() {
  try {
    const res = await fetch('https://cotevang.onrender.com');
    const files = await res.json();
    const container = document.getElementById('allExcelFiles');
    container.innerHTML = '';

    if (files.length === 0) {
      container.textContent = 'No Excel files found.';
      return;
    }

    for (const file of files) {
      const card = document.createElement('div');
      card.classList.add('excel-card');

      const link = document.createElement('a');
      link.href = file.url;
      link.textContent = file.fileName;
      link.target = '_blank';
      link.style.fontWeight = 'bold';
      card.appendChild(link);

      const userUid = file.fileName.replace(/\.xlsx$/, '');
      try {
        const snapshot = await db.collection('users').doc(userUid).get();
        const data = snapshot.data();

        if (data) {
          const userInfo = document.createElement('div');
          userInfo.innerHTML = `
            <div>Name: ${data.name}</div>
            <div>Phone: ${data.phone}</div>
          `;
          card.appendChild(userInfo);
        } else {
          card.innerHTML += `<div style="color: red;">User data not found</div>`;
        }
      } catch (err) {
        card.innerHTML += `<div style="color: red;">Error loading user data</div>`;
        console.error(`Error fetching data for ${file.fileName}: ${err.message}`);
      }

      container.appendChild(card);
    }
  } catch (err) {
    document.getElementById('allExcelFiles').textContent = 'Error loading files.';
    //console.error(err);
  }
}

// UI control
const setUI = (user) => {
  const show = user ? 'block' : 'none';
  const hide = user ? 'none' : 'block';

  userInfo.forEach(el => el.style.display = show);
  outsidersInfo.forEach(el => el.style.display = hide);
  //outsidersInfo.forEach((el) => el.classList.remove('hidden');
  console.log('hello');
};

// Unified auth listener
auth.onAuthStateChanged(user => {
  if (user) {
    setUI(user);
    uploadBtnForFreshers.addEventListener('click', () => uploadFresherFile(user.uid));
    uploadBtnForStaylites.addEventListener('click', () => uploadFresherFile(user.uid));
    fetchExcelFiles();

    // Check admin
    db.collection('users').doc(user.uid).get().then(snap => {
      const isAdmin = snap.data()?.isAdmin;
      if (isAdmin) {
        adminInfo.forEach(el => el.classList.add('showAdmin'));
      }
    }).catch(err => {
      console.error('Admin check failed:', err);
    });

  } else {
    setUI(null);
    M.toast({ html: `No User logged In` });
  }
});