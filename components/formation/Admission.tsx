import CheckIcon from "@mui/icons-material/Check";

const Admission = (props: { admission: string }) => {
  const { admission } = props;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CheckIcon style={{ fontSize: "30px", color: "#3498db" }} />{" "}
      <p style={{ fontSize: "22px", color: "#555" }}>{admission}</p>
    </div>
  );
};

export default Admission;
