import classes from "./index.module.scss";
import "animate.css";


const index = () => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.navcontainer}>
          <nav className="animate__animated animate__fadeInDown">
            <img src="img/ensakh.png" alt="ensa-logo"></img>
            <ul>
              <li>Accueil</li>
              <li>Formations</li>
              <li>Admission</li>
              <li>Inscription</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
        <div
          className={`${classes.content} animate__animated animate__fadeInUp`}
        >
          <h1>
            Licence Et Master :<br />
            100% Ingénierie, Présentiel / E-learning
          </h1>
          <div>
            <button className={`${classes.btn} ${classes.full}`}>
              S&apos;inscrire
            </button>
            <button className={`${classes.btn} ${classes.empty}`}>
              Plus D&apos;infos
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default index;
