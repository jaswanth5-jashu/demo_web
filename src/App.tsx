import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import Calculator from "./components/Calculator";
import About from "./components/About";
import Process from "./components/Process";
import CertifiedCompliant from "./components/CertifiedCompliant";
import Sustainability from "./components/Sustainability";
import Founders from "./components/Founders";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Feedback from "./components/Feedback";
import WhyHydh2oPage from "./components/WhyHydh2oPage";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentPath, setCurrentPath] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith("/#") || to.startsWith("#")) {
      const id = to.replace("/#", "").replace("#", "");
      if (currentPath !== "/") {
        window.history.pushState({}, "", `/#${id}`);
        setCurrentPath("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 80);
      } else {
        window.history.pushState({}, "", `/#${id}`);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    window.history.pushState({}, "", to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (currentPath !== "/") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
      gsap.to(".bottle-3d--tall", {
        rotate: 6,
        y: 110,
        scale: 0.92,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(".about-art img", {
        scale: 1.16,
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".about-art", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
    return () => context.revert();
  }, [currentPath]);

  const progress = useMemo(() => <div className="page-progress" aria-hidden="true" />, []);

  if (currentPath === "/why-hydh2o" || currentPath === "/why-hydh20") {
    return (
      <>
        {progress}
        <Header onNavigate={navigate} />
        <main><WhyHydh2oPage onNavigate={navigate} /></main>
        <Footer />
      </>
    );
  }

  if (currentPath === "/feedback") {
    return (
      <>
        {progress}
        <Header onNavigate={navigate} />
        <main><Feedback /></main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {progress}
      <Header onNavigate={navigate} />
      <main>
        <Home />
        <Products />
        <Calculator />
        <About onNavigate={navigate} />
        <Process />
        <CertifiedCompliant />
        <Sustainability onNavigate={navigate} />
        <Founders />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
