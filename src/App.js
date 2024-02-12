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
          <Route path="/" element={<Tour/>}/>
          <Route path="/valentine" element={<Valentine/>}/>
          <Route path="/games" element={<Games/>}/>
          <Route path="/series" element={<Series/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
