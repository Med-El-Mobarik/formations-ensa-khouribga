import { useState } from "react";
import axios from "../../../axios/axios";
import classes from "./index.module.scss";
import NavAdmin from "../../adminnav";
import Pole from "../../../interfaces/pole";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Link from "next/link";

import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Poles = (props: { poles: Pole[] }) => {
  const { poles } = props;
  const [delElem, setDelElem] = useState<number>();
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteFormation = async (id: number | undefined) => {
    try {
      setSpinner(true);
      await axios.delete(`poles?id=${id}`);
      setSpinner(false);
      handleClose();
      location.reload();
    } catch (error) {
      setSpinner(false);
      toast.error("We can't delete this now. try again later!");
    }
  };

  return (
    <>
      <NavAdmin />
      <TableContainer
        component={Paper}
        style={{
          width: "60%",
          margin: "10px auto 0 auto",
          borderRadius: "5px",
        }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vous êtes sure vous voulez supprimer cette pole
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {spinner ? (
              <CircularProgress style={{ color: "tomato" }} />
            ) : (
              <Button
                onClick={() => deleteFormation(delElem)}
                style={{ backgroundColor: "tomato", color: "#fff" }}
              >
                Supprimer
              </Button>
            )}

            <Button style={{ color: "#555" }} onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#3498db" }}>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>Name</TableCell>
              <TableCell style={{ color: "#fff" }}>Type</TableCell>
              <TableCell style={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {poles
              .filter((polee) => polee.id !== 0)
              .map((pole) => (
                <TableRow
                  key={pole.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{pole.name}</TableCell>
                  <TableCell>{pole.type}</TableCell>
                  <TableCell>
                    <DeleteIcon
                      onClick={() => {
                        setDelElem(pole.id);
                        handleClickOpen();
                      }}
                      style={{ color: "tomato", cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Link href="/admin/poles/add">
          <button className={classes.btn}>Ajouter Pole</button>
        </Link>
      </div>
    </>
  );
};

export default Poles;
