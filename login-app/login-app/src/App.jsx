import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
