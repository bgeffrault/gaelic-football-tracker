import Cards from "./components/Cards";
import Header from "./components/molecules/Header";

export default function Home() {
  return (
    <>
      <Header name="Home" />
      <Cards
        title="In progress"
        firstTeam="Rennes A"
        secondTeam="Nantes A"
        test={true}
      />
      <Cards
        title="Last Games"
        firstTeam="Rennes A"
        secondTeam="Nantes A"
        test={false}
      />
    </>
  );
}
