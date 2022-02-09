import CheckIcon from "@mui/icons-material/Check";

const Debouches = (props: { debouches: string }) => {
  const { debouches } = props;

  const list = debouches.split(",,");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "26px",
        marginTop: "20px",
        color: "#555",
      }}
    >
      {list.map((e, id) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
          key={id}
        >
          <CheckIcon style={{ color: "#3498db",fontSize:"32px" }} /> {e}
        </div>
      ))}
    </div>
  );
};

export default Debouches;
