window.addEventListener("DOMContentLoaded", init);

function init() {
  let status = 1;
  console.log(status)
  document.querySelector("#choose").addEventListener("click", () => {
    document.querySelector("#frame1").style.display = "none";
    document.querySelector("#step2").classList.add("is-active");
    document.querySelector("#step1").classList.remove("is-active");
    document.querySelector("#step1").classList.add("is-complete");
    document.querySelector("#frame2").style.display = "flex";
    status = 2;
    console.log(status)

  });
  document.querySelector("#backBtn").addEventListener("click", () => {
    document.querySelector("#frame1").style.display = "flex";
    document.querySelector("#step2").classList.remove("is-active");
    document.querySelector("#step2").classList.remove("is-complete");
    document.querySelector("#step1").classList.add("is-active");
    document.querySelector("#step1").classList.remove("is-complete");
    document.querySelector("#frame2").style.display = "none";
    status = 1;
    console.log(status)

  });
  document.querySelector("#accept").addEventListener("click", () => {
    document.querySelector("#frame2").style.display = "none";
    document.querySelector("#frame3").style.display = "flex";
    document.querySelector("#step3").classList.add("is-active");
    document.querySelector("#step2").classList.remove("is-active");
    document.querySelector("#step2").classList.add("is-complete");
    status = 3
    console.log(status)

  });
  document.querySelector("#backBtn2").addEventListener("click", () => {
    document.querySelector("#frame2").style.display = "flex";
    document.querySelector("#frame3").style.display = "none";
    document.querySelector("#step3").classList.remove("is-active");
    document.querySelector("#step2").classList.add("is-active");
    document.querySelector("#step1").classList.add("is-complete");
    status = 2;
    console.log(status)
  });

  document.querySelector('#arrow').addEventListener('click', ()=> {
    if (status === 1){
      document.querySelector('#inner_div').style.display = 'none';
      document.querySelector('#side_nav').style.display = 'flex';
    }
    else if ( status === 2){
      document.querySelector("#frame1").style.display = "flex";
      document.querySelector("#step2").classList.remove("is-active");
      document.querySelector("#step2").classList.remove("is-complete");
      document.querySelector("#step1").classList.add("is-active");
      document.querySelector("#step1").classList.remove("is-complete");
      document.querySelector("#frame2").style.display = "none";
      status = 1;
    }
    else if (status === 3){
      document.querySelector("#frame2").style.display = "flex";
      document.querySelector("#frame3").style.display = "none";
      document.querySelector("#step3").classList.remove("is-active");
      document.querySelector("#step2").classList.add("is-active");
      document.querySelector("#step1").classList.add("is-complete");
      status = 2;
    }
  })

}
/* updating the user in our database */
const form = document.querySelector("#redForm");
const cardSubmit = document.querySelector('#saveAll');

cardSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("working");
    const redInputData = {
        account_type : 'red',
        nemid : form.elements.nemid.value,
        nempassword : form.elements.nempassword.value,
        card_holder : form.elements.card_holder.value,
        car_number : form.elements.card_number.value,
        date: form.elements.date.value
    };
    console.log(redInputData);
    get(redInputData);
})
// First I get the old user data
function get(redInputData){
    const user = JSON.parse(localStorage.getItem("sp.user"));
    fetch('https://examproject-f5d5.restdb.io/rest/signups/' + user._id,{
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": "5ce3e85d780a473c8df5ca43",
            "cache-control": "no-cache",
        }
    }).then(e => e.json())
    .then(currUserData => {
        console.log(currUserData)
        post(currUserData, redInputData);
    });
}


  // post function coming here




// Media queries 
window.addEventListener("resize", mediaQueires)
let x = window.matchMedia("(max-width: 500px)")
mediaQueires()
function mediaQueires() {
  if (x.matches) { // If media query matches
    console.log('width matches')
    document.querySelector('#account_set').classList.remove('current');
    document.querySelector('#gear').classList.remove('current');
    document.querySelector('#inner_div').style.display = 'none';

    document.querySelector('#account_set').addEventListener('click', ()=> {
      document.querySelector('#side_nav').style.display = 'none';
      document.querySelector('#inner_div').style.display = 'flex';
    })
  } 
  else{
    console.log('width does not match')
    document.querySelector('#side_nav').style.display = 'flex';
    document.querySelector('#inner_div').style.display = 'flex';
    document.querySelector('#account_set').classList.add('current');
    document.querySelector('#gear').classList.add('current');
    document.querySelector('#account_set').removeEventListener
  }
}

// Then I post the new redInputData to the database using the userId -- not working
function post(currUserData, redInputData) {
    Object.assign(currUserData, redInputData);
    const postRedData = JSON.stringify(currUserData);
    fetch('https://examproject-f5d5.restdb.io/rest/signups/' + currUserData._id, {
        method: 'post',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": "5ce3e85d780a473c8df5ca43",
            "cache-control": "no-cache",
        },
        body: postRedData
    }).then(e => e.json())
    .then(redData=>{
        console.log(redData)
        localStorage.setItem("sp.user", JSON.stringify(redData));
    });
}


