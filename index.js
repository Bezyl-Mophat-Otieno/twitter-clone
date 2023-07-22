// Get the dom elements for the app

// fetching random images from pixabay api
// Pixabay API Key
const API_KEY = '38362795-da8f36ddaa2f912e2f41af4b4';
const COUNT = 10; // Number of Images
const API_ENDPOINT = `https://pixabay.com/api/?key=${API_KEY}&q=nature&per_page=${COUNT}&safesearch=true`;

const postImages =[]

// Fetch images from Pixabay
fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
        // console.log(data.hits);
        
        // Iterating over 'hits' (each 'hit' is an image)
        data.hits.forEach(hit => {
            // Add the image URL to array
            postImages.push(hit.previewURL);
        });
        
        // console.log(postImages);
    })
    .catch(error => console.error('Error:', error));

const images = [
'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=170667a&w=0&k=20&c=YQ_j83pg9fB-HWOd1Qur3_kBmG_ot_hZty8pvoFkr6A=',
'https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.jpg?b=1&s=170667a&w=0&k=20&c=KZM6TIhdaJAy28BA9sg0Sn-ZRd160F6HytdAKykza-s=',
'https://cdn.pixabay.com/photo/2015/03/03/08/55/portrait-657116_640.jpg',
'https://cdn.pixabay.com/photo/2016/03/27/16/54/face-1283106_640.jpg',
'https://cdn.pixabay.com/photo/2020/08/21/08/46/african-5505598_640.jpg',
'https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_640.jpg',
'https://cdn.pixabay.com/photo/2015/03/03/08/55/portrait-657116_640.jpg',
'https://cdn.pixabay.com/photo/2016/11/23/00/33/man-1851469_640.jpg',
'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912_640.jpg',
'https://cdn.pixabay.com/photo/2019/01/10/12/20/animal-3925260_640.jpg',
'https://cdn.pixabay.com/photo/2016/07/31/12/59/charcoal-drawing-1558900_640.jpg'
]

const profile = document.querySelector('.profile');
const posts = document.querySelector('.posts');
const comments = document.querySelector('.comments');
const dropDownMenu = document.querySelector('.dropdown-menu');



// console.log(viewComment)

// create a function that fetches the profile 


const fetchProfile = async (userId)=>{
    try {

        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        const data = await res.json();
        // console.log(images[userId-1])
        let html = ''
        html += `
        <img class="profilePic" src=${images[userId-1]} alt="">
        <div class="details">
        <h2 class="userName">${data.name}</h2>
        <p>${data.username}</p>
        <p>${data.email}</p>
        <p>${data.company.catchPhrase}</p>
        <p>${data.address.street}</p>
        
        `;
        profile.innerHTML = html;
        
    } catch (error) {
        console.log(error)   
    }
}
// initializing the profile
fetchProfile(1);
// event deleagation for the dropdown
dropDownMenu.addEventListener('click',async(e)=>{
    if(e.target.classList.contains('user')){
        const userId = e.target.parentElement.children[0].id
        fetchProfile(userId)
         fetchPosts(userId)
    }
}
)

//Fetch User Names for the posts
let userNames = [];
const fetchUserNames = async()=>{ 
    
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const allData = await res.json();
    const trimmedArray = await allData.slice(0, 11);
    html =''
    trimmedArray.map((user,index)=>{
        html += `
        <li><a class="user" id="${user.id}" href="#">${user.name}</a></li>        
        `
        userNames.push(user.name)
    })

    dropDownMenu.innerHTML = html;
        return userNames;

}

 // 10  usernames for each post
fetchUserNames();

//Fetch Comments for the user's Post
const openModal =()=> {
    const modal = document.getElementById("myModal");
    modal.style.display = "flex";
  }
  
  const closeModal=()=> {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
      closeModal();
    }
  };

const fetchComments = async (postId)=>{
    try {
        

        const res = await fetch(`https://jsonplaceholder.typicode.com/comments`)
        const data = await res.json();
        const postComments = data.filter((comment)=>comment.postId == postId)
        const trimmedArray = postComments.slice(0, 10);


        let html = ''
        trimmedArray.map((comment)=>{
            html += `
            <div class="comment">
            <div class="commentName">${comment.name}</div>
            <div class="commentBody">${comment.body}</div>
            <button class="commentEmail">${comment.email}</button>
            </div>
       `;
       
       comments.innerHTML = html;
    })

        
    } catch (error) {
        console.log(error)   
    }
}

function getRandomNumber(min, max) {
    // Generate a random number between 0 (inclusive) and 1 (exclusive)
    const randomValue = Math.random();
  
    // Scale the random value to the desired range [min, max]
    return Math.floor(randomValue * (max - min + 1)) + min;
  }


const initialComment = async ()=>{
    try {
       await fetchComments(1)

    } catch (error) {
        console.log(error)   
    }
}
initialComment();


//Fetch Posts for the user and pass in the comments function to fetch comments for each post

const fetchPosts = async (userId)=>{
    try {
        
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const allData = await res.json();
        // I want to filter the all data posts using the userId and display that on the ui
        const data = allData.filter((post)=>post.userId == userId)


        const trimmedArray = data.slice(0, 10);
        // console.log(data)



        const res1 = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        const user = await res1.json();
        let html = ''
        trimmedArray.map((data,index)=>{
        

        html += `
        <div class="postContainer">
        <img src=${postImages[getRandomNumber(0,10)]} alt="" class="postImg">

        <div class="postDetails id=${data.id}}">
            <div class="postTitle">${data.id}</div>
            <div class="postTitle">${data.title}</div>
            <div class="postBody">${data.body}</div>
            <div class="userName">${user.name}</div>
            <div class="actions">
            <div class="like">
                <img src="https://cdn.pixabay.com/photo/2017/12/06/04/57/like-3000958_640.png" alt="" class="likeImg">
                <span>${index+1*data.id}</span>

            </div>
            <div class="commentAction">
                <img src="https://cdn.pixabay.com/photo/2017/04/11/22/25/balloon-2223048_640.png" alt="" class="commentImg">
                <span>${200*index+3*data.id}</span>
            </div>
            <div class="view">
                <img src="https://cdn.pixabay.com/photo/2015/12/22/04/00/eye-1103593_640.png" alt="" class="viewImg">
                <span>${200*index*data.id}</span>
            </div>
        </div>
        <button class="viewComment">View Comment</button>
        </div>              
        </div> 
        </div>
        `;

        
        
    })

           return  posts.innerHTML = html;

        
    } catch (error) {
        console.log(error)   
    }
}
fetchPosts(1);


    // Applying the concept event delegation to the parent element
    
    posts.addEventListener('click',async(e)=>{
        console.log(e.target.classList)
    
        if(e.target.classList.contains('viewComment')){

        const postId = e.target.parentElement.children[0].textContent;
        fetchComments(postId);
        openModal()
        }
        })        









