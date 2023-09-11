interface TeamScore {
  name: string;
  score: number;
}
interface TeamTest {
  id: number;
  firstTeam?: TeamScore;
  secondTeam?: TeamScore;
  progress: string;
}

const team: TeamTest[] = [
  {
    id: 1,
    firstTeam: {
      name: "Rennes",
      score: 4,
    },
    secondTeam: {
      name: "Nantes",
      score: 4,
    },
    progress: "Accuracy: 60%",
  },
  {
    id: 2,
    firstTeam: {
      name: "Bordeaux",
      score: 2,
    },
    secondTeam: {
      name: "Toulouse",
      score: 8,
    },
    progress: "Accuracy: 30%",
  },
  {
    id: 1,
    firstTeam: {
      name: "Paris",
      score: 7,
    },
    secondTeam: {
      name: "Lyon",
      score: 4,
    },
    progress: "Accuracy: 80%",
  },
];

export default team;
