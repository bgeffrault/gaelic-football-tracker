import Cards from "./components/Cards";
import Header from "./components/molecules/Header";
import Link from "next/link";

import team from "./data/team";
const data = team;

export default function Home() {
  return (
    <>
      <Header name="Home" backHome="backHome" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link style={{ textDecoration: "none", color: "#000" }} href="/members">
          Découvrez les membres de l'équipe !
        </Link>
      </div>

      <div style={{ padding: "30px" }}>
        <h3
          style={{ backgroundColor: "rgb(209, 130, 73)", marginBottom: "10px" }}
        >
          In Progress
        </h3>
        {data
          .filter((inProgress) => inProgress.match === "In progress")
          .map((inProgress) => (
            <Cards
              key={inProgress.id}
              firstTeam={inProgress.firstTeam}
              secondTeam={inProgress.secondTeam}
              progress={inProgress.progress}
              matchIsProgress={true}
            />
          ))}
      </div>
      <div style={{ padding: "30px" }}>
        <h3
          style={{ backgroundColor: "rgb(209, 130, 73)", marginBottom: "10px" }}
        >
          Last Games
        </h3>
        {data
          .filter((lastGames) => lastGames.match === "Last Games")
          .map((lastGames) => (
            <Cards
              firstTeam={lastGames.firstTeam}
              secondTeam={lastGames.secondTeam}
              progress={lastGames.progress}
              matchIsProgress={false}
            />
          ))}
      </div>
    </>
  );
}
