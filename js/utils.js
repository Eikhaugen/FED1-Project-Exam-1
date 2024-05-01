export function checkIfLoggedIn() {
    const accessToken = sessionStorage.getItem('accessToken');
    console.log("check is loaded")
    if (!accessToken || accessToken.trim() === '') {

        window.location.href = '../account/login.html';
    }
}

export function logoutFunction() {

    function logout() {

        sessionStorage.removeItem('accessToken');

        window.location.href = '../account/login.html';
    }

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('logoutBTN')) {
            logout();
        }
    });
}
