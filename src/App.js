import './App.css';
import Heart from "react-animated-heart/dist/cjs";
import React, {useState} from "react";
import Games from "./pages/Games";
import Valentine from "./pages/Valentine";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Series from "./pages/Series";
import Tour from "./pages/Tour";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/valentine" element={<Tour/>}/>
          <Route path="/3" element={<Valentine/>}/>
          <Route path="/2" element={<Games/>}/>
          <Route path="/1" element={<Series/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
