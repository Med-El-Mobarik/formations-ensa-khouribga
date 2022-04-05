import Inscs from "../../../components/admin/inscriptions";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "../../../axios/axios";

import Inscription from "../../../interfaces/inscription";

const Inscriptions = (props: { inscriptions: Inscription[] }) => {
  const { inscriptions } = props;
  return <Inscs inscs={inscriptions} />;
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
    const inscriptions = await getInscriptions();

    if (!inscriptions) {
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
        },
      };
    }
  }
};

export default Inscriptions;
