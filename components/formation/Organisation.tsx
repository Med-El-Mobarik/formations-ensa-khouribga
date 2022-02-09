import CheckIcon from "@mui/icons-material/Check";

const Organisation = (props: {
  organisation: string;
  deposition: string;
  entretien: string;
}) => {
  const { organisation, deposition, entretien } = props;

  return (
    <div>
      <h5 style={{ fontSize: "20px", color: "#555" }}>
        __Organisation De La Formation
      </h5>
      <p style={{ display: "flex", alignItems: "center", fontSize: "18px" }}>
        <CheckIcon style={{ fontSize: "28px", color: "#3498db" }} />{" "}
        {organisation}
      </p>
      <h5 style={{ fontSize: "20px", color: "#555" }}>__Calendrier A Retenir</h5>
      <p style={{ display: "flex", alignItems: "center", fontSize: "18px" }}>
        <CheckIcon style={{ fontSize: "28px", color: "#3498db" }} />{" "}
        {deposition}
      </p>
      <p style={{ display: "flex", alignItems: "center", fontSize: "18px" }}>
        <CheckIcon style={{ fontSize: "28px", color: "#3498db" }} /> {entretien}
      </p>
    </div>
  );
};

export default Organisation;
