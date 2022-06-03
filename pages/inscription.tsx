import Insc from "../components/inscription";
import Head from "next/head";

const inscription = () => {
  return (
    <>
      <Head>
        <title>Inscription | Ensa Khouribga</title>
        <meta
          name="description"
          content="inscrivez-vous maintenant dans nos formations continues professionnelles à l'Ensa de Khouribga"
        ></meta>
      </Head>
      <Insc />
    </>
  );
};

export default inscription;
