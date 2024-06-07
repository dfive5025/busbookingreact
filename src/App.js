import "./App.css";
import HomeOK from "./HomeOK.jsx";
import BusFilterScreen from "./components/busFilter/BusFilterScreen.tsx";
import ScrollDataPicker from "./components/scrollDatePicker/ScrollDataPicker.tsx";
import TripPickScreen from "./components/tripPick/TripPickScreen.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusFilterScreen />} />
        <Route path="/trip" element={<TripPickScreen />} />
        <Route path="scroll" element={<ScrollDataPicker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
