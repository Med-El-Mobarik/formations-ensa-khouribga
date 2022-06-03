import Header from "../components/header";
import Why from "../components/why";
import Footer from "../components/footer";
import Formations from "../components/objs";
import Comment from "../components/comment";
import { useEffect } from "react";
import Head from "next/head";
const Index = () => {
  useEffect(() => {
    const func = () => {
      const windowHeight = window.innerHeight;

      const cards = document.getElementById("cards");
      const cardsTop = cards?.getBoundingClientRect().top!;

      const objs = document.getElementById("objs");
      const objsTop = objs?.getBoundingClientRect().top!;

      const illus = document.getElementById("illus");
      const illusTop = illus?.getBoundingClientRect().top!;

      const sts = document.getElementById("sts");
      const stsTop = sts?.getBoundingClientRect().top!;

      if (cardsTop < windowHeight - 150) {
        cards?.classList.add("animate__animated", "animate__fadeInUp");
        cards!.style.opacity = "1";
      }

      if (objsTop < windowHeight - 150) {
        objs?.classList.add("animate__animated", "animate__fadeIn");
        objs!.style.opacity = "1";
      }

      if (illusTop < windowHeight - 150) {
        illus?.classList.add("animate__animated", "animate__fadeInLeft");
        illus!.style.opacity = "1";
      }

      if (stsTop < windowHeight - 150) {
        sts?.classList.add("animate__animated", "animate__fadeInRight");
        sts!.style.opacity = "1";
      }
    };

    window.addEventListener("scroll", func);

    return () => {
      window.removeEventListener("scroll", func);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Ensa Khouribga Formations continues</title>
        <meta
          name="description"
          content="ensak-formations.com: ENSA Khouribga - Formation Continue professionnelle vous propose des formations diplômants, en : Système d’information - Génie logiciel - Administration réseaux - Analyse et conception des systèmes informatiques"
        ></meta>
      </Head>
      <Header />
      <Why />
      <Formations />
      <Comment />
      <Footer />
    </>
  );
};

export default Index;
