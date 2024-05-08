import {formatDateTime} from "./utils.js";
import {authorAPI} from "./author.js";

// Functions for index.html
export async function fetchPosts(limit = 12, page = 1, sortOrder = "desc") {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${authorAPI}?limit=${limit}&page=${page}&sort=created&sortOrder=${sortOrder}`);
        const result = await response.json();
        const postData = result.data;
        if (page === 1) {
            displayBlogFeedPosts(postData);
        }
        displayCarouselPosts(postData, 3);
        carouselFunction()
        return postData;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function appendPostsToBlogFeed(posts, sortOrder) {
    const blogFeedPostsContainer = document.querySelector(".blogFeedPostsContainer");
    const currentPosts = blogFeedPostsContainer.querySelectorAll('.blogFeedPostCard');
    const currentPostsLength = currentPosts.length;

    posts.forEach((post, index) => {
        const text = post.body.split(" ");
        let truncatedText = text.slice(0, 20).join(" ") + "...";
        const formattedDateTime = formatDateTime(post.created);
        const postElement = document.createElement('a');
        postElement.classList.add('blogFeedPostCard');
        postElement.href = `post/index.html?id=${post.id}`;
        postElement.innerHTML =
            `<img src="${post.media.url}" alt="${post.media.alt}">
            <h2>${post.title}</h2>
            <span class="blogFeedPostCardTruncText">${truncatedText}</span>
            <span class="blogFeedPostCardDate">${formattedDateTime}</span>`;

        if (sortOrder === 'asc') {
            blogFeedPostsContainer.insertBefore(postElement, currentPosts[currentPostsLength - index]);
        } else {
            blogFeedPostsContainer.appendChild(postElement);
        }
    });
}

function displayBlogFeedPosts(posts) {
    const blogFeedPostsContainer = document.querySelector(".blogFeedPostsContainer")
    blogFeedPostsContainer.innerHTML = '';
    posts.forEach((post) => {
        const text = post.body.split(" ");
        let truncatedText = text.slice(0, 20).join(" ") + "...";
        const formattedDateTime = formatDateTime(post.created);
        blogFeedPostsContainer.innerHTML +=
            `<a class="blogFeedPostCard" href="post/index.html?id=${post.id}" aria-label="navigate to blog post">
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h2>${post.title}</h2>
                <span class="blogFeedPostCardTruncText">${truncatedText}</span>
                <span class="blogFeedPostCardDate">${formattedDateTime}</span>
            </a>`
    })
}

function displayCarouselPosts(posts, count){
    const carouselPostsContainer = document.querySelector(".carouselPostsContainer")
    let i = 0;
    carouselPostsContainer.innerHTML = '';
    posts.slice(0, count).forEach((post) => {
        i++;
        const formattedDateTime = formatDateTime(post.created);
        carouselPostsContainer.innerHTML +=
            `<a class="carouselPostCard" href="post/index.html?id=${post.id}" aria-label="navigate to blog post">
                <img src="${post.media.url}" alt="${post.media.alt}">
                <h2>${post.title}</h2>
                <span class="blogFeedPostCardDate">${formattedDateTime}</span>
            </a>`
    })
}

function carouselFunction(){
    const carouselContainer = document.querySelector('.carouselPostsContainer');
    const carouselItems = Array.from(carouselContainer.children);
    const prevButton = document.querySelector('.recentPostsCarouselBtnPrevious');
    const nextButton = document.querySelector('.recentPostsCarouselBtnNext');
    let currentIndex = 0;

    function updateActiveClass() {
        carouselItems.forEach((item, index) => {
            item.classList.remove('carouselPostCardActive', 'carouselPostCardLeft', 'carouselPostCardRight');
            if (index === currentIndex) {
                item.classList.add('carouselPostCardActive');
                item.style.height = "100%";
            } else if (index === (currentIndex + 1) % carouselItems.length) {
                item.classList.add('carouselPostCardRight');
                item.style.height = "90%";
            } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
                item.classList.add('carouselPostCardLeft');
                item.style.height = "90%";
            }
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateActiveClass();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateActiveClass();
    });

    updateActiveClass();
}

let currentPage = 1;
let currentSortOrder = 'desc';
let isEventListenerAdded = false;

export function loadMorePostsBlogFeed(sortOrder) {
    if (currentSortOrder !== sortOrder) {
        currentSortOrder = sortOrder;
        currentPage = 1;
    }

    let loadMoreButton = document.querySelector('.loadMorePostsFeedBTN');
    let clone = loadMoreButton.cloneNode(true);
    loadMoreButton.parentNode.replaceChild(clone, loadMoreButton);

    if (!isEventListenerAdded) {
        clone.addEventListener('click', async function() {
            currentPage++;
            const newPosts = await fetchPosts(12, currentPage, currentSortOrder);
            appendPostsToBlogFeed(newPosts, currentSortOrder);
        });
        isEventListenerAdded = true;
    }
}

async function fetchPostsBySortOrder(sortOrder) {
    try {
        const limit = 12;
        const page = 1;
        currentSortOrder = sortOrder;
        currentPage = page;
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${authorAPI}?limit=${limit}&page=${page}&sort=created&sortOrder=${sortOrder}`);
        const result = await response.json();
        const postData = result.data;
        const blogFeedPostsContainer = document.querySelector(".blogFeedPostsContainer");
        blogFeedPostsContainer.innerHTML = '';

        displayBlogFeedPosts(postData);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

export function toggleOptionMenu() {
    const orderSelectMenuToggle = document.querySelector(".select-button");
    const orderSelectMenu = document.querySelector(".options-container");

    function closeMenu() {
        orderSelectMenu.style.display = "none";
    }

    orderSelectMenuToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        if (orderSelectMenu.style.display === "none" || orderSelectMenu.style.display === "") {
            orderSelectMenu.style.display = "flex";
        } else {
            orderSelectMenu.style.display = "none";
        }
    });

    document.addEventListener("click", function (event) {
        const isClickInsideMenu = orderSelectMenu.contains(event.target);
        const isClickOnToggle = orderSelectMenuToggle.contains(event.target);
        if (!isClickInsideMenu && !isClickOnToggle) {
            closeMenu();
        }
    });
}

export function reorderPosts() {
    const orderSelectMenu = document.querySelector(".options-container");
    const options = document.querySelectorAll('.option');
    let sortOrder = "desc";

    options.forEach(option => {
        option.addEventListener('click', async function () {
            if (sortOrder !== this.getAttribute('data-value')) {
                sortOrder = this.getAttribute('data-value');

                await fetchPostsBySortOrder(sortOrder);
            }

            orderSelectMenu.style.display = "none";
        });
    })

    options.forEach(button => {
        button.addEventListener('click', function() {
            options.forEach(btn => {
                btn.classList.remove('active-option');
            });
            this.classList.add('active-option');
        });
    });
}


//Functions for post/index.html
export async function fetchPostByID() {
    const parameterString = window.location.search;
    const searchParameters = new URLSearchParams(parameterString);
    const postID = searchParameters.get("id");
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${authorAPI}/${postID}`);
        const result = await response.json();
        const postData = result.data;
        displayBlogPost(postData)
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayBlogPost(post) {
    const blogPostContainer = document.querySelector(".blogPostContainer")
    const formattedDateTime = formatDateTime(post.created);
    document.title = `Innovatech Solutions Blog - ${post.title}`;
        blogPostContainer.innerHTML =
`            
            <div class="blogPostImageContainer">
            <img class="articleImg" src="${post.media.url}" alt="${post.media.alt}">
            <span class="articleImgText">${post.media.alt}</span>
            </div>
            <span class="articleAuthor">Author: ${post.author.name}</span>
            <span class="articlePublished">Published: ${formattedDateTime}</span>
            <h1 class="articleH1">${post.title}</h1>
            <p class="articleMainText">${post.body}</p>`
}


//Functions for account/login.html
export function loginFunction(){
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', login);
}

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
            const accessToken = data.data.accessToken;
            sessionStorage.setItem('accessToken', accessToken);
            window.location.href = '/FED1-Project-Exam-1/post/edit.html';
        })
        .catch(error => {
            alert(error.message)
            console.error('Error:', error.message);
        });
}


//Functions for post/edit.html
export async function fetchPostsEditPage(limit = 12, page = 1) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${authorAPI}?limit=${limit}&page=${page}`);
        const result = await response.json();
        const postData = result.data;
        if (page === 1) {
            displayPostsEditPage(postData);
        } else {
            appendPostsToEditPage(postData);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

export function loadMorePostsEditPage() {
    let currentPage = 1;

    document.querySelector('.loadMorePostsEditPageBTN').addEventListener('click', async function() {
        currentPage++;
        await fetchPostsEditPage(12, currentPage);
    });
}

function appendPostsToEditPage(posts) {
    const postsContainer = document.querySelector(".postsContainer");
    posts.forEach((post) => {
        const text = post.body.split(" ");
        let truncatedText = text.slice(0, 20).join(" ") + "...";
        const formattedDateTime = formatDateTime(post.created);
        postsContainer.innerHTML +=
            `<div class="postCard">
                <div class="postCardEdit">
                    <button class="editPostButton" aria-label="Edit Post" data-id="${post.id}"><i class="fa-regular fa-pen-to-square fa-xl"></i> Edit post</button>
                    <button class="deletePostButton" aria-label="Delete Post" data-id="${post.id}">Delete post <i class="fa-solid fa-x fa-xl"></i></button>
                </div>
                <div class="postCardContent">
                    <img class="postCardImg" src="${post.media.url}" alt="${post.media.alt}">
                    <h2 class="postCardTitle">${post.title}</h2>
                    <p class="postCardTruncText">
                        ${truncatedText}
                    </p>
                    <span class="postCardPublished">${formattedDateTime}</span>
                </div>
            </div>`;
    });
}

function displayPostsEditPage(posts) {
    const postsContainer = document.querySelector(".postsContainer");
    postsContainer.innerHTML = '';
    posts.forEach((post) => {
        const text = post.body.split(" ");
        let truncatedText = text.slice(0, 20).join(" ") + "...";
        const formattedDateTime = formatDateTime(post.created);
        postsContainer.innerHTML +=
            `<div class="postCard">
                <div class="postCardEdit">
                    <button class="editPostButton" aria-label="Edit Post" data-id="${post.id}"><i class="fa-regular fa-pen-to-square fa-xl"></i> Edit post</button>
                    <button class="deletePostButton" aria-label="Delete Post" data-id="${post.id}">Delete post <i class="fa-solid fa-x fa-xl"></i></button>
                </div>
                <div class="postCardContent">
                    <img class="postCardImg" src="${post.media.url}" alt="${post.media.alt}">
                    <h2 class="postCardTitle">${post.title}</h2>
                    <p class="postCardTruncText">
                        ${truncatedText}
                    </p>
                    <span class="postCardPublished">${formattedDateTime}</span>
                </div>
            </div>`;
    });
}

export function editPostFunction() {
    const editPostForm = document.getElementById('editPostForm');
    const editSubmit = document.getElementById("editSubmit");
    const editDiscard = document.getElementById("discardChanges");
    let postID = "";

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('editPostButton')) {
            postID = event.target.dataset.id;
            editPostFormData(postID);
        }
    });

    editSubmit.addEventListener('click', function(event) {
        event.preventDefault();
        editPostFormSubmit(postID)
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message)
            })})

    function enableSubmitButton() {
        editSubmit.disabled = false;
    }

    editPostForm.addEventListener('input', enableSubmitButton);

    editDiscard.addEventListener('click', function(){
        window.location.href = '/FED1-Project-Exam-1/post/edit.html';
    })

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('deletePostButton')) {
            postID = event.target.dataset.id;
            deletePost(postID);
        }
    });

}

async function editPostFormData(postID) {
    const body = document.querySelector("body");
    const managePostsSection = document.querySelector(".managePostsSection");
    const editTitle = document.getElementById("editTitle");
    const editText = document.getElementById("editText");
    const editImage = document.getElementById("editImage");
    const editImageText = document.getElementById("editImageText");
    const editPostContainer = document.querySelector(".editPostSection")

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${authorAPI}/${postID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }
        const postData = await response.json();

        editTitle.value = postData.data.title;
        editText.value = postData.data.body;
        editImage.value = postData.data.media.url;
        editImageText.value = postData.data.media.alt;

        editPostContainer.style.display = "block";
        body.classList.add(".menu-open");
        managePostsSection.style.display = "none";

    } catch (error) {
        console.error('Error fetching post data:', error);
    }
}

async function editPostFormSubmit(postID) {
    const accessToken = sessionStorage.getItem('accessToken');
    const editTitle = document.getElementById('editTitle').value;
    const editText = document.getElementById('editText').value;
    const editImage = document.getElementById('editImage').value;
    const editImageText = document.getElementById('editImageText').value;

    const requestBody = JSON.stringify({
        title: editTitle,
        body: editText,
        media: {
            url: editImage,
            alt: editImageText
        }
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${authorAPI}/${postID}`, {
            method: "PUT",
            headers: myHeaders,
            body: requestBody
        });

        if (!response.ok) {
            throw new Error('Failed to update post');
        }

    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

async function deletePost(postID) {
    const accessToken = sessionStorage.getItem('accessToken');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${authorAPI}/${postID}`, {
            method: "DELETE",
            headers: myHeaders
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }

        alert('Post deleted successfully');
        window.location.reload();

    } catch (error) {
        alert(error.message);
        console.error('Error:', error.message);
    }
}

// functions for post/make.html
export function createPostFunction() {
    const createPostForm = document.getElementById('createNewPostForm');
    createPostForm.addEventListener('submit', createPost);
}

function createPost(event) {
    event.preventDefault();
    const accessToken = sessionStorage.getItem('accessToken');
    const newTitle = document.getElementById('createNewTitle').value;
    const newText = document.getElementById('createNewText').value;
    const newImage = document.getElementById('createNewImage').value;
    const newImageText = document.getElementById('createNewImageText').value;

    const requestBody = JSON.stringify({
        title: newTitle,
        body: newText,
        media: {
            url: newImage,
            alt: newImageText
        }
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: requestBody,
        redirect: "follow"
    };

    fetch(`https://v2.api.noroff.dev/blog/posts/${authorAPI}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = '/FED1-Project-Exam-1/post/edit.html';
        })
        .catch(error => {
            alert(error.message);
            console.error('Error:', error.message);
        });
}

// Functions for account/register.html
function checkFieldsFilled() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const namePattern = /^[a-zA-Z0-9_]+$/;

    if (!email || !name || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return false;
    }

    if (!namePattern.test(name)) {
        alert('Name can only contain letters, numbers, and underscores.');
        return false;
    }

    return true;
}

function checkPasswordComplexity(password) {
    return password.length >= 8;
}

export async function register(event) {
    event.preventDefault();

    if (!checkFieldsFilled()) {
        return;
    }

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const isPasswordComplex = checkPasswordComplexity(password);

    if (!isPasswordComplex) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Password and confirm password must match.');
        return;
    }

    const requestBody = {
        name: name,
        email: email,
        password: password
    };

    fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorResponse => {
                    throw new Error(errorResponse.errors[0].message);
                });
            }
            return response.json();
        })
        .then(data => {
            alert("Registered successfully, You can now log in ")
            window.location.href = '/FED1-Project-Exam-1/account/login.html';
        })
        .catch(error => {
            alert(error.message);
            console.error('Error:', error.message);
        });
}
