import { useState, useEffect } from "react";
import SignButton from "../signButton";
import FullFormation from "../../interfaces/fullFormation";
import Module from "../../interfaces/module";
import Navigation from "../navigation";
import classes from "./index.module.scss";
import "animate.css";
import Footer from "../footer";
import Debouches from "./Debouches";
import Admission from "./Admission";
import Organisation from "./Organisation";
import Frais from "./Frais";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

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
const details = [
  {
    id: 1,
    text: "Débouché de la formation",
  },
  {
    id: 2,
    text: "Condition d'admission",
  },
  {
    id: 3,
    text: "Organisation & Calendrier à retenir",
  },
  {
    id: 4,
    text: "Les frais",
  },
];
const infos = [
  {
    id: 0,
    text: "Domaine",
  },
  {
    id: 1,
    text: "Type De Formation",
  },
  {
    id: 2,
    text: "Niveau",
  },
  {
    id: 3,
    text: "Durée",
  },
];

const Index = (props: { formation: FullFormation; modules: Module[] }) => {
  // window.addEventListener("scroll", () => {console.log("blabla")})

  const { formation, modules } = props;

  const [semestre, setSemestre] = useState(1);
  const [mods, setMods] = useState(
    modules.filter((module) => module.semestre === 1)
  );
  const [detail, setDetail] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const windowHeight = window.innerHeight;
      const mods = document.getElementById("mods-mods");
      const modsTop = mods?.getBoundingClientRect().top!;
      if (modsTop < windowHeight - 150) {
        mods?.classList.add(
          "animate__animated",
          "animate__fadeIn",
          "animate__slow"
        );
        mods!.style.opacity = "1";
      }
    });
  }, []);

  const buttons = formation.type === "licence" ? licence : master;

  const changeSemestre = (id: number) => {
    setSemestre(id);
    setMods(modules.filter((module) => module.semestre === id));
  };
  const changeDetail = (id: number) => {
    setDetail(id);
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
            className="animate__animated animate__fadeInLeft animate__slow"
            src={`img/formations/formation_${formation.id}.png`}
          />
          <div
            className={`${classes.objectif} animate__animated animate__fadeInRight animate__slow`}
          >
            <h4>Objectif</h4>
            <p>{formation.objectif}</p>
          </div>
        </div>
        {/* <img className={classes.wavey} src="img/wavy lines.png" alt="" /> */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#212529",
            padding: "70px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            clipPath: "polygon(0 10%, 100% 0%, 100% 90%, 0% 100%)",
          }}
        >
          <h4>Contenu De La Formation</h4>
          <div className={classes.contenu}>
            <video
              id="vid-vid"
              src="videos/Master SI.mp4"
              autoPlay={true}
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
                    <span>M.{id + 1}</span> {module.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <img className={classes.wavey} src="img/wavy lines.png" alt="" />
        <h4>Details Sur La Formation</h4>
        <div className={classes.details}>
          <div className={classes.buttons}>
            {details.map((button) => (
              <button
                onClick={() => changeDetail(button.id)}
                className={`${classes.btn} ${
                  button.id === detail ? classes.full : classes.empty
                }`}
                key={button.id}
              >
                {button.text}
              </button>
            ))}
          </div>
          <div className={classes.dets}>
            {detail === 1 ? (
              <Debouches debouches={formation.debouches} />
            ) : detail === 2 ? (
              <Admission admission={formation.admission} />
            ) : detail === 3 ? (
              <Organisation
                organisation={formation.organisation}
                deposition={formation.deposition}
                entretien={formation.entretien}
              />
            ) : (
              <Frais
                frais_formation={formation.frais_formation}
                frais_entretien={formation.frais_entretien}
              />
            )}
          </div>
        </div>
        <h4>Informations Générales</h4>
        <div className={classes.infos}>
          <div className={classes.info}>
            <BookmarkAddedIcon style={{ fontSize: "30px" }} />
            <p>
              Domaine: <br />
              {formation.domaine}
            </p>
          </div>
          <div className={classes.info}>
            <CastForEducationIcon style={{ fontSize: "30px" }} />
            <p>
              Type De Formation: <br />
              {formation.type_formation}
            </p>
          </div>
          <div className={classes.info}>
            <SchoolIcon style={{ fontSize: "30px" }} />
            <p>
              Niveau: <br />
              {formation.type.charAt(0).toUpperCase() + formation.type.slice(1)}
            </p>
          </div>
          <div className={classes.info}>
            <EventAvailableIcon style={{ fontSize: "30px" }} />
            <p>
              Durée: <br />
              {formation.duree}
            </p>
          </div>
        </div>
        <img className={classes.wavey} src="img/wavy lines.png" alt="" />
        <SignButton />
      </div>
      <Footer />
    </>
  );
};

export default Index;
