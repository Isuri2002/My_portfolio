import Skills from "./components/Skills";
import Hero from "./components/Hero";
import Cv from "./components/Cv";
import Projects from "./components/Projects";


export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <Cv />
    </main>
  );
} 