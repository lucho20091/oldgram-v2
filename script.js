import { postsData } from './posts.js'

const commentSection = document.getElementById('comment-section');
const sendCommentBtn = document.getElementById('send-comment');
const inputComment = document.getElementById('input-comment');

// get localstorage item
const nameFromLocalStorage = JSON.parse(localStorage.getItem('username'))
const idFromLocalStorage = JSON.parse(localStorage.getItem('id'))
const name2FromLocalStorage = JSON.parse(localStorage.getItem('username2'))
// get modal
const modal = document.getElementById('modal');
const signInBtn = document.getElementById('sign-in');
const username = document.getElementById('username');
// // get main
const main = document.querySelector('main');
const header = document.querySelector('header');
// get username element
const usernameName = document.getElementById('username-name');
// get profile 
const profileUser = document.getElementById('profile-user');
// close sesion btn and modal
const closeBtn = document.getElementById('close-sesion');
const closeModal = document.getElementById('modal-close-sesion');
// get like element
const likeHeart = document.getElementById('like-heart');

// get all image
const postImage = document.getElementById('post-image');

// get p for likes
const likes1 = document.getElementById('likes1');


function getPostsArray(posts){
    const postsArray = []
    for (let post of posts){
            postsArray.push(post) 
    }
    return postsArray
}

function renderPosts(posts){
    let postItems = ``
    const postsID = getPostsArray(posts)
    for (let post of postsID){
        postItems += `
        <div class="container2">
        <div class="username">
            <div class="username-picture">
                <img src="./images/${post.avatarImage}" class="avatar" alt="this is ${post.id} avatar">
            </div>
            <div class="username-text">
                <p class="bold">${post.namePost}</p>
                <p>${post.userLocation}</p>
            </div>
        </div>
        <div class="image" id="post-image-${post.id}">
            <img src="./images/${post.image}" alt="a portrait of ${post.id}">
        </div>
        <div class="like-icons">
            <div id="like-heart-${post.id}"><i class="fa-regular fa-heart"></i></div>
            <div><i class="fa-regular fa-comment"></i></div>
            <div><i class="fa-regular fa-paper-plane"></i></div>
        </div>
        <div class="people-comments">
            <p id="likes-${post.id}">${post.likesCounter} likes</p>
            <p><span class="bold">${post.userNamePost}</span>${post.userNameTextPost}</p>
            <div class="divider"></div>
            <div class="comment-section" id="commentSection-${post.id}"></div>
            <div class="comment-div">
                <input 
                type="text" 
                class="comment"
                id="input-comment-${post.id}"
                placeholder="Leave a comment">
                <button id="send-comment-${post.id}">Send</button>
            </div>
        </div>
    </div>
    <div class="border"></div>` 
        main.innerHTML = postItems    
    }
}


renderPosts(postsData)






// like logic
likeHeart.addEventListener('click', () => {
    likeHeart.classList.toggle('active');
    if (likeHeart.classList.contains('active')){
        likes1.innerHTML = `${nameFromLocalStorage} and 200 likes`
    } else {
        likes1.innerHTML = `200 likes`
    }
})


function likeInteraction(posts){
    const postsVar = getPostsArray(posts)
    const likeHeartArr = []
    const likesArr = []
    const counterArr = []
    const postImgArr = []

    for (let post of postsVar){
        likeHeartArr.push(`like-heart-${post.id}`)
        likesArr.push(`likes-${post.id}`)
        postImgArr.push(`post-image-${post.id}`)

        counterArr.push(`${post.likesCounter}`)
    }
    for (let i = 0; i < likeHeartArr.length; i++) {
        const likeHeartEl = document.getElementById(likeHeartArr[i])
        const likesEl = document.getElementById(likesArr[i])
        const counter = counterArr[i]
        const postImgEl = document.getElementById(postImgArr[i])

        if (likeHeartEl){
            likeHeartEl.addEventListener('click', () =>{ 
            likeHeartEl.classList.toggle('active')
            if (likeHeartEl.classList.contains('active')){
                likesEl.innerHTML = `${nameFromLocalStorage} and ${counter} likes`
            } else {
                likesEl.innerHTML = `${counter} likes`
            }
            })
        }
        if (postImgEl){
            postImgEl.addEventListener('dblclick', () =>{
                likeHeartEl.classList.toggle('active')
                console.log(`you clicked on this`)
                })
            }        
    }

    // for (let i = 0; i < likeHeartArr.length; i++) {
    //     const postImgEl = document.getElementById(postImg[i])
    //     const likeHeartEl = document.getElementById(likeHeartArr[i])
    //     if (postImgEl){
    //         postImgEl.addEventListener('dblclick', () =>{
    //             likeHeartEl.classList.toggle('active')
    //         })
    //     }
    // }

}

likeInteraction(postsData)













// click on the images like
postImage.addEventListener('dblclick', likeHandler)


function likeHandler(){
    likeHeart.classList.toggle('active');
    if (likeHeart.classList.contains('active')){
        likes1.innerHTML = `${nameFromLocalStorage} and 200 likes`
    } else {
        likes1.innerHTML = `200 likes`
    }
}

// setting up firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://oldgram-dd94a-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const oldgramInDB = ref(database, "oldgram")
// sign in send username to localStorage
signInBtn.addEventListener('click', () => {
    if (username.value === name2FromLocalStorage){
        localStorage.setItem('username', JSON.stringify(username.value))
    } else if (idFromLocalStorage){
        let message = 'you already have an account, would you like to create a new account?'
        if (confirm(message)){
            localStorage.setItem('username', JSON.stringify(username.value))
            const random = Math.floor(Math.random() * 10000 )
            localStorage.setItem('id', JSON.stringify(random))
            localStorage.setItem('username2', JSON.stringify(username.value))
        }
    } else {
        localStorage.setItem('username', JSON.stringify(username.value))
        const random = Math.floor(Math.random() * 10000 )
        localStorage.setItem('id', JSON.stringify(random))
        localStorage.setItem('username2', JSON.stringify(username.value))
    }
})
// logic when user created account
if (nameFromLocalStorage){
    modal.style.display = 'none'
    header.style.display = 'block'
    main.style.display = 'block'
    usernameName.textContent = nameFromLocalStorage
} 




// logic for each post
sendCommentBtn.addEventListener('click', () =>{
    //object of what we want to send
    let myObj = {
        id: idFromLocalStorage,
        name: nameFromLocalStorage,
        comment: inputComment.value,
        html: "commentSection"
    }
    if (!inputComment.value == ''){
        push(oldgramInDB, myObj)
    }
    inputComment.value = '';
})


// logic to get data from DB
onValue(oldgramInDB, function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearCommentSections(commentSection)
        
        for (let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemHTML = itemsArray[i][1].html
            if (currentItemHTML === 'commentSection'){
                appendComments(currentItem, commentSection)   
        }}
    } else {
        push(oldgramInDB, 'hello') //
    }
})

function clearCommentSections(one){
    one.innerHTML = ''
}

function appendComments(item, commentSectionEl){
    let itemID = item[0]
    let itemComment = item[1].comment
    let itemName = item[1].name
    let itemUserID = item[1].id
    let newEl = document.createElement('div')
    newEl.className = 'flex-comment'
    newEl.innerHTML = `
    <p><span class="bold">${itemName}</span> ${itemComment}</p>`
    commentSectionEl.append(newEl)
    if (itemUserID === idFromLocalStorage){
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'delete'
        deleteBtn.addEventListener('click', () => {
            let exactLocationOfItem = ref(database, `oldgram/${itemID}`);
            const text = `Are you sure you want to delete this comment? \n
            username: ${itemName} \n
            text content: ${itemComment}`
            if (confirm(text)){
                remove(exactLocationOfItem)
            }
        })
        newEl.append(deleteBtn)
        }
}

profileUser.addEventListener('click', () => {
    closeModal.classList.toggle('hidden')
});

usernameName.addEventListener('click', () => {
    closeModal.classList.toggle('hidden')
});

closeBtn.addEventListener('click', () => {
    localStorage.removeItem('username')
    window.location.reload();

})