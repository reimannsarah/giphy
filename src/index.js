import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

//Business logic

function getGif(search) {
  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}&limit=25`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, search);
    }
  });
  request.open("GET", url, true);
  request.send();
}

function printElements(response, search) {
  const outputDiv = document.querySelector('#output');
  outputDiv.innerText = `your search for ${search}, yielded results`;
  response.data.forEach((element) => {
    const img = document.createElement("img");
    img.src = element.images.original.url;
    outputDiv.append(img);
  });
}


//UI logic

function handleFormSubmission(e) {
  e.preventDefault();
  const search = document.getElementById("search").value;
  document.getElementById("search").value = null;
  getGif(search);

}

window.addEventListener("load", function () {
  this.document.querySelector("form").addEventListener("submit", handleFormSubmission);
});