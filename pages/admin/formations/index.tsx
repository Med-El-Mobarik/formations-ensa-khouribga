import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Forms from "../../../components/admin/formations";
import axios from "../../../axios/axios";
import Formation from "../../../interfaces/formations";
import Pole from "../../../interfaces/pole";

const Formations = (props: {
  formations: Formation[];
  poles: Pole[];
  name: string;
}) => {
  const { formations, name, poles } = props;
  return <Forms formations={formations} name={name} poles={poles} />;
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
    const formations = await getFormations();
    const poles = await getPoles();

    if (!formations || !poles) {
      return {
        redirect: {
          destination: "/servererror",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          formations: formations,
          poles: poles,
          name: session.user.name,
        },
      };
    }
  }
};

export default Formations;
