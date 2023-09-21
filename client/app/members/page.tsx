"use client";
import { useEffect, useState } from "react";
import Header from "../components/molecules/Header";
import MembersShootsList from "../components/MembersShootsList";
import supabase, { Tables } from "../config/supabaseClient";
import { List } from "@mui/material";

const MembersShoots = () => {
  const [fetchError, setFetchError] = useState<string | null>("");
  const [shoots, setShoots] = useState<Tables<"Shoots">[] | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data: shoots, error } = await supabase
        .from("Shoots")
        .select("*, Members(*)");

      if (error) {
        setFetchError("Could not fetch the members");
        setShoots(null);
        console.log(error);
      }
      if (shoots) {
        setShoots(shoots);
        setFetchError(null);
      }
    };
    fetchMembers();
  }, []);

  return (
    <>
      <Header name="Membres" backHome="" />
      <div>
        {fetchError && <p>{fetchError} </p>}
        <div></div>
      </div>

      <List
        sx={{
          margin: "50px",
          padding: 0,
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        {shoots?.map((shoot) => (
          <MembersShootsList
            key={shoot.id}
            shoot={shoot}
            members={shoot.Members}
          />
        ))}
      </List>
    </>
  );
};

export default MembersShoots;
