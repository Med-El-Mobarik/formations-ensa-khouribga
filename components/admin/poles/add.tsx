import { useState } from "react";
import axios from "../../../axios/axios";
import classes from "./index.module.scss";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import Formation from "../../../interfaces/formations";

import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = (props: { formations: Formation[] }) => {
  const { formations } = props;
  const [formationSelected, setFormationSelected] = useState<string[]>([]);
  const [type, setType] = useState("");
  const [spinner, setSpinner] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof formationSelected>) => {
    const {
      target: { value },
    } = event;
    setFormationSelected(typeof value === "string" ? value.split(",") : value);
  };
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const nameInput = document.getElementById(
      "pole-name-add"
    ) as HTMLInputElement;
    const name = nameInput.value;

    const formationsIdsfirst = formations.map((formation) => {
      if (formationSelected.includes(formation.name)) {
        return formation.id;
      } else {
      }
    });

    const formationsIds = formationsIdsfirst.filter((e) => e);

    try {
      setSpinner(true);
      const res = await axios.post("poles", { name, type, formationsIds });
      setSpinner(false);
      toast.success("Pole a été crée");
    } catch (error) {
      setSpinner(false);
      toast.error("Something went wrong! please try again");
    }
  };

  return (
    <div className={classes.container}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
      />
      <form onSubmit={onSubmit}>
        <TextField
          id="pole-name-add"
          defaultValue=""
          label="Nom de pole"
          variant="standard"
          required
        />
        <FormControl>
          <InputLabel id="pole-type">Master/Licence</InputLabel>
          <Select
            required
            labelId="pole-type"
            label="Master/Licence"
            variant="standard"
            defaultValue=""
            onChange={handleTypeChange}
          >
            <MenuItem value="licence">Licence</MenuItem>
            <MenuItem value="master">Master</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: "100%" }}>
          <InputLabel id="pole-add-formations">Formations</InputLabel>
          <Select
            required
            labelId="pole-add-formations"
            id="demo-multiple-chip"
            multiple
            value={formationSelected}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            // MenuProps={MenuProps}
          >
            {formations.map((formation) => (
              <MenuItem key={formation.id} value={formation.name}>
                {formation.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "Center" }}
        >
          {spinner ? (
            <CircularProgress />
          ) : (
            <Button style={{ width: "100%" }} type="submit" variant="contained">
              Ajouter
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Add;
