import "./index.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import StatsPage from "./pages/StatsPage";
import { Loader } from "./components/Loader";

function Portfolio() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </Layout>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </>
  );
}

export default App;
