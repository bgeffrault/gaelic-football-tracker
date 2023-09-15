interface TeamScore {
  name: string;
  goalCage: number;
  goalDrop: number;
  score: number;
}
interface Teaminfos {
  id: number;
  firstTeam: TeamScore;
  secondTeam: TeamScore;
  progress: number;
  match: string;
}

const team: Teaminfos[] = [
  {
    id: 1,
    firstTeam: {
      name: "treb",
      goalCage: 2,
      goalDrop: 1,
      score: 7,
    },
    secondTeam: {
      name: "perros",
      goalCage: 3,
      goalDrop: 1,
      score: 10,
    },
    progress: 60,
    match: "In progress",
  },
  {
    id: 2,
    firstTeam: {
      name: "Rennes",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    secondTeam: {
      name: "Nantes",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    progress: 50,
    match: "In progress",
  },
  {
    id: 3,
    firstTeam: {
      name: "Bordeaux",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    secondTeam: {
      name: "Toulouse",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    progress: 30,
    match: "Last Games",
  },
  {
    id: 4,
    firstTeam: {
      name: "Paris",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    secondTeam: {
      name: "Lyon",
      goalCage: 3,
      goalDrop: 1,
      score: 9,
    },
    progress: 60,
    match: "Last Games",
  },
  {
    id: 5,
    firstTeam: {
      name: "Paris",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    secondTeam: {
      name: "Lyon",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    progress: 80,
    match: "Last Games",
  },
  {
    id: 6,
    firstTeam: {
      name: "Paris",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    secondTeam: {
      name: "Lyon",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    progress: 24,
    match: "Last Games",
  },
  {
    id: 7,
    firstTeam: {
      name: "Paris",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    secondTeam: {
      name: "Lyon",
      goalCage: 3,
      goalDrop: 1,
      score: 7,
    },
    progress: 56,
    match: "Last Games",
  },
];

export default team;
