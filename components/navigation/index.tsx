import classes from "./index.module.scss";
import Link from "next/link";

const NavigationBar = () => {
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
          <Link href="/inscription">
            <li>Inscription</li>
          </Link>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
