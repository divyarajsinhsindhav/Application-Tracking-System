// for sr_no
let serialNumberCounter = 0;

// Assuming you have already authenticated the user and have access to their userID
let currentUserID;
let email; // Define the email variable at a higher scope.

auth.onAuthStateChanged((user) => {
    if (user) {
        currentUserID = user.uid;
        email = user.email; // Set the email variable here.
        console.log("Current user's email: " + email);
        // Later, you can unsubscribe from the observer when it's no longer needed.
        // For example, in a component's cleanup or when the user logs out.
        // Reference to the parent document
        const jillaPanchayatRef = jillaPanchayatDB.collection('Jilla Panchayat').doc('application');

        // Reference to the subcollection
        const applicationDetailsRef = jillaPanchayatRef.collection('applicationDetails');

        // `currentUserID` is valid, so you can proceed with the Firestore query.
        applicationDetailsRef.where('email', '==', email).get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    console.log('No documents found in the subcollection');
                } else {
                    snapshot.forEach(doc => {
                        console.log('Subdocument ID:', doc.id);
                        console.log('Subdocument data:', doc.data());
                        addTableRow(doc);
                        modalData(doc);
                    });
                }
            })
            .catch((error) => {
                console.error('Error getting subdocuments:', error);
            });
    }
});

function modalData(doc) {
  const modalId = 'modal-' + doc.id;
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'modal-xl');
  modal.id = modalId;
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">APPLICATION DETAIL</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h2>Subject: ${doc.data().subject}</h2>
          <p>Email: ${doc.data().email}</p>
          <p>Application: ${doc.data().applicationText}</p>
          <p>Instruction: ${doc.data().feedback} </p>
          <label for="feedback">Feedback:</label>
          <p id="feedback"></p>
        </div>
      </div>
    </div>
  `;

 return modal;
 
}

const tbody = document.getElementById('tbody');

function addTableRow(doc) {
    // Create a new table row
    var newRow = document.createElement('tr');

    // Create cells for the row
    var cell1 = document.createElement('th');
    var cell2 = document.createElement('td');
    var cell3 = document.createElement('td');
    var cell4 = document.createElement('td');
    var cell5 = document.createElement('td');
    var status = document.createElement('td');

    // Create a button element
    var viewButton = document.createElement('button');
    viewButton.setAttribute('type', 'button');
    viewButton.setAttribute('class', 'btn btn-primary');
    viewButton.setAttribute('data-bs-toggle', 'modal');
    viewButton.setAttribute('data-bs-target', '#citizen');

    serialNumberCounter++;

    newRow.setAttribute('data-id', doc.id);
    cell4.textContent = doc.data().subject;
    cell3.textContent = doc.id;
    cell2.textContent = doc.data().date;
    cell1.textContent = serialNumberCounter;
    status.textContent = doc.data().status;

    viewButton.textContent = 'View';

    // Append the button to the fifth cell
    cell5.appendChild(viewButton);

    // Append all cells to the new row
    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);
    newRow.appendChild(cell4);
    newRow.appendChild(status);
    newRow.appendChild(cell5);

    // Append the new row to the specified table body
    tbody.appendChild(newRow);

    viewButton.addEventListener('click', function () {
      const modal = modalData(doc);
      const modalsContainer = document.getElementById('modals-container');
      console.log('Subject:', doc.data().subject);
      console.log('Apllicaton:', doc.data().applicationText)
      console.log('Status:', doc.data().status);
      console.log('Instruction:', doc.data().feedback);
      modalsContainer.innerHTML = ''; // Clear previous modals
      modalsContainer.appendChild(modal);
  });
}


// // Later, you can unsubscribe from the observer when it's no longer needed.
// // For example, in a component's cleanup or when the user logs out.
// // Reference to the parent document
// const jillaPanchayatRef = jillaPanchayatDB.collection('Jilla Panchayat').doc('application');

// // Reference to the subcollection
// const applicationDetailsRef = jillaPanchayatRef.collection('applicationDetails');

// // `currentUserID` is valid, so you can proceed with the Firestore query.
// applicationDetailsRef.where('email', '==', email).get()
//     .then((snapshot) => {
//         if (snapshot.empty) {
//             console.log('No documents found in the subcollection');
//         } else {
//             snapshot.forEach(doc => {
//                 console.log('Subdocument ID:', doc.id);
//                 console.log('Subdocument data:', doc.data());
//                 addTableRow(doc);
//             });
//         }
//     })
//     .catch((error) => {
//         console.error('Error getting subdocuments:', error);
//     });

