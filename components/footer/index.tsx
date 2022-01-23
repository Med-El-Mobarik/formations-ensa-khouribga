import classes from "./index.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const index = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.content}>
        <div className={classes.logos}>
          <img
            className={classes.ensakh}
            src="img/ensakh.png"
            alt="ensa-khouribga"
          />
          <img src="img/univ.png" alt="ensa-khouribga" />
        </div>
        <div className={classes.liens}>
          <h3>Liens</h3>
          <a
            href="http://ensak.usms.ac.ma/ensak/"
            target="_blank"
            rel="noreferrer"
          >
            Ensa Khouribga
          </a>
          <a href="">Nos Formations</a>
          <a href="">Contact</a>
        </div>
        <div className={classes.infos}>
          <div className={classes.info}>
            <LocationOnIcon className={classes.logo} />
            <p>
              École Nationale des Sciences Appliquées,
              <br /> Bd Béni Amir, BP 77, Khouribga - Maroc
            </p>
          </div>
          <div className={classes.info}>
            <LocalPhoneIcon className={classes.logo} />
            <p>06 62 05 77 69</p>
          </div>
          <div className={classes.info}>
            <EmailIcon className={classes.logo} />
            <p>ensak.formations@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default index;
