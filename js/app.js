import {fetchPosts, fetchPostByID, loginFunction, fetchPostsEditPage, createPostFunction, editPostFunction, register, loadMorePostsBlogFeed, loadMorePostsEditPage, toggleOptionMenu, reorderPosts
} from "./functions.js";
import {
    checkIfLoggedIn, logoutFunction, burgerMenuSetup
} from "./utils.js";

function getPathname() {
    const url = new URL(window.location.href);
    let pathname = url.pathname;
    return pathname;
}

function route() {
    const pathname = getPathname();

    switch(pathname) {
        case '/FED1-Project-Exam-1/index.html':

            fetchPosts();
            loadMorePostsBlogFeed();
            toggleOptionMenu();
            reorderPosts();
            break;
        case '/FED1-Project-Exam-1/post/index.html':

            fetchPostByID();
            break;
        case '/FED1-Project-Exam-1/post/make.html':

            checkIfLoggedIn();
            burgerMenuSetup();
            createPostFunction();
            logoutFunction();
            break;
        case '/FED1-Project-Exam-1/post/edit.html':

            checkIfLoggedIn();
            fetchPostsEditPage();
            burgerMenuSetup();
            loadMorePostsEditPage();
            editPostFunction();
            logoutFunction();
            break;
        case '/FED1-Project-Exam-1/account/login.html':

            loginFunction();
            break;
        case '/FED1-Project-Exam-1/account/register.html':

            document.getElementById('registerSubmit').addEventListener('click', register);
            break;
        default:
            console.log('Page not found');
    }
}

window.addEventListener('load', route);
window.addEventListener('popstate', route);
