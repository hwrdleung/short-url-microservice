// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

function button(){
  //get whatever is in the form 
  //attatch it to the end of our endpoint
  //redirect browser to this new url and let server.js do its magic
  console.log("Button lol");
  var urlInput = document.querySelector('#urlInput').value;
  var endPoint = "https://various-glue.glitch.me/"
  var newUrl = endPoint + urlInput;
  
  window.location.href = newUrl;
}