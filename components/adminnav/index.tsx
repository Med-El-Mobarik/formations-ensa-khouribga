import classes from "./index.module.scss";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";

// import { signOut } from "next-auth/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const NavigationBar = () => {
  const router = useRouter();

  const logOutHandler = async () => {
    await signOut({ redirect: false });
    router.push("/admin");
  };

  return (
    <div className={classes.navcontainer}>
      <nav>
        <Link href="/">
          <img src="/img/ensakh.png" alt="ensa-logo"></img>
        </Link>
        <ul>
          <Link href="/admin/formations">
            <li>Formations</li>
          </Link>
          <Link href="/admin/poles">
            <li>Poles</li>
          </Link>
          <Link href="/admin/inscriptions">
            <li>Inscriptions</li>
          </Link>
          <li>Contact</li>
        </ul>
        <div
          onClick={logOutHandler}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            color: "#fff",
            cursor: "pointer",
            paddingBottom: "10px",
          }}
        >
          <LogoutIcon />
          Logout
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
