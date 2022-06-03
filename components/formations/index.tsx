import PolesFormations from "../../interfaces/pole&formation";
// import Pole from "../../interfaces/pole";
import Navigation from "../navigation";
import classes from "./index.module.scss";
import { useState } from "react";
import Link from "next/link";
import "animate.css";
import Footer from "../footer/index";
import getImage from "../../files";
// @ts-ignore
import { Image } from "cloudinary-react";

const Index = (props: PolesFormations) => {
  const { poles, formations } = props;

  const licencePoles = poles.filter((pole) => pole.type !== "master");
  const masterPoles = poles.filter((pole) => pole.type !== "licence");

  const licFormations = formations.filter(
    (formation) => formation.type === "licence"
  );
  const masFormations = formations.filter(
    (formation) => formation.type === "master"
  );

  const [licencePole, setlicencePole] = useState(0);
  const [licenceFormations, setlicenceFormations] = useState(licFormations);
  const [masterPole, setMasterPole] = useState(0);
  const [masterFormations, setMasterFormations] = useState(masFormations);

  const changelicencePole = (id: number) => {
    setlicencePole(id);
    if (id === 0) {
      setlicenceFormations(licFormations);
    } else {
      setlicenceFormations(
        formations.filter((formation) => formation.pole === id)
      );
    }
  };
  const changeMasterPole = (id: number) => {
    setMasterPole(id);
    if (id === 0) {
      setMasterFormations(masFormations);
    } else {
      setMasterFormations(
        formations.filter((formation) => formation.pole === id)
      );
    }
  };

  return (
    <>
      <Navigation />
      <div className={`${classes.content} animate__animated animate__fadeIn`}>
        <h2>Licence professionnel de l&apos;université</h2>
        <hr />
        <div className={classes.buttons}>
          {licencePoles.map((button) => (
            <button
              className={`${classes.btn} ${
                licencePole === button.id ? classes.full : classes.empty
              }`}
              key={button.id}
              onClick={() => changelicencePole(button.id)}
            >
              {button.name}
            </button>
          ))}
        </div>
        <div className={classes.formations}>
          {licenceFormations.map((formation) => (
            <Link key={formation.id} href={`/formation?id=${formation.id}`}>
              <div className={classes.formation}>
                <div className={classes.imagecontainer}>
                  <Image
                    cloudName="dvfaacurl"
                    publicId={formation.image_name}
                    alt="formation_image"
                  />
                </div>
                <h3>{formation.name}</h3>
                <Link href={`/formation?id=${formation.id}`}>
                  <button>Plus D&apos;infos &rarr;</button>
                </Link>
              </div>
            </Link>
          ))}
          <div style={{ width: "32%" }}></div>
        </div>
        <h2>Master professionnel de l&apos;université</h2>
        <hr />
        <div className={classes.buttons}>
          {masterPoles.map((button) => (
            <button
              key={button.id}
              className={`${classes.btn} ${
                masterPole === button.id ? classes.full : classes.empty
              }`}
              onClick={() => changeMasterPole(button.id)}
            >
              {button.name}
            </button>
          ))}
        </div>
        <div className={`${classes.formations}`}>
          {masterFormations.map((formation) => (
            <Link key={formation.id} href={`/formation?id=${formation.id}`}>
              <div className={classes.formation}>
                <div className={classes.imagecontainer}>
                  <Image
                    cloudName="dvfaacurl"
                    publicId={formation.image_name}
                    alt="formation_image"
                  />
                </div>
                <h3>{formation.name}</h3>
                <Link href={`/formation?id=${formation.id}`}>
                  <button>Plus D&apos;infos &rarr;</button>
                </Link>
              </div>
            </Link>
          ))}
          <div style={{ width: "32%" }}></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
