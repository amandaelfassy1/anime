let form = document.querySelector("#form");
let anime = document.querySelector("#anime");

let select = document.querySelector("#select");

let errorDisplay = document.querySelector("#error");
let displayDiv = document.querySelector("#display-div");
const base_url = "https://api.jikan.moe/v4";
const ul =document.querySelector("#ul");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ul.innerHTML=""
  if (!anime.value) {
    errorDisplay.innerHTML = `<ion-label class="error">Please enter an anime </ion-label>`
    errorDisplay.style.display = "block";
    return;
  }
  if (!select.value) {
    errorDisplay.innerHTML = `<ion-label class="error">Please enter a type </ion-label>`
    errorDisplay.style.display = "block";
    return;
  }
 // if (anime.value = 0 ) {
    //errorDisplay.innerHTML = `<ion-label class="error">Desolée il n'y a pas de résultat pour votre recherche :( </ion-label>`
    //errorDisplay.style.display = "block";
   // return;
 // }
  axios
      .get(`${base_url}/search/${select.value}?q=${anime.value}&page=1`)
      .then((response) => {
        console.log(response)
        const resultat = response.data.results
        for(let data of resultat)
          {
            console.log(data)
            if(select.value =="character" || select.value =="people"){
            let li =  document.createElement("li")
            li.innerHTML = `
            <ion-card id="display-div" color="secondary">
                <ion-card-content >
                    <img id="image" src="${data.image_url}" alt="">
                    <ion-card-title id="title">${data.name}</ion-card-title>
                    <ion-card-content id="url"><a href="${data.url}" >${data.url}</a></ion-card-content>
                </ion-card-content>
            </ion-card>
            `
            ul.append(li)
          }
            else if(select.value == "manga"){
              let li =  document.createElement("li")
              li.innerHTML = `
            <ion-card id="display-div" color="secondary" >
                <ion-card-content >
                    <img id="image" src="${data.image_url}" alt="">
                    <ion-card-title id="title">${data.title}</ion-card-title>
                    <ion-card-content id="url"><a href="${data.url}" >${data.url}</a></ion-card-content>
                    <ion-card-content id="synopsis">Synopsis : ${data.synopsis}</ion-card-content>
                    <ion-card-title id="episodes">Volumes : ${data.volumes}</ion-card-title>
                </ion-card-content>
            </ion-card>
            `
              ul.append(li)
            }
            else if(select.value =="anime"){
              let li =  document.createElement("li")
              li.innerHTML = `
            <ion-card id="display-div" color="secondary" >
                <ion-card-content >
                    <img id="image" src="${data.image_url}" alt="">
                    <ion-card-title id="title">${data.title}</ion-card-title>
                    <ion-card-content id="url"><a href="${data.url}" >${data.url}</a></ion-card-content>
                    <ion-card-content id="synopsis">Synopsis : ${data.synopsis}</ion-card-content>
                    <ion-card-title id="episodes" >Episodes : ${data.episodes}</ion-card-title>
                </ion-card-content>
            </ion-card>
            `
              ul.append(li)
            }
          }
        errorDisplay.style.display = "none";
      })
      .catch((error) => {
        displayDiv.style.display = "none";
        errorDisplay.innerHTML = error.response.data.message;
        errorDisplay.style.display = "block";
      });
});
