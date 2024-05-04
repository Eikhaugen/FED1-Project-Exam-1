import {
    fetchPostsInitial,
    fetchPostByID,
    loginFunction,
    fetchPostsEditPage,
    createPostFunction,
    editPostFunction,
    register, loadMorePostsBlogFeed, loadMorePostsEditPage
} from "./functions.js";
import {
    checkIfLoggedIn,
    logoutFunction,
    burgerMenuSetup
} from "./utils.js";

function getPathname() {
    return window.location.pathname;
}

function route() {
    const pathname = getPathname();

    switch(pathname) {
        case '/FED1-Project-Exam-1/index.html':

            fetchPostsInitial();
            loadMorePostsBlogFeed();
            // TODO carousel functionality
            // TODO function to reorder posts
            // TODO function to filter by tags?
            // TODO function to search?
            break;
        case '/FED1-Project-Exam-1/post/index.html':

            fetchPostByID();
            break;
        case '/FED1-Project-Exam-1/post/make.html':

            checkIfLoggedIn();
            burgerMenuSetup();
            createPostFunction()
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

            loginFunction()
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
