import {fetchPosts, fetchPostByID, loginFunction, fetchPostsEditPage, createPostFunction, editPostFunction, register, loadMorePostsBlogFeed, loadMorePostsEditPage, toggleOptionMenu, reorderPosts
} from "./functions.js";
import {
    checkIfLoggedIn, logoutFunction, burgerMenuSetup
} from "./utils.js";

function getPathname() {
    const url = new URL(window.location.href);
    let pathname = url.pathname;

    switch (window.location.host) {
        case 'localhost':
        case '127.0.0.1':
            pathname = pathname.replace('/my-local-project', '/FED1-Project-Exam-1');
            break;
        case 'innovatechsolutions.netlify.app':
            pathname = pathname.replace('/innovatechsolutions.netlify.app', '/FED1-Project-Exam-1');
            break;
        default:
            break;
    }

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
