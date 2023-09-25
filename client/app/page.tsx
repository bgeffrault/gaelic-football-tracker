"use client";
import { useEffect, useState } from "react";
import supabase, { Tables } from "./config/supabaseClient";
import TableScore, { TableScoreGame } from "./components/TableScore";
import Header from "./components/molecules/Header";
import Link from "next/link";

export default function Home() {
  const [fetchError, setFetchError] = useState<string | null>("");
  const [games, setGames] = useState<TableScoreGame[] | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data: games, error } = await supabase
        .from("Game")
        .select("*, TeamGame(*, Team(*))");

      console.log("data: ", games);

      if (error) {
        setFetchError("Could not fetch the members");
        setGames(null);
        console.log(error);
      }
      if (games) {
        setGames(games as TableScoreGame[]);
        setFetchError(null);
      }
    };
    fetchMembers();
  }, []);

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
        {games
          ?.filter((inProgress) => inProgress.gameEnded === false)
          .map((game) => (
            <TableScore key={game.id} game={game} />
          ))}
      </div>
      <div style={{ padding: "30px" }}>
        <h3
          style={{ backgroundColor: "rgb(209, 130, 73)", marginBottom: "10px" }}
        >
          Last Games
        </h3>
        {games
          ?.filter((inProgress) => inProgress.gameEnded === true)
          .map((game) => (
            <TableScore key={game.id} game={game} />
          ))}
      </div>
    </>
  );
}
