let serialNumberCounter = 0;
// Reference to the parent document
const jillaPanchayatRef = jillaPanchayatDB.collection('Jilla Panchayat').doc('application');
  
// Reference to the subcollection
const applicationDetailsRef = jillaPanchayatRef.collection('applicationDetails');
  


const tbody= document.getElementById('tbody');
const modalsContainer = document.getElementById('modals-container');   

function createModal(doc) {
    // Create a new modal
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
            <label for="feedback">Instruction: </label>
            <textarea id='feedback' rows="5" cols="20"></textarea>
            <br>
            <button id="inProgress">In Progress</button>
            <button id="rejectButton">Reject</button>
            <button id="acceptButton">Accept</button>
          </div>
        </div>
      </div>
    `;

    // Add an event listener for the "Accept" button
    const acceptButton = modal.querySelector('#acceptButton');
    const feedback = modal.querySelector('#feedback');
  
    acceptButton.addEventListener('click', () => {
        // Update the status in Firestore to "Accept"

        const updatedData = { status: 'Accept',
                               feedback: feedback.value};
        applicationDetailsRef.doc(doc.id).update(updatedData).then(() => {
          window.location.assign("/ATS/Admin/applicationBoard.html")
        }).catch(error => {
            console.error('Error updating status to Accept:', error);
        });
       
    });

    const inProgress = modal.querySelector('#inProgress');
    inProgress.addEventListener('click', () => {
      //update the status in firestore to In Progress
      const updateData ={
          status: 'InProgress Application',
          feedback: feedback.value
      };
      applicationDetailsRef.doc(doc.id).update(updateData).then(() => {
          window.location.assign("/ATS/Admin/applicationBoard.html")
      })
      .catch(error => {
        console.error('Error updating status to Reject:', error);
      })
    })

    // Add an event listener for the "Reject" button
    const rejectButton = modal.querySelector('#rejectButton');
    rejectButton.addEventListener('click', () => {
        // Update the status in Firestore to "Reject"
        const updatedData = { status: 'Reject',
                              feedback: feedback.value};
        applicationDetailsRef.doc(doc.id).update(updatedData).then(() => {
          window.location.assign("/ATS/Admin/applicationBoard.html")
        }).catch(error => {
            console.error('Error updating status to Reject:', error);
        });
    });

    modalsContainer.appendChild(modal);
      // Open the modal
  const modalInstance = new bootstrap.Modal(document.getElementById(modalId));
  modalInstance.show();
}


function addTableRow(doc) {
  // Create a new table row
  var newRow = document.createElement('tr');

  // Create cells for the row
  var cell1 = document.createElement('th');
  var cell2 = document.createElement('td');
  var cell3 = document.createElement('td');
  var cell4 = document.createElement('td');
  var cell5 = document.createElement('td');
  var cell6 = document.createElement('td');

  // Create a button element
  var viewButton = document.createElement('button');
  viewButton.setAttribute('type', 'button');
  viewButton.setAttribute('class', 'btn btn-primary');
  viewButton.setAttribute('data-bs-toggle', 'modal');
  viewButton.setAttribute('data-bs-target', '#citizen');
  viewButton.textContent = 'View';

  // Append the button to the fifth cell
  cell6.appendChild(viewButton);

 serialNumberCounter++;


 const totalApplication = document.getElementById('total-application')
 totalApplication.textContent = `${serialNumberCounter}`
 
 const totalPending = document.getElementById('total-pending');
const totalAccept = document.getElementById('total-accept');

// Initialize total_pending and total_accept
total_pending = 0;
total_accept = 0;

// ...

function addTableRow(doc) {
  // ...
  // Increment the counters based on application status
  if (doc.data().status === 'pending') {
    total_pending++;
  } else if (doc.data().status === 'Accept') {
    total_accept++;
  }

  // Update the text content of the totalPending and totalAccept elements
  totalPending.textContent = total_pending;
  totalAccept.textContent = total_accept;

  // ...
}

  newRow.setAttribute('data-id', doc.id)
  cell1.textContent = serialNumberCounter;
  cell2.textContent = doc.data().date;
  cell3.textContent = doc.id;
  cell4.textContent = doc.data().subject;
  cell5.textContent = doc.data().status;


  // Append all cells to the new row
  newRow.appendChild(cell1);
  newRow.appendChild(cell2);
  newRow.appendChild(cell3);
  newRow.appendChild(cell4);
  newRow.appendChild(cell5);
  newRow.appendChild(cell6 )

  // Append the new row to the specified table body
  tbody.appendChild(newRow);
  viewButton.addEventListener('click', function () {
    createModal(doc);
  });
}

// Query documents in the subcollection
applicationDetailsRef.get()
    .then((snapshot) => {
        if (snapshot.empty) {
            console.log('No documents found in the subcollection');
        } else {
            snapshot.forEach(doc => {
                console.log('Subdocument ID:', doc.id);
                console.log('Subdocument data:', doc.data());

                addTableRow(doc);

            });
        }
    })
    .catch((error) => {
        console.error('Error getting subdocuments:', error);
    });