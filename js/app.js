import {
    fetchPostsInitial,
    fetchPostByID,
    loginFunction,
    fetchPostsEditPage,
    createPostFunction,
    editPostFunction, register
} from "./functions.js";
import {checkIfLoggedIn, logoutFunction} from "./utils.js";

function getPathname() {
    return window.location.pathname;
}

function route() {
    const pathname = getPathname();

    switch(pathname) {
        case '/FED1-Project-Exam-1/index.html':

            fetchPostsInitial()
            // function to load more posts
            // carousel functionality
            // function to reorder posts
            // function to filter by tags
            // function to search
            break;
        case '/FED1-Project-Exam-1/post/index.html':

            fetchPostByID()
            break;
        case '/FED1-Project-Exam-1/post/make.html':

            checkIfLoggedIn();
            createPostFunction()
            logoutFunction();
            break;
        case '/FED1-Project-Exam-1/post/edit.html':

            checkIfLoggedIn();
            fetchPostsEditPage();
            // load more posts
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
            // reroute to index.html
    }
}

window.addEventListener('load', route);
window.addEventListener('popstate', route);
