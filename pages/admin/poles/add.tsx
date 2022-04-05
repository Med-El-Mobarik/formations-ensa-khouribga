import AddPole from "../../../components/admin/poles/add";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "../../../axios/axios";
import Formation from "../../../interfaces/formations";

const Add = (props: { formations: Formation[] }) => {
  const { formations } = props;
  return <AddPole formations={formations} />;
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
    const getFormations = async () => {
      try {
        const res = await axios.get("formations/getAllFormations", {
          withCredentials: true,
        });
        return res.data;
      } catch (error: any) {
        console.log(error.message);
        return false;
      }
    };
    const formations = await getFormations();

    if (!formations) {
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
        },
      };
    }
  }
};

export default Add;
