import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

//Business logic

function getGif(search) {
  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}&limit=50`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, search);
      console.log(response.meta.response_id);
    } else { printError(request, response, search);
    }
  });
  request.open("GET", url, true);
  request.send();
}

function printElements(response, search) {
  const outputDiv = document.querySelector('#output');
  outputDiv.innerText = `your searched for: ${search}`;
  response.data.forEach((element) => {
    const img = document.createElement("img");
    img.src = element.images.original.url;
    outputDiv.append(img);
  });
}

function printError(request, response, search) {
  document.querySelector('#output').innerText = `There was an error finding ${search}. ${request.status} ${response.meta.msg}`;
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