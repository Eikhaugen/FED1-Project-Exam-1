import {authorAPI} from "./author.js";

export function checkIfLoggedIn() {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken || accessToken.trim() === '') {
        window.location.href = '/FED1-Project-Exam-1/account/login.html';
    }
}

export function logoutFunction() {
    function logout() {
        sessionStorage.removeItem('accessToken');
        window.location.href = '/FED1-Project-Exam-1/account/login.html';
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('logoutBTN') || event.target.classList.contains('burgerMenuLogoutBTN') || event.target.closest('.logoutBTN')) {
            logout();
        }
    });
}

// format time and date string
export function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

//Burger Menu
export function burgerMenuSetup() {
    const body = document.querySelector("body");
    const burgerMenuToggle = document.querySelector(".burgerMenuToggle");
    const burgerMenu = document.querySelector(".burgerMenu");

    burgerMenuToggle.addEventListener("click", function () {
        if (burgerMenu.style.display === "none" || burgerMenu.style.display === "") {
            burgerMenu.style.display = "flex";
            body.classList.add("menu-open");
        } else {
            burgerMenu.style.display = "none";
            body.classList.remove("menu-open");
        }
    })
}

// Post Search Function
let debounceTimer;
export function postSearchFunctionSetup() {
    const searchInput = document.querySelector('.searchInput');
    const searchButton = document.querySelector('.searchButton');
    const searchResultContainer = document.querySelector('.searchResultContainer');
    const headerMid = document.querySelector('.headerMid');

    const performSearch = () => {
        const searchInputValue = searchInput.value;
        searchPosts(searchInputValue);
    };

    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performSearch, 300);
    });

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        performSearch();
    });

    searchInput.addEventListener('click', function() {
        searchResultContainer.style.display = 'flex';
    });

    document.addEventListener('click', function(event) {
        if (!searchResultContainer.contains(event.target) && !headerMid.contains(event.target)) {
            searchResultContainer.style.display = 'none';
        }
    });
}

async function searchPosts(searchInputValue) {
    const postsContainer = document.querySelector('.searchResultPostsContainer');
    const searchResultContainer = document.querySelector('.searchResultContainer');
    postsContainer.innerHTML = '';
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${authorAPI}`);
        const result = await response.json();
        const postData = result.data;
        let scoredPosts = [];

        const searchWords = searchInputValue.split(' ');

        postData.forEach(post => {
            let score = 0;
            const wordsInTitle = post.title.split(' ');
            const wordsInBody = post.body.split(' ');

            searchWords.forEach(searchWord => {
                wordsInTitle.forEach(word => {
                    if (word.toLowerCase() === searchWord.toLowerCase()) {
                        score++;
                    }
                });
                wordsInBody.forEach(word => {
                    if (word.toLowerCase() === searchWord.toLowerCase()) {
                        score++;
                    }
                });
            });

            scoredPosts.push({ post, score });
        });

        scoredPosts.sort((a, b) => b.score - a.score);

        for (let i = 0; i < Math.min(4, scoredPosts.length); i++) {
            const post = scoredPosts[i].post;
            postsContainer.innerHTML +=
                `<a class="searchResultCard" href="post/index.html?id=${post.id}" aria-label="navigate to blog post">
                    <img class="searchResultImage" src="${post.media.url}" alt="${post.media.alt}">
                        <h2>${post.title}</h2>
                </a>`;
        }
        searchResultContainer.style.display = 'flex';
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}
