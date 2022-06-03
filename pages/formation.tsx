import FullFormatio from "../interfaces/fullFormation";
import Module from "../interfaces/module";
import axios from "../axios/axios";
import { GetServerSideProps } from "next";
import Forma from "../components/formation";
import Head from "next/head";

const Formation = (props: { formation: FullFormatio; modules: Module[] }) => {
  const { formation, modules } = props;
  return (
    <>
      <Head>
        <title>{formation.name}</title>
        <meta
          name="description"
          content={`Formation Continue professionnelle ${formation.name}`}
        ></meta>
      </Head>
      <Forma formation={formation} modules={modules} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  const { formation, modules } = await getFullFormation();

  if (!formation) {
    return {
      redirect: {
        destination: "/formations",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        formation: formation[0],
        modules: modules,
      },
    };
  }
};

export default Formation;
