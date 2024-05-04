export function checkIfLoggedIn() {
    const accessToken = sessionStorage.getItem('accessToken');

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

// format time and date string
export function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

//Burger Menu
export function burgerMenuSetup(){
    const body = document.querySelector("body");
    const burgerMenuToggle = document.querySelector(".burgerMenuToggle");
    const burgerMenu = document.querySelector(".burgerMenu");

    burgerMenuToggle.addEventListener("click", function(){
        if (burgerMenu.style.display === "none" || burgerMenu.style.display === "") {
            burgerMenu.style.display = "flex";
            body.classList.add("menu-open");
        } else {
            burgerMenu.style.display = "none";
            body.classList.remove("menu-open");
        }
    })
}
