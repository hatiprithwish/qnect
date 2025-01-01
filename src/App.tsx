import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleFlow from "./pages/SingleFlow";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SingleFlow />} />
      </Routes>
    </BrowserRouter>
  );
}
