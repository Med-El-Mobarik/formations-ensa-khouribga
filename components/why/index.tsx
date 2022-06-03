import classes from "./index.module.scss";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import { useEffect } from "react";

const index = () => {
  return (
    <section className={classes.section}>
      <h2>WHY US ?</h2>
      <div id="cards" className={classes.content}>
        <div className={classes.card}>
          <div className={classes.front}>
            <PersonIcon style={{ color: "#fff", fontSize: "60px" }} />
            <p>Amazing Teachers</p>
          </div>
          <div className={classes.back}>
            <p>
              Our school provides a lot of qualified teachers with high quality
            </p>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.front}>
            <HelpIcon style={{ color: "#fff", fontSize: "60px" }} />
            <p>Great Support</p>
          </div>
          <div className={classes.back}>
            <p>
              Our community offers a great support in order to keep students in
              track
            </p>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.front}>
            <CastForEducationIcon style={{ color: "#fff", fontSize: "60px" }} />
            <p>Online Courses</p>
          </div>
          <div className={classes.back}>
            <p>
              We Offer plenty of online courses So the students could follow the
              process smoothly
            </p>
          </div>
        </div>
      </div>
      <div className={classes.video}>
        <video src="videos/FC ENSAK.mp4" controls autoPlay muted></video>
      </div>
    </section>
  );
};

export default index;
