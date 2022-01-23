import classes from "./index.module.scss";
import CodeIcon from "@mui/icons-material/Code";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import ComputerIcon from "@mui/icons-material/Computer";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import PaidIcon from "@mui/icons-material/Paid";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

const objectifs = [
  {
    name: "Ingénierie Du Logiciel",
    icon: <CodeIcon className={classes.icon} />,
  },
  {
    name: "Ingénierie Web Et Mobile",
    icon: <DeveloperModeIcon className={classes.icon} />,
  },
  {
    name: "Système Informatique",
    icon: <ComputerIcon className={classes.icon} />,
  },
  {
    name: "Production Indutrielle et Logistique",
    icon: <SwapVerticalCircleIcon className={classes.icon} />,
  },
  {
    name: "Machine learning et Big Data",
    icon: <BubbleChartIcon className={classes.icon} />,
  },
  {
    name: "Ingénierie financère, banque et assurance",
    icon: <PaidIcon className={classes.icon} />,
  },
  {
    name: "Intelligence artificielle et Big Data",
    icon: <SmartToyOutlinedIcon className={classes.icon} />,
  },
];

const index = () => {
  return (
    <section className={classes.section}>
      <h2>Objectifs Généraux</h2>
      <p>
        Pour répondre aux besoins en formations des cadres et des organisations,
        <br />
        les formations continues de l&apos;ENSA Khouribga vous propose des
        formations diplômantes, en :
      </p>
      <div id="objs" className={classes.content}>
        {objectifs.map((e: { name: string; icon: JSX.Element }, id: number) => (
          <div key={id} className={classes.element}>
            {e.icon}
            <p>{e.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default index;
