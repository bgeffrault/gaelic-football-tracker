import React from "react";
import Header from "../components/molecules/Header";
import MembersList from "../components/MembersList";
import { List } from "@mui/material";

import supabase from "../config/supabaseClient";

import members from "../members";
const membres = members;

const Members = () => {
  return (
    <>
      <Header name="Membres" backHome="" />
      <List
        sx={{
          margin: "50px",
          padding: 0,
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        {membres.map((membersList) => (
          <MembersList
            key={membersList.id}
            firstName={membersList.firstName}
            lastName={membersList.lastName}
            points={membersList.points}
            pourcentage={membersList.pourcentage}
          />
        ))}
      </List>
    </>
  );
};

export default Members;
// import React from "react";
// import Header from "../components/molecules/Header";
// import { List, ListItem, Button, Box } from "@mui/material";

// const Members = () => {
//   return (
//     <>
//       <Header name="Membres" backHome="" />

//       <List
//         sx={{
//           margin: "50px",
//           padding: 0,
//         }}
//       >
//         <ListItem
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             border: "1px solid black",
//             borderRadius: "10px 10px 0 0",
//           }}
//         >
//           <h4>Jean Dupont</h4>
//           <p>16 pts - 80%</p>
//         </ListItem>
//         <ListItem
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             border: "1px solid black",
//           }}
//         >
//           <h4>Jean Dupont</h4>
//           <p>16 pts - 80%</p>
//         </ListItem>
//         <ListItem
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             border: "1px solid black",
//           }}
//         >
//           <h4>Jean Dupont</h4>
//           <p>16 pts - 80%</p>
//         </ListItem>
//         <ListItem
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             border: "1px solid black",
//           }}
//         >
//           <h4>Jean Dupont</h4>
//           <p>16 pts - 80%</p>
//         </ListItem>
//         <ListItem
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             border: "1px solid black",
//             borderRadius: "0 0 10px 10px",
//           }}
//         >
//           <h4>Jean Dupont</h4>
//           <p>16 pts - 80%</p>
//         </ListItem>
//       </List>
//     </>
//   );
// };

// export default Members;
