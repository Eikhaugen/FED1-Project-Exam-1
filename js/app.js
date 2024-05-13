import {fetchPosts, fetchPostByID, loginFunction, fetchPostsEditPage, createPostFunction, editPostFunction, register, loadMorePostsBlogFeed, loadMorePostsEditPage, toggleOptionMenu, reorderPosts
} from "./functions.js";
import {
    checkIfLoggedIn, logoutFunction, burgerMenuSetup
} from "./utils.js";

function getPathname() {
    return window.location.pathname;
}

function route() {
    const pathname = getPathname();
    const repoName = 'FED1-Project-Exam-1';

    const path = pathname.replace(`/${repoName}`, '').replace(/^\//, '');

    switch (path) {
        case '':
        case 'index.html':
            fetchPosts();
            loadMorePostsBlogFeed();
            toggleOptionMenu();
            reorderPosts();
            break;
        case 'post':
            handlePost();
            break;
        case 'post/index.html':
            fetchPostByID();
            break;
        case 'post/make.html':
            checkIfLoggedIn();
            burgerMenuSetup();
            createPostFunction();
            logoutFunction();
            break;
        case 'post/edit.html':
            checkIfLoggedIn();
            fetchPostsEditPage();
            burgerMenuSetup();
            loadMorePostsEditPage();
            editPostFunction();
            logoutFunction();
            break;
        case 'account/login.html':
            loginFunction();
            break;
        case 'account/register.html':
            document.getElementById('registerSubmit').addEventListener('click', register);
            break;
        default:
            console.log('Page not found');
            break;
    }
}

function handlePost() {
    const pathname = getPathname();
    const postPath = pathname.split('/').slice(-1)[0];

    switch (postPath) {
        case 'index.html':
            fetchPostByID();
            break;
        case 'make.html':
            checkIfLoggedIn();
            burgerMenuSetup();
            createPostFunction();
            logoutFunction();
            break;
        case 'edit.html':
            checkIfLoggedIn();
            fetchPostsEditPage();
            burgerMenuSetup();
            loadMorePostsEditPage();
            editPostFunction();
            logoutFunction();
            break;
        default:
            console.log('Page not found');
            break;
    }
}

window.addEventListener('load', route);
window.addEventListener('popstate', route);
