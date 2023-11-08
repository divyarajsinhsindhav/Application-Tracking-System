auth.onAuthStateChanged(function (user) {
    if (user) {
        const userid = user.uid;
        document.getElementById('userid').value = userid;
        console.log(userid)
        const email = user.email;
        console.log("Current user's email: " + email);
    }
});

const selection = document.getElementById('selection').value

// Reference to the parent document
const jillaPanchayatRef = jillaPanchayatDB.collection('Jilla Panchayat').doc('application');

// Reference to the subcollection
const applicationDetailsRef = jillaPanchayatRef.collection('applicationDetails');
//Use only submit not form
const submit = document.getElementById('submit')
// const form = document.getElementById('applicationForm');
submit.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission

    auth.onAuthStateChanged(function (user) {
        if (user) {
            const userid = user.uid;
            document.getElementById('userid').value = userid;
            console.log(userid);
            const email = user.email;
            console.log("Current user's email: " + email);

            // Create a new Date object to get the current date
            const currentDate = new Date();

            // Get the day, month, and year from the Date object
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
            const year = currentDate.getFullYear();

            // Format the date as "dd-mm-yyyy"
            const formattedDate = `${day}-${month}-${year}`;

            console.log(formattedDate); // Output: e.g., "03-11-2023"


            // Get a reference to your Firestore collection
            const applicationDetailsRef = jillaPanchayatDB.collection('Jilla Panchayat').doc('application').collection('applicationDetails');

            // Get form elements
            const citizenId = userid; // You already have this from the user ID
            const firstNameValue = document.getElementById('firstName').value;
            const lastNameValue = document.getElementById('lastName').value;
            const mobileNumberValue = document.getElementById('mobileNumber').value;
            const addressValue = document.getElementById('address').value;
            const subjectValue = document.getElementById('subject').value;
            const applicationTextValue = document.getElementById('applicationText').value;

            // Add the application to Firestore
            applicationDetailsRef.add({
                userId: citizenId,
                date: formattedDate,
                firstName: firstNameValue,
                lastName: lastNameValue,
                mobileNumber: mobileNumberValue,
                email: email, // Use the email obtained from the onAuthStateChanged callback
                address: addressValue,
                subject: subjectValue,
                applicationText: applicationTextValue,
                status: 'pending',
                feedback: ''
            })
                .then(function (docRef) {
                    console.log("Application submitted with ID: ", docRef.id);
                    window.location.assign("/ATS/user/deshboard.html");
                    // Handle success or redirection to a thank-you page, for example.
                })
                .catch(function (error) {
                    console.error("Error submitting application: ", error);
                });
        }
    });
})    
