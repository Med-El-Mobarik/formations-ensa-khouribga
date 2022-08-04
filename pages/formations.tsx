import Forms from "../components/formations";
import PolesFormations from "../interfaces/pole&formation";
import axios from "../axios/axios";
import { GetServerSideProps } from "next";
import Head from "next/head";

const Formations = (props: PolesFormations) => {
  return (
    <>
      <Head>
        <title>Ensa Khouribga Formations continues</title>
        <meta
          name="description"
          content="ensak-formations.com: ENSA Khouribga - Formation Continue professionnelle vous propose des formations diplômants, en : Système d’information - Génie logiciel - Administration réseaux - Analyse et conception des systèmes informatiques"
        ></meta>
      </Head>
      <Forms poles={props.poles} formations={props.formations} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const getPoles = async () => {
    try {
      const res = await axios.get("poles/getAllPoles");
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };
  const getFormations = async () => {
    try {
      const res = await axios.get("formations/getAllFormations");
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      if (error.reponse) console.log(error.reponse);
      return false;
    }
  };

  const poles = await getPoles();
  const formations = await getFormations();

  if (!poles || !formations) {
    return {
      redirect: {
        destination: "/servererror",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        poles: poles,
        formations: formations,
      },
    };
  }
};

export default Formations;
