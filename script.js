let imageLoader = document.getElementById("imageLoader");
imageLoader.addEventListener("change", handleImage);
let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let content = document.getElementById('content');
let properties = document.getElementById('properties')

let arr = []; //[resolucion, tamaño, formato]

function handleImage(e) {
  let reader = new FileReader();

  reader.onload = function (event) {
    let img = new Image();

    img.onload = function () {
      canvas.width = img.width; 
      canvas.height = img.height; 

      ctx.drawImage(img, 0, 0);

      //resolucion
      arr.push(canvas.width)
      arr.push(canvas.height)
    };
    img.src = event.target.result;
  };
  
  arr.push(e.target.files[0].size/1000)
  arr.push(e.target.files[0].type)
  reader.readAsDataURL(e.target.files[0]);
}

function initColorPicker() {
  canvas.onclick = function (mouseEvent) {
    let imgData = ctx.getImageData(
      mouseEvent.offsetX,
      mouseEvent.offsetY,
      1,
      1
    );
    
    
    let rgba = imgData.data;
   
    let r = rgba[0];
    let g = rgba[1];
    let b = rgba[2];
    fullColorHex(r, g, b, mouseEvent.offsetX, mouseEvent.offsetY);
    alert(`rgb(${r}, ${g}, ${b}) \nHEX:`);
  };
}

initColorPicker();

const fullColorHex = (r, g, b, x, y) => {
    let red = rgbToHex(r);
    let green = rgbToHex(g);
    let blue = rgbToHex(b);
    alert(`rgb(${r}, ${g}, ${b}) \nHEX: #${red}${green}${blue}\nX: ${x}, Y: ${y}`);
    
    return red + green + blue;
  };

let rgbToHex = function (rgb) {
  let hex = Number(rgb).toString(16).toUpperCase();
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};


properties.addEventListener('click', () => {
    let newElement = document.createElement('div');
    newElement.classList.add("properties")
    let li = content.appendChild(newElement)
    
    li.innerHTML = `<p>Tamaño: ${arr[0]} KB</p>`;
    li.innerHTML += `<p>Tipo: ${arr[1]}</p>`;
    li.innerHTML += `<p>Ancho: ${arr[2]} px</p>`;
    li.innerHTML += `<p>Alto: ${arr[3]} px</p>`;
})