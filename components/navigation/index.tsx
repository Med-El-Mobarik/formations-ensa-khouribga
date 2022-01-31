import classes from "./index.module.scss";
import Link from "next/link";

const navigationBar = () => {
  return (
    <div className={classes.navcontainer}>
      <nav>
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
          <li>Inscription</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default navigationBar;
