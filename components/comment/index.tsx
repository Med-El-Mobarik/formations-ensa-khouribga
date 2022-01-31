import classes from "./index.module.scss";
// import Image from "next/image";

const index = () => {
  return (
    <section className={classes.section}>
      <h2>COMMENT ETRE ADMIS ?</h2>
      <div className={classes.content}>
        <img id="illus" src="/img/person.png" alt="admission" />
        <div id="sts" className={classes.steps}>
          <div className={classes.step}>
            <div className={classes.number}>1</div>
            <p className={classes.text}>Inscription En Ligne</p>
          </div>
          <div className={classes.step}>
            <div className={classes.number}>2</div>
            <p className={classes.text}>Validation Sur Dossier</p>
          </div>
          <div className={classes.step}>
            <div className={classes.number}>3</div>
            <p className={classes.text}>Entretien Oral</p>
          </div>
          <div className={classes.step}>
            <div className={classes.number}>4</div>
            <p className={classes.text}>INSCRIPTION FINALE</p>
          </div>
        </div>
      </div>
      <button>S&apos;inscrire</button>
    </section>
  );
};

export default index;
