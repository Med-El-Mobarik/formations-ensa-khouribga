import { useState, useEffect } from "react";
import FullFormation from "../../interfaces/fullFormation";
import Module from "../../interfaces/module";
import Navigation from "../navigation";
import classes from "./index.module.scss";
import "animate.css";
import Footer from "../footer";

const licence = [
  {
    id: 1,
    text: "Semestre 1",
  },
  {
    id: 2,
    text: "Semestre 2",
  },
];
const master = [
  {
    id: 1,
    text: "Semestre 1",
  },
  {
    id: 2,
    text: "Semestre 2",
  },
  {
    id: 3,
    text: "Semestre 3",
  },
  {
    id: 4,
    text: "Semestre 4",
  },
];

const Index = (props: { formation: FullFormation; modules: Module[] }) => {
  // window.addEventListener("scroll", () => {console.log("blabla")})

  const { formation, modules } = props;

  const [semestre, setSemestre] = useState(1);
  const [mods, setMods] = useState(
    modules.filter((module) => module.semestre === 1)
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const windowHeight = window.innerHeight;

      const mods = document.getElementById("mods-mods");
      const modsTop = mods?.getBoundingClientRect().top!;
      const vid = document.getElementById("vid-vid");
      const vidTop = vid?.getBoundingClientRect().top!;

      if (modsTop < windowHeight - 150) {
        mods?.classList.add(
          "animate__animated",
          "animate__fadeInRight"
          // "animate__slow"
        );
        mods!.style.opacity = "1";
      }

      if (vidTop < windowHeight - 150) {
        vid?.classList.add(
          "animate__animated",
          "animate__fadeInLeft"
          // "animate__slow"
        );
        vid!.style.opacity = "1";
      }
    });
    // };
  }, []);

  const buttons = formation.type === "licence" ? licence : master;

  const changeSemestre = (id: number) => {
    setSemestre(id);
    setMods(modules.filter((module) => module.semestre === id));
  };

  return (
    <>
      <Navigation />
      <div className={classes.content}>
        <h2>
          {formation.type === "licence"
            ? "Licence Professionnel De L'université"
            : "Master Professionnel de L'université"}
        </h2>
        <h3>{formation.name}</h3>
        <div className={classes.obj}>
          <img
            className="animate__animated animate__fadeInLeft"
            src={`img/formations/formation_${formation.id}.png`}
          />
          <div
            className={`${classes.objectif} animate__animated animate__fadeInRight`}
          >
            <h4>_Objectif_</h4>
            <p>{formation.objectif}</p>
          </div>
        </div>
        <h4>_Contenu De La Formation_</h4>
        <div className={classes.contenu}>
          <video
            id="vid-vid"
            src="videos/Master SI.mp4"
            // autoPlay={true}
            poster="img/ensakh_black.png"
            controls
          ></video>
          <div id="mods-mods" className={classes.modules}>
            <div className={classes.buttons}>
              {buttons.map((button) => (
                <button
                  onClick={() => changeSemestre(button.id)}
                  className={`${classes.btn} ${
                    button.id === semestre ? classes.full : classes.empty
                  }`}
                  key={button.id}
                >
                  {button.text}
                </button>
              ))}
            </div>
            <ul className={classes.mods}>
              {mods.map((module, id) => (
                <li key={id}>
                  <span>M.{id + 1}</span>__{module.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
