const signIn = () => {
    const accountType = document.getElementById('accountType').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (accountType == 'jillaPanchayat') {
        jillaPanchayatLogin(email, password);
    }else if(accountType == 'talukaPanchayat'){
        talukaLogin(email, password);
    } else if (accountType == 'citizen') {
        citizenLogin(email, password);
    }
}

const jillaPanchayatLogin = (inputEmail, password) => {
    const authCollection = jillaPanchayatDB.collection('Jilla Panchayat');

    return authCollection.doc('auth').get()
        .then((doc) => {
            const superAdmin = doc.data().email;

            if (inputEmail === superAdmin) {
                return auth.signInWithEmailAndPassword(inputEmail, password)
                    .then((response) => {
                        console.log(response.user);
                        window.location.assign("/ATS/admin/applicationboard.html");
                    })
                    .catch((error) => {
                        alert(error.message);
                        console.log(error.code);
                        console.log(error.message);
                    });
            } else {
                alert("Emails do not match. Please enter the correct email.");
            }
        })
        .catch((error) => {
            console.error("Error querying Firestore for Jilla Panchayat:", error);
        });
}


const citizenLogin = (inputEmail, password) => {
    const authCollection = citizenDB.collection('citizen');

    return authCollection.where('email', '==', inputEmail).get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                alert("No user found with the provided email.");
            } else {
                querySnapshot.forEach((doc) => {
                    const citizen = doc.data().email;

                    if (inputEmail === citizen) {
                        return auth.signInWithEmailAndPassword(inputEmail, password)
                            .then((response) => {
                                console.log(response.user);
                                window.location.assign("/ATS/user/deshboard.html");
                            })
                            .catch((error) => {
                                alert(error.message);
                                console.log(error.code);
                                console.log(error.message);
                            });
                    } else {
                        alert("Emails do not match. Please enter the correct email.");
                    }
                });
            }
        })
        .catch((error) => {
            console.error("Error querying Firestore for Citizen:", error);
        });
}
