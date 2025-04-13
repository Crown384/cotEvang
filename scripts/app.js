const freshersForm = document.querySelector('#freshersForm');
const uploadBtnForFreshers = document.querySelector('#uploadExcelFresher');

const allExcelFiles = document.querySelector('#allExcelFiles');

freshersForm.addEventListener('submit', e => {
  e.preventDefault();
  
  const data = {
    name: freshersForm.name.value,
    department: freshersForm.dept.value,
    address: freshersForm.address.value,
    phone: freshersForm.phone.value,
    level: '100'
  }
  
  let savedData = JSON.parse(localStorage.getItem('freshersData')) || [];
  savedData.push(data);
  localStorage.setItem('freshersData', JSON.stringify(savedData));
  alert("Saved offline");
  
  freshersForm.reset();
})



function downloadExcel() {
  const data = JSON.parse(localStorage.getItem("freshersData")) || [];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, "cot_fresher.xlsx");
}


// upload to cloduinary wigh userUID

auth.onAuthStateChanged(user => {
  if(user) {
    uploadBtnForFreshers.addEventListener('click', () => {
      uploadFresherFile(user.uid)
    });
    fetchExcelFiles();
    setUI(user);
  } else {
    alert("no user logged in");
    setUI();
  }
})


function uploadFresherFile(userUID) {
  const data = JSON.parse(localStorage.getItem("freshersData")) || [];

  if (data.length === 0) {
    alert("No data found to upload.");
    return;
  }

  // Create an Excel worksheet from JSON data
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Convert workbook to binary array
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Convert binary array to a Blob
  const fileBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  // Create FormData to send the file
  const formData = new FormData();
  formData.append("file", fileBlob, "cot_fresher.xlsx");
  formData.append("upload_preset", UPLOAD_PRESET); // Replace with your Cloudinary preset
  formData.append("public_id", userUID); // Set the user's UID as the file name
  formData.append("folder", "EvangApp")

  // Upload to Cloudinary
  fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.secure_url) {
      console.log("File uploaded successfully:", data.secure_url);
      alert("File uploaded successfully!");
    } else {
      console.log("Upload error:", data);
      alert("Upload failed!");
    }
  })
  .catch(error => {
    console.error("Upload error:", error);
  });
}

async function fetchExcelFiles() {
  try {
    const res = await fetch('http://localhost:3000/excel-files');
    const files = await res.json();

    const container = document.getElementById('allExcelFiles');
    container.innerHTML = '';

    // Load docs
    db.collection('users').get().then(snapshot => {
      let html = '';
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
        html += ` <div>name: ${doc.data().name}</div>
          <div>phone: ${doc.data().phone}</div>`
      })
      // return html;
      container.innerHTML += html;
    })

    if (files.length === 0) {
      container.textContent = 'No Excel files found.';
      return;
    } else {
      files.forEach(file => {
        let link = `<a href="${file.url}" target="_blank">${file.fileName}</a><hr>`;
        container.innerHTML += link;
        // container.appendChild(document.createElement('hr'));
      })
    };

  } catch (err) {
    document.getElementById('allExcelFiles').textContent = 'Error loading files.';
    console.error(err);
  }
}

// SET UI
const userInfo = document.querySelectorAll('.logged-in');
const outsidersInfo = document.querySelectorAll('.logged-out');

const setUI = (user) => {
  if (user) {
    userInfo.forEach(userIF => {
      userIF.style.display = 'block';
    });
    outsidersInfo.forEach(userIF => {
      userIF.style.display = 'none'
    });
  } else {
    userInfo.forEach(userIF => {
      userIF.style.display = 'none'
    });
    outsidersInfo.forEach(userIF => {
      userIF.style.display = 'block'
    });
  }
}