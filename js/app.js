import {
    fetchPostsInitial,
    fetchPostByID,
    loginFunction,
    fetchPostsEditPage,
    createPostFunction,
    editPostFunction, register
} from "./functions.js";

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

            // check if logged in
            createPostFunction()
            // logout function

            break;
        case '/FED1-Project-Exam-1/post/edit.html':

            // check if logged in
            fetchPostsEditPage()
            // load more posts
            editPostFunction()
                // fetch by ID
                // fill form with data
                // save or discard changes
            // delete post
            // logout function

            break;
        case '/FED1-Project-Exam-1/account/login.html':

            // check if already logged in
            loginFunction()

            break;
        case '/FED1-Project-Exam-1/account/register.html':

            // check if already logged in
            document.getElementById('registerSubmit').addEventListener('click', register);

            break;
        default:

            console.log('Page not found');
            // reroute to index.html
    }
}

window.addEventListener('load', route);
window.addEventListener('popstate', route);
