import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Lazy load components
const Dashboard = lazy(() => import("./components/Dashboard"));
const LandingPage = lazy(() => import("./components/LandingPage"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Header />
        <main className="min-h-[calc(100vh-4rem-16rem)]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/app" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </main>
        <Footer />
      </>
    </Suspense>
  );
}

export default App;
