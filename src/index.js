// imgae
// 1. js import image
// 2. css: background('url') import imge
// 3. <img src="" alt="">

// file-loader, by default, it will generate a new image in our build directory
import './index.css';
import logo from './logo.png'; // import image, return a new image address
console.log("logo", logo);

let img = new Image();
img.src=logo;
document.body.appendChild(img);