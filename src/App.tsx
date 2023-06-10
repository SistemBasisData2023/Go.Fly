import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "../src/style/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import Landing from "./pages/Landing";
import SearchFlight from "./pages/SearchFlight";
import Thanks from './pages/Thanks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/search" element={<SearchFlight />}></Route>
        <Route path="/thanks" element={<Thanks />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
