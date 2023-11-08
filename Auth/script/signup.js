const createAccount = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
        const userUID = response.user.uid; // Get the user's UID
        console.log(response.user);

        // Pass the userUID to saveData
        saveData(userUID);
    })
    .catch((error) => {
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const taluka = document.getElementById("select-taluka");
    const village = document.getElementById("select-village");

    // Village data by city
    const villagesData = {
        "rajkot": ["Kankot", "Tramba", "Vajdi"],
        "gondal": ["Ambardi", "Bandra", "Ribda"],
        "jetpur": ["Derdi", "Kerali", "Pipalva"]
    };

    // Function to populate the village list based on the selected city
    function updateVillageList() {
        const selectedCity = taluka.value;
        const villages = villagesData[selectedCity] || [];

        // Clear the existing village list
        village.innerHTML = '';

        // Populate the village list with villages for the selected city
        villages.forEach(function(villageName) {
            const listItem = document.createElement("option");
            listItem.textContent = villageName;
            listItem.value = villageName; // Set the value for the option (if needed)
            village.appendChild(listItem);
        });
    }

    // Initial population of the village list
    updateVillageList();

    // Add an event listener to the city select element to update the village list
    taluka.addEventListener("change", updateVillageList);
});



const saveData = (userUID) => {
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const tel = document.getElementById('tel').value;
    const aadhar = document.getElementById('aadharNumber').value;
    const taluka = document.getElementById('select-taluka').value;
    const village = document.getElementById('select-village').value;
    const password = document.getElementById('password').value;

    citizenDB.collection('citizen')
    .add({
        userId: userUID, // Use the user's UID
        firstName: firstName,
        lastName: lastName,
        phoneNumber: tel,
        adhar: aadhar,
        email: email,
        taluka: taluka,
        village: village,
        password: password
    })
    .then(() => {
        window.location.assign("/ATS/user/deshboard.html");
    })
    .catch((error) => {
        alert(error.message);
    });
}
