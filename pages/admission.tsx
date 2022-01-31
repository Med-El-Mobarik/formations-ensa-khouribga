import { GetServerSideProps } from "next";
import Adm from "../components/admission";

const Admission = () => {
  return <Adm />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Admission;
