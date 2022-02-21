import { useState } from "react";
import AdminNav from "../../adminnav";
import Formation from "../../../interfaces/formations";
import Pole from "../../../interfaces/pole";
import classes from "./index.module.scss";
import Link from "next/link";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface Del {
  id: number;
  contenue: string;
}

const Formations = (props: {
  formations: Formation[];
  poles: Pole[];
  session: {
    user: {
      name: string;
    };
  };
}) => {
  const { formations, session, poles } = props;

  const [open, setOpen] = useState(false);
  const [delElem, setDelElem] = useState<Del>();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AdminNav />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous êtes sure vous voulez supprimer {delElem?.contenue}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => console.log(delElem?.id)}
            style={{ backgroundColor: "tomato", color: "#fff" }}
          >
            Supprimer
          </Button>
          <Button style={{ color: "#555" }} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.container}>
        <h1>Bienvenue {session.user.name}</h1>
        <TableContainer
          component={Paper}
          style={{
            width: "70%",
            borderRadius: "5px",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#3498db" }}>
              <TableRow>
                <TableCell style={{ color: "#fff" }}>Formation</TableCell>
                <TableCell style={{ color: "#fff" }}>Type</TableCell>
                <TableCell style={{ color: "#fff" }}>Pole</TableCell>
                <TableCell style={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formations.map((formation) => (
                <TableRow
                  key={formation.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {formation.name}
                  </TableCell>
                  <TableCell>{formation.type}</TableCell>
                  <TableCell>
                    {poles.find((pole) => pole.id === formation.pole)?.name}
                  </TableCell>
                  <TableCell>
                    <EditIcon style={{ color: "#3498db", cursor: "pointer" }} />{" "}
                    <DeleteIcon
                      onClick={() => {
                        setDelElem({
                          id: formation.id,
                          contenue: formation.name,
                        });
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
        <Link href="/admin/formations/add">
          <button className={classes.btn}>Ajouter formation</button>
        </Link>
      </div>
    </>
  );
};

export default Formations;
