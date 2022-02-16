import classes from "./index.module.scss";
import Link from "next/link";

const SignButton = () => {
  return (
    <Link href="/inscription">
      <button className={classes.btn}>S&apos;inscrire Maintenant !</button>
    </Link>
  );
};

export default SignButton;
