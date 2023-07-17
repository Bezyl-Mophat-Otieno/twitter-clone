// Get the dom elements for the app

const profile = document.querySelector('.profile');
const posts = document.querySelector('.posts');
const comments = document.querySelector('.comments');
const viewComment = document.querySelector('.viewComment');

// create a function that fetches the profile 

const fetchProfile = async ()=>{
    try {

        const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
        const data = await res.json();
        let html = ''
        html += `
        <img class="profilePic" src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=170667a&w=0&k=20&c=YQ_j83pg9fB-HWOd1Qur3_kBmG_ot_hZty8pvoFkr6A=" alt="">
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
fetchProfile();





//Fetch Comments for the user's Post

const fetchComments = async (postId)=>{
    try {

        const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${postId}`)
        const data = await res.json();
        let html = ''
        html += `
        <div class="comment">
        <div class="commentName">${data.name}</div>
        <div class="commentBody">${data.body}</div>
        <div class="commentEmail">${data.email}</div>
        </div>
   `;
        comments.innerHTML = html;
        
    } catch (error) {
        console.log(error)   
    }
}


const initialComment = async ()=>{
    try {

        const res = await fetch('https://jsonplaceholder.typicode.com/comments/1')
        const data = await res.json();
        let html = ''
        html += `
        <div class="comment">
        <div class="commentName">${data.name}</div>
        <div class="commentBody">${data.body}</div>
        <div class="commentEmail">${data.email}</div>
        </div>
   `;
        comments.innerHTML = html;
        
    } catch (error) {
        console.log(error)   
    }
}
initialComment();


//Fetch Posts for the user 

const fetchPosts = async ()=>{
    try {
        
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const allData = await res.json();
        const trimmedArray = allData.slice(0, 10);
        // console.log(data)

        const res1 = await fetch('https://jsonplaceholder.typicode.com/users/1')
        const user = await res1.json();
        let html = ''
        trimmedArray.map((data)=>{

        html += `
        <div class="postContainer">
        <img src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=170667a&w=0&k=20&c=YQ_j83pg9fB-HWOd1Qur3_kBmG_ot_hZty8pvoFkr6A="" alt="" class="postImg">

        <div class="postDetails">
            <div class="postTitle">${data.title}</div>
            <div class="postBody">${data.body}</div>
            <div class="userName">${user.name}</div>
            <div class="actions">
            <div class="like">
                <img src="https://cdn.pixabay.com/photo/2017/12/06/04/57/like-3000958_640.png" alt="" class="likeImg">
                <span>300</span>

            </div>
            <div class="commentAction">
                <img src="https://cdn.pixabay.com/photo/2017/04/11/22/25/balloon-2223048_640.png" alt="" class="commentImg">
                <span>200</span>
            </div>
            <div class="view">
                <img src="https://cdn.pixabay.com/photo/2015/12/22/04/00/eye-1103593_640.png" alt="" class="viewImg">
                <span>500</span>
            </div>
        </div>
        <button class='viewComment'>View Comment</button>
        </div>              
        </div> 
        </div>
        `;

      console.log(viewComment)
       return  posts.innerHTML = html;
       


    })

        
    } catch (error) {
        console.log(error)   
    }
}
fetchPosts();





