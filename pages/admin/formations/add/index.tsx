import AddFormation from "../../../../components/admin/formations/add";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import axios from "../../../../axios/axios";
import Pole from "../../../../interfaces/pole";

const Add = (props: { poles: Pole[] }) => {
  const { poles } = props;
  return <AddFormation poles={poles} />;
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
    const poles = await getPoles();

    if (!poles) {
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
        },
      };
    }
  }
};

export default Add;
