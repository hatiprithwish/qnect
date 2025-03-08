import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flow from "./pages/Flow";
import { Toaster } from "react-hot-toast";
import FlowLayout from "./layouts/FlowLayout";
import Problems from "./pages/Problems";
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/problems" element={<Problems />} />
          </Route>
          <Route
            path="/flow"
            element={
              <ProtectedRoute>
                <FlowLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Flow />} />
          </Route>
        </Routes>
        <Toaster />
      </Suspense>
    </>
  );
}

export default App;
