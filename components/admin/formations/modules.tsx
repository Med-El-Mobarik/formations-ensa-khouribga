import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./modules.module.scss";
import AdminNav from "../../adminnav";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../../axios/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modules = (props: { id: number; type: string }) => {
  const { id, type } = props;

  const [spinner, setSpinner] = useState(false);

  const [sems1, setSems1] = useState<number>(0);
  const [sems2, setSems2] = useState<number>(0);
  const [sems3, setSems3] = useState<number>(0);
  const changeSems1 = (e: ChangeEvent<HTMLInputElement>) => {
    setSems1(
      e.target.value
        ? parseInt(e.target.value) >= 0
          ? parseInt(e.target.value)
          : 0
        : 0
    );
  };
  const changeSems2 = (e: ChangeEvent<HTMLInputElement>) => {
    setSems2(
      e.target.value
        ? parseInt(e.target.value) >= 0
          ? parseInt(e.target.value)
          : 0
        : 0
    );
  };
  const changeSems3 = (e: ChangeEvent<HTMLInputElement>) => {
    setSems3(
      e.target.value
        ? parseInt(e.target.value) >= 0
          ? parseInt(e.target.value)
          : 0
        : 0
    );
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const sem1: string[] = [];
    const sem2: string[] = [];
    const sem3: string[] = [];

    for (let i = 1; i <= sems1; i++) {
      const elem = document.getElementById(`sem1-m${i}`) as HTMLInputElement;
      sem1.push(elem.value.replace(/'/g, "''"));
    }
    for (let i = 1; i <= sems2; i++) {
      const elem = document.getElementById(`sem2-m${i}`) as HTMLInputElement;
      sem2.push(elem.value.replace(/'/g, "''"));
    }
    for (let i = 1; i <= sems3; i++) {
      const elem = document.getElementById(`sem3-m${i}`) as HTMLInputElement;
      sem3.push(elem.value.replace(/'/g, "''"));
    }

    try {
      setSpinner(true);
      const res = await axios.post("formation/addModules", {
        sem1,
        sem2,
        sem3,
        id: id,
      });
      setSpinner(false);
      toast.success("La formation est ajoutée avec succées");
      setTimeout(() => {
        location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Erreur de serveur est servenue");
    }
  };

  return (
    <>
      <AdminNav />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
      />
      <div className={classes.container}>
        <form onSubmit={onSubmit}>
          <h2 style={{ color: "#3498db", margin: "0px" }}>Semestre 1</h2>
          <br />
          <TextField
            style={{ marginBottom: "15px" }}
            value={sems1}
            onChange={changeSems1}
            type="number"
            fullWidth
            label="Nombre des modules"
            variant="standard"
          />
          <br />
          {[...Array(sems1)].map((e, id) => (
            <TextField
              required
              id={`sem1-m${id + 1}`}
              style={{ marginBottom: "15px" }}
              key={id}
              fullWidth
              label={`Module ${id + 1}`}
              variant="standard"
              //   defaultValue=""
            />
          ))}
          <h2 style={{ color: "#3498db", margin: "0px" }}>Semestre 2</h2>
          <br />
          <TextField
            style={{ marginBottom: "15px" }}
            value={sems2}
            onChange={changeSems2}
            type="number"
            fullWidth
            label="Nombre des modules"
            variant="standard"
          />
          <br />
          {[...Array(sems2)].map((e, id) => (
            <TextField
              required
              id={`sem2-m${id + 1}`}
              style={{ marginBottom: "15px" }}
              key={id}
              fullWidth
              label={`Module ${id + 1}`}
              variant="standard"
              //   defaultValue=""
            />
          ))}
          {type === "master" && (
            <>
              <h2 style={{ color: "#3498db", margin: "0px" }}>Semestre 3</h2>
              <br />
              <TextField
                style={{ marginBottom: "15px" }}
                value={sems3}
                onChange={changeSems3}
                type="number"
                fullWidth
                label="Nombre des modules"
                variant="standard"
              />
              <br />
              {[...Array(sems3)].map((e, id) => (
                <TextField
                  id={`sem3-m${id + 1}`}
                  style={{ marginBottom: "15px" }}
                  key={id}
                  fullWidth
                  label={`Module ${id + 1}`}
                  variant="standard"
                />
              ))}
            </>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {spinner ? <CircularProgress /> : <button>Enregistrer</button>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Modules;
