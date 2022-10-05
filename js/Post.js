class Post{
	user_id="";
	likes=""
	content="";
	api_url="https://62f0c73157311485d13697bd.mockapi.io";

	delete(post_id){
		fetch(this.api_url +"/posts/"+ post_id,{
			method:"DELETE"
		})
		.then(response=>response.json())
		.then(data=>{
			window.alert("Post obrisan")
		})

	}

	likePost(post_id,likes){
		let data={
			likes:likes
		}

		data=JSON.stringify(data);

		fetch(this.api_url+"/posts/"+post_id,{
			method:"PUT",
			headers:{
				"Content-Type":"application/json"
			},
			body:data
		})
		.then(response=>response.json())
		.then(data=>{
		})

	}
	async getPosts(){
		let response=await fetch(this.api_url +"/posts");
		let data=await response.json();

		return data;

	}


	async create(){
		let session=new Session();
		let session_id=session.getSession();
		let data={
			user_id:session_id,
			content:this.content,
			likes:0
		}
		data=JSON.stringify(data)

		let response=await fetch(this.api_url+"/posts",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:data
		});
		
		data=await response.json();

		return data

	}
}