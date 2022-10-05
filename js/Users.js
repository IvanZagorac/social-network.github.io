class Users{
	users_id=""
	email="";
	username="";
	password="";
	api_url="https://62f0c73157311485d13697bd.mockapi.io";

	async get(user_id){
		let api_url=this.api_url +"/users/" + user_id;

		let response=await fetch(api_url);
		let data=await response.json();

			return data;
		
	}

	delete(){
		let session=new Session();
		let session_id=session.getSession();

		fetch(this.api_url +"/users/"+ session_id,{
			method:"DELETE"
		})
		.then(response=>response.json())
		.then(data=>{
			let session=new Session();
			session.destroySession();

			window.location.href="/";
		})

	}

	edit(){
		let session=new Session();
		let session_id=session.getSession();

		let data={
			username:this.username,
			email:this.email,
		}

		data=JSON.stringify(data);

		fetch(this.api_url +"/users/" + session_id,{
			method:"PUT",
			headers:{
				"Content-Type":"application/json"
			},
			body:data
		})
		.then(response=>response.json())
		.then(data=>{
			window.location.href="hexa.html"
		})
	}

	login(){
		fetch(this.api_url +"/users")
		.then(response=>response.json())
		.then(data=>{
			
			data.forEach(db=>{
				if(db.password===this.password&&db.email===this.email){
					let session=new Session();
					session.user_id=db.id;
					session.startSession();
					window.location.href="../hexa.html"
				}else{
					 document.querySelector("#greskaLogin").innerText="Pogrešan email ili password!";
					 
				}
			})
			
		})
		
	}

	create(){
		let data={
			username:this.username,
			email:this.email,
			password:this.password
		}

		data=JSON.stringify(data);

		fetch(this.api_url+"/users",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:data
		})
		.then(response=>response.json())
		.then(data=>{
			let session=new Session();
			session.user_id=data.id;
			session.startSession();
			window.location.href="hexa.html";

			

		})
	}
	
}