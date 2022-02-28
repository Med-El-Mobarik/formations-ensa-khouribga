import { useState } from "react";
import Nav from "../../adminnav";
import Inscription from "../../../interfaces/inscription";
import classes from "./index.module.scss";
import axios from "../../../axios/axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const Inscriptions = (props: { inscs: Inscription[] }) => {
  const { inscs } = props;

  const [inscriptions, setInscriptions] = useState(inscs);
  const [open, setOpen] = useState(false);
  const [delElem, setDelElem] = useState<number>();
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreItem, setMoreItem] = useState<Inscription>();
  const [spinner, setSpinner] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleMoreClickOpen = () => {
    setMoreOpen(true);
  };
  const handleMoreClose = () => {
    setMoreOpen(false);
  };

  const deleteInscription = async (id: number | undefined) => {
    try {
      setSpinner(true);
      await axios.delete(`inscription?id=${id}`);
      setSpinner(false);
      handleClose();
      location.reload();
    } catch (error) {
      setSpinner(false);
      toast.error("We can't delete this now. try again later!");
    }
  };

  const sortByNew = () => {
    setInscriptions((prev) => {
      const test = [...prev];
      test.sort(
        (a, b) =>
          new Date(b.deposition).getTime() - new Date(a.deposition).getTime()
      );
      return test;
    });
  };
  const sortByOld = () => {
    setInscriptions((prev) => {
      const test = [...prev];
      test.sort(
        (a, b) =>
          new Date(a.deposition).getTime() - new Date(b.deposition).getTime()
      );
      return test;
    });
  };
  return (
    <>
      <Nav />
      <div className={classes.container}>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            marginBottom: "5px",
          }}
        >
          <button onClick={sortByNew} className={classes.sort}>
            Newest
          </button>
          <button onClick={sortByOld} className={classes.sort}>
            Oldest
          </button>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
        />
        <Dialog
          open={moreOpen}
          onClose={handleMoreClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: "#e67e22" }}>Spécialité</span> :{" "}
              {moreItem?.specialite}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: "#e67e22" }}>Etablissment</span> :{" "}
              {moreItem?.etablissment}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: "#e67e22" }}>Mention</span> :{" "}
              {moreItem?.mention}
            </div>
            <div>
              <span style={{ color: "#e67e22" }}>Address</span> :{" "}
              {moreItem?.adresse}
            </div>
          </div>
        </Dialog>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vous êtes sure vous voulez supprimer cette demande
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {spinner ? (
              <CircularProgress style={{ color: "tomato" }} />
            ) : (
              <Button
                onClick={() => deleteInscription(delElem)}
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
        <TableContainer
          component={Paper}
          style={{
            width: "100%",
            borderRadius: "5px",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#3498db" }}>
              <TableRow>
                <TableCell style={{ color: "#fff" }}>Name</TableCell>
                <TableCell style={{ color: "#fff" }}>Enregitré à</TableCell>
                <TableCell style={{ color: "#fff" }}>Formation</TableCell>
                <TableCell style={{ color: "#fff" }}>Diplome</TableCell>
                <TableCell style={{ color: "#fff" }}>Email</TableCell>
                <TableCell style={{ color: "#fff" }}>Phone</TableCell>
                <TableCell style={{ color: "#fff" }}>CIN</TableCell>
                <TableCell style={{ color: "#fff" }}>Site</TableCell>
                <TableCell style={{ color: "#fff" }}>
                  Date de naissance
                </TableCell>
                <TableCell style={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inscriptions.map((inscription) => (
                <TableRow
                  key={inscription.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${inscription.nom} ${inscription.prenom}`}
                  </TableCell>
                  <TableCell>{inscription.deposition?.split("T")[0]}</TableCell>
                  <TableCell>{inscription.formation}</TableCell>
                  <TableCell>{inscription.diplome}</TableCell>
                  <TableCell>{inscription.email}</TableCell>
                  <TableCell>{inscription.phone}</TableCell>
                  <TableCell>{inscription.cin}</TableCell>
                  <TableCell>{inscription.site}</TableCell>
                  <TableCell>
                    {inscription.date_naissance.split("T")[0]}
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      onClick={() => {
                        setDelElem(inscription.id);
                        handleClickOpen();
                      }}
                      style={{ color: "tomato", cursor: "pointer" }}
                    />
                    <MoreHorizIcon
                      style={{ color: "#555", cursor: "pointer" }}
                      onClick={() => {
                        setMoreItem(inscription);
                        handleMoreClickOpen();
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Inscriptions;
