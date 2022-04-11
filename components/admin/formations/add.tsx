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
  const url = "https://api.cloudinary.com/v1_1/dvfaacurl/image/upload";
  const router = useRouter();

  const [spinner, setSpinner] = useState(false);

  const { register, handleSubmit } = useForm<Formation>();

  const onSubmit: SubmitHandler<Formation> = async (data) => {
    if (data.image && data.icons) {
      const types = ["image/png", "image/jpeg", "image/jpg"];
      if (
        !types.includes(data.image[0].type) ||
        !types.includes(data.icons[0].type)
      ) {
        toast.error("Images must be jpeg or png");
      } else {
        try {
          setSpinner(true);

          const image = new FormData();
          image.append("file", data.image[0]);
          image.append("upload_preset", "formations");
          image.append("folder", "formations");
          const icons = new FormData();
          icons.append("file", data.icons[0]);
          icons.append("upload_preset", "formations");
          icons.append("folder", "icons");

          const res = await axios.post(url, image);
          // console.log(res.data);
          const res1 = await axios.post(url, icons);
          // console.log(res.data);

          const body = {
            ...data,
            image_name: res.data.public_id,
            icons_name: res1.data.public_id,
            image: "",
            icons: "",
          };

          console.log(body);

          const res2 = await axios.post("formation", body);

          router.push(
            `/admin/formations/add/modules?id=${res2.data.result.insertId}&type=${data.type}`
          );

          setSpinner(false);
        } catch (error: any) {
          setSpinner(false);
          toast.error("Erreur de serve est servenue");
          console.log(error);
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
              Image de la formation
            </label>
            <input
              id="form-img"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              {...register("image", { required: true })}
            />
          </div>
          <div>
            <label style={{ color: "#555" }} htmlFor="form-img">
              Image contient les icons
            </label>
            <input
              id="form-icons"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              {...register("icons", { required: true })}
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
