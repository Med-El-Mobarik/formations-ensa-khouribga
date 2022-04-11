import Inscs from "../../../components/admin/inscriptions";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "../../../axios/axios";

import Inscription from "../../../interfaces/inscription";
import Formations from '../../../interfaces/formations';

const Inscriptions = (props: { inscriptions: Inscription[], formations: Formations[] }) => {
  const { inscriptions, formations } = props;
  return <Inscs inscs={inscriptions} forms={formations}/>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  } else {
    const getInscriptions = async () => {
      try {
        const res = await axios.get("inscription", { withCredentials: true });
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
    const inscriptions = await getInscriptions();
    const formations = await getFormations();

    if (!inscriptions || !formations) {
      return {
        redirect: {
          destination: "/servererror",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          inscriptions: inscriptions,
          formations: formations
        },
      };
    }
  }
};

export default Inscriptions;
