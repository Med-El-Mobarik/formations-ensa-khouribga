import Forms from "../components/formations";
import PolesFormations from "../interfaces/pole&formation";
import axios from "../axios/axios";
import { GetServerSideProps } from "next";

const Formations = (props: PolesFormations) => {
  return <Forms poles={props.poles} formations={props.formations} />;
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
      return false;
    }
  };

  const poles = await getPoles();
  const formations = await getFormations();

  if (!poles || !formations) {
    return {
      redirect: {
        destination: "/",
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
