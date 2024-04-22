import {fetchPostsInitial, fetchPostByID} from "./functions.js";
// Function to extract the pathname from the URL
function getPathname() {
    return window.location.pathname;
}

// Function to handle routing based on the pathname
function route() {
    const pathname = getPathname();

    switch(pathname) {
        case '/FED1-Project-Exam-1/index.html':

            fetchPostsInitial()
            break;
        case '/FED1-Project-Exam-1/post/index.html':

            fetchPostByID()
            break;
        case '/FED1-Project-Exam-1/post/make.html':



            break;
        case '/FED1-Project-Exam-1/post/edit.html':



            break;
        case '/FED1-Project-Exam-1/account/login.html':



            break;
        case '/FED1-Project-Exam-1/account/register.html':



            break;
        default:

            console.log('Page not found');
    }
}

window.addEventListener('load', route);
window.addEventListener('popstate', route);
