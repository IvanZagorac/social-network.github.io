let sesija=new Session();
sesija=sesija.getSession();
if(sesija!==""){
	async function populateUserData(){
		let user=new Users();
		user= await user.get(sesija);

		document.querySelector("#username2").innerText=user['username'];
		document.querySelector("#email2").innerText=user['email'];

		document.querySelector("#kor_ime3").value=user['username'];
		document.querySelector("#email3").value=user['email'];

	}

	populateUserData();
	
	document.querySelector("#odjavi").addEventListener("click",()=>{
		let session=new Session();
		session.destroySession();
		window.location.href="/";
	});

	document.querySelector("#izmijeni").addEventListener("click",e=>{
		e.preventDefault();
		let modal=document.querySelector('.modal');
		modal.style.display="block";

		let closeModalBtn=document.querySelector("#closeModalBtn").addEventListener("click",()=>{
		modal.style.display="none";
		})

	})


	document.querySelector("#izmijeniForm").addEventListener("submit",e=>{
	e.preventDefault();
		
		let user=new Users();
		user.username=document.querySelector("#kor_ime3").value;
		user.email=document.querySelector("#email3").value;
		user.edit();
	})

	document.querySelector("#obrisiProfil").addEventListener("click",()=>{
		
		let text="Jel ste sigurni da zelite obrisati profil?";
		if(confirm(text)==true){
			let user=new Users();
			user.delete();

		}
	})




}else{
	console.log("Sesija ne postoji")
	window.location.href="/";
}



document.querySelector("#objaviButton").addEventListener("click",e=>{
		e.preventDefault();
	async function createPost(){
		let content=document.querySelector("#textarea").value
		document.querySelector("#textarea").value="";
		let post=new Post();
		post.content=content;

		post=await post.create();
		
		let currentUser=new Users();
		currentUser= await currentUser.get(sesija);

		let html=document.querySelector(".posts").innerHTML;

		let delete_post_html="";

			if(sesija===e.user_id){
				delete_post_html=`<button  id="deletePost" onclick="removePost(this)">Remove</button>`;
				}



		document.querySelector(".posts")
		.innerHTML=`<div class="single-post" data-post_id=${post.id}>
					<div class="post-content">${post.content}</div>
					
					<p class="autor">Autor:${currentUser.username}</p>
					<div class="emoji">
					<button type="button" id="likes"><span>${post.likes}</span> Likes</button>
					<button onclick="commentBtn(event)" id="comments">Comments</button>
					${delete_post_html}
					</div>

					<div class="komentari">
					<form id="commentForm">
					<input id="napisatKom" type="text" placeholder="Napisi komentar...">
					<button id="postaviKomentar">Comment</button>
					</form>
					</div>
					</div>`+html; 

				
			
	}

		
		createPost()

})


async function getAllPosts(){
	let post=new Post();
	post=await post.getPosts();
	
	post.forEach(e=>{
		async function getPostUser(){
			let user=new Users();
			user=await user.get(e.user_id);
			let com_html="";
			let comment=new Comment();
			comment=await comment.getComment(e.id)
			comment.forEach(comment=>{
					com_html+=`<div id="sing_com">${comment.content}</div>`;
				})

			let delete_post_html="";
			if(sesija===e.user_id){
				delete_post_html=`<button  id="deletePost" onclick="removePost(this)">Remove</button>`;
			}

			let html=document.querySelector(".posts").innerHTML;


			document.querySelector(".posts").innerHTML=`
					<div class="single-post" data-post_id=${e.id}>
					<div class="post-content">${e.content}</div>
					
					<p class="autor">Autor:${user.username}</p>
					<div class="emoji">
					<button type="button" onclick="like(this)" id="likes"><span>${e.likes}</span> Likes</button>
					<button type="button" onclick="commentBtn(this)" id="comments">Comments</button>
					${delete_post_html}
					</div>
					<div class="komentari">
					<form id="commentForm">
					<input id="napisatKom" type="text" placeholder="Napisi komentar...">
					<button type="button" onclick="postaviKomentarNaPost(this)" id="postaviKomentar">Comment</button>
					</form>
					${com_html}
					</div>
					</div>`+html;

				let gumb_za_like=document.querySelector("#likes");
				console.log(gumb_za_like)
				if(gumb_za_like.innerText==`${e.likes} Likes`){
				gumb_za_like.innerText==`${e.likes} Unlike`

				}else{
				gumb_za_like.innerText==`${e.likes} Likes`
				}

			

		}	
		getPostUser();
	})
	
}

getAllPosts()


const commentBtn=btn=>{
		let parent=btn.closest(".single-post");
		let post_id=parent.getAttribute("data-post_id");
		if(btn.innerText=="Comments"){
			parent.querySelector(".komentari").style.display="block";
			btn.innerText="Hide comments";
		}else{
			parent.querySelector(".komentari").style.display="none";
			btn.innerText="Comments";
		}

}


const postaviKomentarNaPost=button=> {
		async function sinkronaFunkcijaZbogUsera(){
			button.setAttribute("disabled","true");

		let parent=button.closest(".single-post");
		let post_id=parent.getAttribute("data-post_id");

		let vrijednostKomentara=parent.querySelector("input").value;

		parent.querySelector("input").value="";
		
		let currentUser=new Users();
		currentUser=await currentUser.get(sesija);
		 
		let html=parent.querySelector(".komentari").innerHTML+=
		`<div id="single-comment"><div id="autorKomentara">${currentUser.username}</div>:${vrijednostKomentara}
		</div>`


		let komentar=new Comment();
		komentar.post_id=post_id;
		komentar.user_id=sesija;
		komentar.content=`${currentUser.username}: ${vrijednostKomentara}`;
		komentar.create();

		}
		
		sinkronaFunkcijaZbogUsera();
}



const removePost=btn=>{
		let parent=btn.closest(".single-post");
		let post_id=parent.getAttribute("data-post_id");
		let post=new Post();
		post.delete(post_id);
	}

	const like=btn=>{
		let parent=btn.closest(".single-post");
		let post_id=parent.getAttribute("data-post_id");
		let numb_of_likes=parseInt(btn.querySelector("span").innerText);
			btn.querySelector("span").innerText=numb_of_likes+1;
		let post=new Post();
		
		if(btn.innerText==`${numb_of_likes+1} Likes`){
			post.likePost(post_id,numb_of_likes+1);
			btn.innerHTML=`<span>${numb_of_likes+1}</span> Unlike`
			window.alert("Post lajkovan");

		}
		else{
			btn.querySelector("span").innerText=numb_of_likes-1;
			post.likePost(post_id,numb_of_likes-1);
			btn.innerHTML=`<span>${numb_of_likes-1}</span> Likes`;
			window.alert("Post dislajkovan");
		}
		
	}

