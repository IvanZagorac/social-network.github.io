class Comment{
	user_id="";
	post_id=""
	content=""
	api_url="https://62f0c73157311485d13697bd.mockapi.io";

	create(){
		let data={
			user_id:this.user_id,
			post_id:this.post_id,
			content:this.content
		}

		data=JSON.stringify(data);

		fetch(this.api_url+"/comments",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:data
		})
		.then(response=>response.json())
		.then(data=>{
			
		})
	
	}

	async getComment(post_id){

		let api_url=this.api_url +"/comments" ;

		let response=await fetch(api_url);
		let data=await response.json();

		let post_comments=[];

		let i=0;

		data.forEach(comment=>{
			if(comment.post_id===post_id){
				post_comments[i]=comment;
				i++;
			}
		})

			return post_comments;
	
	}

}