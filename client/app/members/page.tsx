"use client";
import { useEffect, useState } from "react";
import Header from "../components/molecules/Header";
import MembersList from "../components/MembersList";

import { List } from "@mui/material";

import supabase, { Tables } from "../config/supabaseClient";

const Members = () => {
  const [fetchError, setFetchError] = useState<string | null>("");
  const [members, setMembers] = useState<Tables<"Member">[] | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase.from("Member").select();

      if (error) {
        setFetchError("Could not fetch the members");
        setMembers(null);
        console.log(error);
      }
      if (data) {
        setMembers(data);
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
          <MembersList
            firstName={member.firstName}
            lastName={member.lastName}
            categoryId={member.categoryId}
            clubId={member.clubId}
            pseudo={member.pseudo}
          />
        ))}
      </List>
    </>
  );
};

export default Members;
