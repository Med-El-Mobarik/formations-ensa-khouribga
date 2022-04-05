import Polees from "../../../components/admin/poles";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "../../../axios/axios";
import Pole from "../../../interfaces/pole";

const Poles = (props: { poles: Pole[] }) => {
  const { poles } = props;
  return (
    <div>
      <Polees poles={poles} />
    </div>
  );
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
        const res = await axios.get("poles/getAllPoles", {
          withCredentials: true,
        });
        return res.data;
      } catch (error: any) {
        console.log(error.message);
        return false;
      }
    };
    const poles = await getPoles();

    // console.log(inscriptions);

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

export default Poles;
