import EditFormation from "../../../../components/admin/formations/edit";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import axios from "../../../../axios/axios";
import Pole from "../../../../interfaces/pole";
import Formation from "../../../../interfaces/fullFormation";

const Edit = (props: { poles: Pole[]; formation: Formation }) => {
  const { poles, formation } = props;
  return <EditFormation poles={poles} formation={formation} />;
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
    const getFullFormation = async () => {
      try {
        const res = await axios.get(
          `formations/getFullFormation?id=${context.query.id}`
        );
        return res.data;
      } catch (error: any) {
        console.log(error.message);
        return false;
      }
    };

    const { formation } = await getFullFormation();
    const poles = await getPoles();

    if (!poles || !formation) {
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
          formation: formation[0],
        },
      };
    }
  }
};

export default Edit;
