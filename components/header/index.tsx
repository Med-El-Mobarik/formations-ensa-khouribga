import classes from "./index.module.scss";
import Link from "next/link";
import "animate.css";

const index = () => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.navcontainer}>
          <nav className="animate__animated animate__fadeInDown">
            <Link href="/">
              <img src="img/ensakh.png" alt="ensa-logo"></img>
            </Link>
            <ul>
              <Link href="/">
                <li>Accueil</li>
              </Link>
              <Link href="/formations">
                <li>Formations</li>
              </Link>
              <Link href="/admission">
                <li>Admission</li>
              </Link>
              <Link href="/inscription">
                <li>Inscription</li>
              </Link>
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
            <Link href="/inscription">
              <button className={`${classes.btn} ${classes.full}`}>
                S&apos;inscrire
              </button>
            </Link>
            <Link href="/formations">
              <button className={`${classes.btn} ${classes.empty}`}>
                Plus D&apos;infos
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default index;
