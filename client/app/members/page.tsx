"use client";
import { useEffect, useState } from "react";
import Header from "../components/molecules/Header";
import MembersShootsList, {
  TableMembersShoots,
} from "../components/MembersShootsList";
import supabase, { Tables } from "../config/supabaseClient";
import { List } from "@mui/material";

const MembersShoots = () => {
  const [fetchError, setFetchError] = useState<string | null>("");
  const [members, setMemmbers] = useState<TableMembersShoots[] | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data: members, error } = await supabase
        .from("Members")
        .select("*, Shoots(*)");

      if (error) {
        setFetchError("Could not fetch the members");
        setMemmbers(null);
        console.log(error);
      }
      if (members) {
        setMemmbers(members as TableMembersShoots[]);
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
        {members?.map((member) => (
          <MembersShootsList key={member.id} members={member} />
        ))}
      </List>
    </>
  );
};

export default MembersShoots;
