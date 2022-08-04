import { useState, useEffect } from "react";
import classes from "./add.module.scss";
import AdminNav from "../../adminnav";
import Pole from "../../../interfaces/pole";
import Formation from "../../../interfaces/fullFormation";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../../axios/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm, SubmitHandler } from "react-hook-form";

const Edit = (props: { poles: Pole[]; formation: Formation }) => {
  const { poles, formation } = props;
  const [spinner, setSpinner] = useState(false);
  const { register, handleSubmit, reset } = useForm<Formation>();

  useEffect(() => {
    reset({
      type: formation.type,
      name: formation.name,
      pole: formation.pole,
      type_formation: formation.type_formation,
      frais_formation: formation.frais_formation,
      frais_entretien: formation.frais_entretien,
      objectif: formation.objectif,
      admission: formation.admission,
      domaine: formation.domaine,
      duree: formation.duree,
      organisation: formation.organisation,
      deposition: formation.deposition,
      entretien: formation.entretien,
      debouches: formation.debouches,
    });
  }, [reset, formation]);

  const onSubmit: SubmitHandler<Formation> = async (data) => {
    try {
      setSpinner(true);
      await axios.put("formation", { ...data, id: formation.id });
      setSpinner(false);
      toast.success("La formation a été bien modifié");
    } catch (error: any) {
      setSpinner(false);
      toast.error("Erreur de serve est servenue");
      console.log(error);
    }
  };
  return (
    <>
      <AdminNav />
      <div className={classes.container}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <InputLabel id="form-name">License/Master</InputLabel>
            <Select
              labelId="form-name"
              label="License/Master"
              variant="standard"
              {...register("type", { required: true })}
              defaultValue=""
            >
              <MenuItem value="licence">License</MenuItem>
              <MenuItem value="master">Master</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            defaultValue=""
            label="Nom de formation"
            variant="standard"
            {...register("name", { required: true })}
          />
          <FormControl>
            <InputLabel id="form-pole">Pole</InputLabel>
            <Select
              labelId="form-pole"
              label="Pole"
              variant="standard"
              {...register("pole", { required: true })}
              defaultValue=""
            >
              {poles
                .filter((e) => e.id !== 0)
                .map((pole) => (
                  <MenuItem key={pole.id} value={pole.id}>
                    {pole.name} ({pole.type})
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            defaultValue=""
            label="Type de formation (Formation professionnelle..)"
            variant="standard"
            {...register("type_formation", { required: true })}
          />
          <TextField
            fullWidth
            defaultValue=""
            label="Frais de formation (ex: 20 000 Dh)"
            variant="standard"
            {...register("frais_formation", { required: true })}
          />
          <TextField
            fullWidth
            defaultValue=""
            label="Frais d'entretien (ex: 600 Dh)"
            variant="standard"
            {...register("frais_entretien", { required: true })}
          />

          <TextField
            className={classes.full}
            fullWidth
            defaultValue=""
            label="Objectif de formation"
            variant="standard"
            {...register("objectif", { required: true })}
          />
          <TextField
            className={classes.full}
            fullWidth
            defaultValue=""
            label="Conditions d'admission"
            variant="standard"
            {...register("admission", { required: true })}
          />
          <TextField
            fullWidth
            defaultValue=""
            label="Domaine"
            variant="standard"
            {...register("domaine", { required: true })}
          />
          <TextField
            fullWidth
            defaultValue=""
            label="Durée (ex: 12 Mois)"
            variant="standard"
            {...register("duree", { required: true })}
          />
          <TextField
            className={classes.full}
            fullWidth
            defaultValue=""
            label="Organisation (ex: Samedi et dimanche : Du ... au ...)"
            variant="standard"
            {...register("organisation", { required: true })}
          />
          <TextField
            className={classes.full}
            fullWidth
            defaultValue=""
            label="Deposition (ex: avant le ... : dépot du dossier de candidat...)"
            variant="standard"
            {...register("deposition", { required: true })}
          />
          <TextField
            className={classes.full}
            fullWidth
            defaultValue=""
            label="Entretien (ex: du ... au ... : Entretien de sélection)"
            variant="standard"
            {...register("entretien", { required: true })}
          />
          <TextField
            className={classes.full}
            fullWidth
            defaultValue=""
            label="Débouchés (Separés par ,, ex: débouché 1,,débouché 2,,...)"
            variant="standard"
            {...register("debouches", { required: true })}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {spinner ? <CircularProgress /> : <button>Modifier</button>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
