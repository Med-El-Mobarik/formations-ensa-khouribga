import CheckIcon from "@mui/icons-material/Check";

const Frais = (props: { frais_formation: string; frais_entretien: string }) => {
  const { frais_formation, frais_entretien } = props;

  return (
    <div style={{ color: "#555", fontSize:"22px" }}>
      <p style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <CheckIcon style={{ fontSize: "28px", color: "#3498db" }} /> Frais De
        Formation: {frais_formation}
      </p>
      <p style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <CheckIcon style={{ fontSize: "28px", color: "#3498db" }} /> Frais
        D&apos;Entretien: {frais_entretien}
      </p>
    </div>
  );
};

export default Frais;
