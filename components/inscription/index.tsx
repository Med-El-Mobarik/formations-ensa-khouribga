import { useState, useEffect } from "react";
import Formations from "../../interfaces/formations";
import Inscription from "../../interfaces/inscription";
import classes from "./index.module.scss";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../axios/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

import { useForm, SubmitHandler } from "react-hook-form";

const sites = ["KHOURIBGA", "MARRAKECH", "CASABLANCA"];
const niveaux = [
  {
    name: "Bac +2",
    data: ["DTS", "DEUG", "DUT", "BTS", "Autre (Bac +2)"],
  },
  {
    name: "Bac +3",
    data: ["Licence Fondamentale", "Licence Professionelle", "Autre (Bac +3)"],
  },
  {
    name: "Bac +4",
    data: ["Licence (Ancien régim)", "Maitrise", "Autre (Bac +4)"],
  },
  {
    name: "Bac +5",
    data: ["Master", "MBA", "DEA", "DESS", "Doctorat", "Autre (Bac +5)"],
  },
];

const Insc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inscription>();

  const [formations, setFormations] = useState<Formations[]>([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const getFormations = async () => {
      try {
        const res = await axios.get("formations/getAllFormations");
        setFormations(res.data);
      } catch (error: any) {
        console.log(error.message);
        alert("Can't get Formations!");
      }
    };

    getFormations();
  }, []);

  const onSubmit: SubmitHandler<Inscription> = async (data) => {
    try {
      setSpinner(true);
      const res = await axios.post("inscription", data);
      console.log(res.data);
      // alert("Inscription a été enregistré");
      toast.success("Votre inscription a été bien enregitré", {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: false,
        draggable: false,
        autoClose: 10000,
      });
      setSpinner(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong please try again", {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: false,
        draggable: false,
        autoClose: 10000,
      });
      setTimeout(() => {
        location.reload();
      }, 5000);
    }
    setSpinner(false);
  };

  return (
    <>
      <div className={classes.container}>
        <ToastContainer />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate__animated animate__fadeInUp animate__slow"
        >
          <h2>
            Inscrivez vous dès maintenant, le nombre de places est limité !!
          </h2>
          <div>
            <TextField
              fullWidth
              defaultValue=""
              label="Nom"
              variant="standard"
              {...register("nom", { required: true })}
            />
            {errors.nom && (
              <span style={{ color: "tomato", fontSize: 12 }}>
                Ajouter votre nom
              </span>
            )}
          </div>
          <div>
            <TextField
              fullWidth
              defaultValue=""
              label="Prénom"
              variant="standard"
              {...register("prenom", { required: true })}
            />
            {errors.prenom && (
              <span style={{ color: "tomato", fontSize: 12 }}>
                Ajouter votre prenom
              </span>
            )}
          </div>
          <div>
            <TextField
              fullWidth
              defaultValue=""
              label="Email"
              variant="standard"
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email invalide",
                },
              })}
            />
            {errors.email && (
              <span style={{ color: "tomato", fontSize: 12 }}>
                Email invalide
              </span>
            )}
          </div>
          <div>
            <TextField
              fullWidth
              defaultValue=""
              label="Téléphone (ex: 0610...14)"
              variant="standard"
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^[0-9]{10}$/g,
                  message: "Numero invalide",
                },
              })}
            />
            {errors.phone && (
              <span style={{ color: "tomato", fontSize: 12 }}>
                Numero invalide
              </span>
            )}
          </div>
          <div>
            <TextField
              fullWidth
              defaultValue=""
              label="CIN"
              variant="standard"
              {...register("cin", { required: true })}
            />
            {errors.cin && (
              <span style={{ color: "tomato", fontSize: 12 }}>Ajouter CIN</span>
            )}
          </div>
          <div>
            <TextField
              fullWidth
              type="date"
              label="Date De Naissance"
              variant="standard"
              defaultValue="2000-01-01"
              {...register("date_naissance", { required: true })}
            />
            {errors.date_naissance && (
              <span style={{ color: "tomato", fontSize: 12 }}>
                Ajouter date de naissance
              </span>
            )}
          </div>
          {/* <div> */}
          <FormControl>
            <InputLabel id="site-id">Site de la formation</InputLabel>
            <Select
              labelId="site-id"
              label="Site"
              variant="standard"
              {...register("site", { required: true })}
              defaultValue=""
            >
              {sites.map((site, id) => (
                <MenuItem key={id} value={site}>
                  {site}
                </MenuItem>
              ))}
            </Select>
            {errors.site && (
              <span style={{ color: "tomato", fontSize: 12 }}>
                Ajouter un site
              </span>
            )}
          </FormControl>
          {/* </div> */}
          <FormControl>
            <InputLabel id="forma-id">Formation souhaitée</InputLabel>
            <Select
              labelId="forma-id"
              label="Formation souhaitée"
              variant="standard"
              {...register("formation", { required: true })}
              defaultValue=""
            >
              <ListSubheader>Licence</ListSubheader>
              {formations.length == 0 && (
                <MenuItem value="">
                  <CircularProgress />
                </MenuItem>
              )}
              {formations
                .filter((formation) => formation.type === "licence")
                .map((formation, id) => (
                  <MenuItem key={id} value={formation.name}>
                    {formation.name}
                  </MenuItem>
                ))}
              <ListSubheader>Master</ListSubheader>
              {formations.length == 0 && (
                <MenuItem value="">
                  <CircularProgress />
                </MenuItem>
              )}
              {formations
                .filter((formation) => formation.type === "master")
                .map((formation, id) => (
                  <MenuItem key={id} value={formation.name}>
                    {formation.name}
                  </MenuItem>
                ))}
            </Select>
            {errors.formation && (
              <span style={{ color: "tomato", fontSize: 12 }}>
                Ajouter une formation
              </span>
            )}
          </FormControl>
          <FormControl>
            <InputLabel id="diplome-id">Votre dernier diplôme</InputLabel>
            <Select
              labelId="diplome-id"
              label="Votre dernier diplôme"
              variant="standard"
              {...register("diplome", { required: true })}
              defaultValue=""
            >
              <ListSubheader>BAC +2</ListSubheader>
              {niveaux
                .find((niv) => niv.name === "Bac +2")
                ?.data.map((niveau, id) => (
                  <MenuItem key={id} value={niveau}>
                    {niveau}
                  </MenuItem>
                ))}
              <ListSubheader>BAC +3</ListSubheader>
              {niveaux
                .find((niv) => niv.name === "Bac +3")
                ?.data.map((niveau, id) => (
                  <MenuItem key={id} value={niveau}>
                    {niveau}
                  </MenuItem>
                ))}
              <ListSubheader>BAC +4</ListSubheader>
              {niveaux
                .find((niv) => niv.name === "Bac +4")
                ?.data.map((niveau, id) => (
                  <MenuItem key={id} value={niveau}>
                    {niveau}
                  </MenuItem>
                ))}
              <ListSubheader>BAC +5 Et Plus</ListSubheader>
              {niveaux
                .find((niv) => niv.name === "Bac +5")
                ?.data.map((niveau, id) => (
                  <MenuItem key={id} value={niveau}>
                    {niveau}
                  </MenuItem>
                ))}
            </Select>
            {errors.diplome && (
              <span style={{ color: "tomato", fontSize: 12 }}>
                Ajouter un diplome
              </span>
            )}
          </FormControl>
          <TextField
            {...register("specialite")}
            label="Spécialité"
            variant="standard"
            defaultValue=""
          />
          <TextField
            {...register("etablissment")}
            label="Votre Etablissement"
            variant="standard"
            defaultValue=""
          />
          <TextField
            {...register("mention")}
            label="Mention"
            variant="standard"
            defaultValue=""
          />
          <TextField
            className={classes.adresse}
            label="Adresse"
            variant="standard"
            {...register("adresse")}
            defaultValue=""
          />
          <div className={classes.submitarea}>
            {spinner ? (
              <CircularProgress style={{ color: "#c31432" }} />
            ) : (
              <button>S&apos;inscrire</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Insc;
