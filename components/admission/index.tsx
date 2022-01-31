import NavigationBar from "../navigation";
import Footer from "../footer";
import classes from "./index.module.scss";

const steps = [
  {
    id: 1,
    title: "Inscription En Ligne",
    text: "Faites votre demande d'inscription en ligne. Choisissez le niveau de formation et les filières voulues, précisez vos informations personnelles, vos diplômes obtenus et vos expériences professionnelles.",
  },
  {
    id: 2,
    title: "Validation De L'inscription",
    text: "Une fois votre dossier étudié et après avis positif du responsable de formation, votre inscription est considérée définitive aprés le paiement des frais de scolarité. Un mail vous sera envoyé vous annonçant la décision du Jury.",
  },
  {
    id: 3,
    title: "Entretien",
    text: "L'objectif de l'entretien est de définir votre envie d'intégrer nos formations, vos motivations et votre profil . Le responsable de formation va vous accueillir et répondre à toutes vos questions concernant le déroulement de la formation.",
  },
  {
    id: 2,
    title: "Validation De L'inscription",
    text: "Une fois votre dossier étudié et après avis positif du responsable de formation, votre inscription est considérée définitive aprés le paiement des frais de scolarité. Un mail vous sera envoyé vous annonçant la décision du Jury.",
  },
];

const Admission = () => {
  return (
    <>
      <NavigationBar />
      <div className={`${classes.content} animate__animated animate__fadeInUp`}>
        <h2> Admission</h2>
        <hr />
        <div className={classes.container}>
          {steps.map((step, id) => (
            <div key={id} className={classes.stepContainer}>
              <div className={classes.step}>
                <img
                  src={`img/admission/admission_${step.id}.png`}
                  alt={step.title}
                />
                <div className={classes.rightContent}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <span className={classes.circle}></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admission;
