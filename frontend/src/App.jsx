import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Heart } from "lucide-react";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex min-h-screen items-center justify-center gap-3 bg-gray-50">
              <Heart className="text-rose-500" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">EstateHub</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;