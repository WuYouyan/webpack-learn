import React from 'react'; //  use DllPlugin and DllReferencePlugin to extract react and react-dom to a js file 
import { render } from 'react-dom'; // do not package react and react-dom every time, import from _dll_react.js instead


render(<h1>jsx</h1>, window.root);