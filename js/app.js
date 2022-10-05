let sesija=new Session();
sesija=sesija.getSession();
if(sesija!==""){
	window.location.href="../hexa.html";
}

let config={

	"korisnicko_ime":{
	required:true,
	minlength:5,
	maxlength:50
	},

	"email":{
	email:true,
	required:true,
	minlength:5,
	maxlength:50
	},
	
	"lozinka":{
	required:true,
	minlength:4,
	maxlength:20,
	matching:"ponovi_lozinku"
	},

	"ponovi_lozinku":{
	required:true,
	minlength:4,
	maxlength:20,
	matching:"lozinka"
	}
	

};


let validator=new Validator(config,"#registrationForm");

let modal=document.querySelector('.modal');
let gumb_za_registraciju=document.querySelector("#registrationButton");
gumb_za_registraciju.addEventListener("click",()=>{
	modal.style.display="block";

});

let closeModalBtn=document.querySelector("#closeModalBtn").addEventListener("click",()=>{
modal.style.display="none";
})


let gumbZaRegu=document.querySelector("#registrationForm");

gumbZaRegu.addEventListener("submit",e=>{
	e.preventDefault();
	let user=new Users();
	user.username=document.querySelector("#kor_ime").value;
	user.email=document.querySelector("#email").value;
	user.password=document.querySelector("#pass").value;
		if(validator.validationPassed()==true&&user.username.length!=0
		&&user.email.length!=0&&user.password.length!=0){
		user.create();

	}
	
	else{
		alert("Nije uspijelo");
	}
})


let gumbZaLogin=document.querySelector("#loginButton").addEventListener("click",e=>{
	e.preventDefault();
	let user=new Users();
	user.email=document.querySelector("#emailLogin").value;
	user.password=document.querySelector("#passLogin").value;
	user.login();
})
