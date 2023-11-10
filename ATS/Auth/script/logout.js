const loggedOut = document.getElementById('logout');

loggedOut.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut().then(() => {
        console.log('user signed out')
        window.location.assign('/ATS/Auth/login.html')
    })
})
