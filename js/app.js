import {fetchPosts, fetchPostByID, loginFunction, fetchPostsEditPage, createPostFunction, editPostFunction, register, loadMorePostsBlogFeed, loadMorePostsEditPage, toggleOptionMenu, reorderPosts
} from "./functions.js";
import {
    checkIfLoggedIn, logoutFunction, burgerMenuSetup
} from "./utils.js";

function getPathname() {
    const url = new URL(window.location.href);
    let pathname = url.pathname;

    // Check the host
    switch (window.location.host) {
        case 'localhost':
        case '127.0.0.1':
            pathname = pathname.replace('/my-local-project', '/FED1-Project-Exam-1');
            break;
        case 'innovatechsolutions.netlify.app':
            pathname = pathname.replace('/innovatechsolutions.netlify.app', '/FED1-Project-Exam-1');
            pathname = pathname.replace('.html', '');
            break;
        default:
            break;
    }

    return pathname;
}

function route() {
    const pathname = getPathname();

    switch(pathname) {
        case '/FED1-Project-Exam-1/index':
        case '/innovatechsolutions.netlify.app':

            fetchPosts();
            loadMorePostsBlogFeed();
            toggleOptionMenu();
            reorderPosts();
            break;
        case '/FED1-Project-Exam-1/post/index':
        case '/innovatechsolutions.netlify.app/post':

            fetchPostByID();
            break;
        case '/FED1-Project-Exam-1/post/make':
        case '/innovatechsolutions.netlify.app/post/make':

            checkIfLoggedIn();
            burgerMenuSetup();
            createPostFunction();
            logoutFunction();
            break;
        case '/FED1-Project-Exam-1/post/edit':
        case '/innovatechsolutions.netlify.app/post/edit':

            checkIfLoggedIn();
            fetchPostsEditPage();
            burgerMenuSetup();
            loadMorePostsEditPage();
            editPostFunction();
            logoutFunction();
            break;
        case '/FED1-Project-Exam-1/account/login':
        case '/innovatechsolutions.netlify.app/login':

            loginFunction();
            break;
        case '/FED1-Project-Exam-1/account/register':
        case '/innovatechsolutions.netlify.app/register':

            document.getElementById('registerSubmit').addEventListener('click', register);
            break;
        default:
            console.log('Page not found');
    }
}

window.addEventListener('load', route);
window.addEventListener('popstate', route);
