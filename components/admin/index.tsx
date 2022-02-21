import { useState } from "react";

import classes from "./index.module.scss";
import "animate.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";

import { signIn, SignInResponse } from "next-auth/client";

interface Data {
  username: string;
  password: string;
}

const Admin = () => {
  const [spinner, setSpinner] = useState(false);

  const router = useRouter();

  const { register, handleSubmit } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = async (data) => {
    try {
      setSpinner(true);
      const result: SignInResponse | undefined = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });

      if (result?.error) {
        setSpinner(false);
        toast.error("invalid username or password");
      } else {
        router.push("/admin/formations");
      }
    } catch (error: any) {
      console.log(error.response);
      toast.error("Check your credentials!");
    }
  };

  return (
    <div onSubmit={handleSubmit(onSubmit)} className={classes.container}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
      />
      <form className="animate__animated animate__fadeInUp animate__slow">
        <TextField
          className={classes.text}
          fullWidth
          defaultValue=""
          label="username"
          variant="standard"
          {...register("username", { required: true })}
        />
        <TextField
          className={classes.text}
          type="password"
          fullWidth
          defaultValue=""
          label="password"
          variant="standard"
          {...register("password", { required: true })}
        />
        {spinner ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button
            style={{ marginTop: "15px" }}
            type="submit"
            variant="contained"
            fullWidth
            color="secondary"
          >
            Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default Admin;
