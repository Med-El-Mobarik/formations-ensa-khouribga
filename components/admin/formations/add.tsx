import { useState } from "react";
import classes from "./add.module.scss";
import AdminNav from "../../adminnav";
import Pole from "../../../interfaces/pole";
import Formation from "../../../interfaces/fullFormation";

import { useRouter } from "next/router";

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

const Add = (props: { poles: Pole[] }) => {
  const router = useRouter();

  const [spinner, setSpinner] = useState(false);

  const { register, handleSubmit } = useForm<Formation>();

  const onSubmit: SubmitHandler<Formation> = async (data) => {
    if (data.image) {
      if (data.image[0].type !== "image/png") {
        toast.error("Image doit etre en format png");
      } else {
        try {
          setSpinner(true);

          const form = new FormData();

          form.append("type", data.type);
          form.append("name", data.name);
          form.append("pole", `${data.pole}`);
          form.append("objectif", data.objectif);
          form.append("frais_formation", data.frais_formation);
          form.append("frais_entretien", data.frais_entretien);
          form.append("admission", data.admission);
          form.append("domaine", data.domaine);
          form.append("type_formation", data.type_formation),
            form.append("duree", data.duree);
          form.append("organisation", data.organisation);
          form.append("deposition", data.deposition);
          form.append("entretien", data.entretien);
          form.append("debouches", data.debouches);
          form.append("file", data.image[0]);

          const res = await axios.post("formation", form);
          //   toast.success("Formation est ajoutée");
          //   console.log(res.data);

          router.push(
            `/admin/formations/add/modules?id=${res.data.result.insertId}&type=${data.type}`
          );

          setSpinner(false);
        } catch (error: any) {
          setSpinner(false);
          toast.error("Erreur se serve est servenue");
          console.log(error.response);
        }
      }
    }
  };

  const { poles } = props;
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
          <div>
            <label style={{ color: "#555" }} htmlFor="form-img">
              Choisir une image
            </label>
            <input
              id="form-img"
              type="file"
              accept="image/png"
              {...register("image", { required: true })}
            />
          </div>
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

export default Add;
