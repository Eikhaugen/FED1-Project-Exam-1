
// Function for index.html
export async function fetchPostsInitial() {

    try {
        const response = await fetch("https://v2.api.noroff.dev/blog/posts/Eikhaugen");
        const result = await response.json();
        const postData = result.data;
        console.log(postData)
        displayBlogFeedPosts(postData)
        //Use counter param to set how many posts display in carousel.
        displayCarouselPosts(postData, 3)
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayBlogFeedPosts(posts) {
    const blogFeedPostsContainer = document.querySelector(".blogFeedPostsContainer")
    blogFeedPostsContainer.innerHTML = '';
    posts.forEach((post) => {
        let truncatedText = '';
        const text = post.body.split(" ");
        truncatedText = text.slice(0, 20).join(" ") + "...";
        blogFeedPostsContainer.innerHTML +=
            `<a class="blogFeedPostCard" href="post/index.html?id=${post.id}" aria-label="navigate to blog post">
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h2>${post.title}</h2>
                <span class="blogFeedPostCardTruncText">${truncatedText}</span>
                <span>${post.created}</span>
            </a>`
    })
}

function displayCarouselPosts(posts, count){
    const carouselPostsContainer = document.querySelector(".carouselPostsContainer")
    carouselPostsContainer.innerHTML = '';
    posts.slice(0, count).forEach((post) => {
        carouselPostsContainer.innerHTML +=
            `<a class="blogFeedPostCard" href="post/index.html?id=${post.id}" aria-label="navigate to blog post">
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h2>${post.title}</h2>
                <span>${post.created}</span>
            </a>`
    })
}

//Functions for post/index.html
export async function fetchPostByID() {
    const parameterString = window.location.search;
    const searchParameters = new URLSearchParams(parameterString);
    const postID = searchParameters.get("id");
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/Eikhaugen/${postID}`);
        const result = await response.json();
        const postData = result.data;
        console.log(postData)
        displayBlogPost(postData)
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayBlogPost(post) {
    const blogPostContainer = document.querySelector(".blogPostContainer")

        blogPostContainer.innerHTML =
`            <img class="articleImg" src="${post.media.url}" alt="${post.media.alt}">
            <span class="articleImgText">${post.media.alt}</span>
            <h1 class="articleH1">$post.title}</h1>
            <span class="articleAuthor">Author: ${post.author.name}</span>
            <span class="articlePublished">Published: ${post.created}</span>
            <p class="articleMainText">${post.body}</p>`
}

//Functions for account/login.html
export function loginFunction(){
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', login);

    function login(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const requestBody = {
            email: email,
            password: password
        };
        fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed. Please check your credentials.');
                }
                return response.json();
            })
            .then(data => {
                sessionStorage.setItem('accessToken', data.accessToken);
                window.location.href = '../post/edit.html';
            })
            .catch(error => {
                alert(error.message)
                console.error('Error:', error.message);
            });
    }
}

//Functions for post/edit.html


