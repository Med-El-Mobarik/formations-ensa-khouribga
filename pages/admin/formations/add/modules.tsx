import Mods from "../../../../components/admin/formations/modules";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Modules = (props: { id: string; type: string }) => {
  const { id, type } = props;
  return <Mods id={parseInt(id)} type={type} />;
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
    const blabla = context.query;
    return {
      props: {
        id: blabla.id,
        type: blabla.type,
      },
    };
  }
};

export default Modules;
