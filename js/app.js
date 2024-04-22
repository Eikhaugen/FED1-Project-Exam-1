
// Function to extract the pathname from the URL
function getPathname() {
    return window.location.pathname;
}

// Function to handle routing based on the pathname
function route() {
    const pathname = getPathname();

    switch(pathname) {
        case '/':


            console.log('Index page');
            break;
        case '/post/index.html':


            console.log('Post index page');
            break;
        case '/post/make.html':


            console.log('Make post page');
            break;
        case '/post/edit.html':


            console.log('Edit post page');
            break;
        case '/account/login.html':


            console.log('Login page');
            break;
        case '/account/register.html':


            console.log('Register page');
            break;
        default:

            console.log('Page not found');
    }
}

window.addEventListener('load', route);
window.addEventListener('popstate', route);
