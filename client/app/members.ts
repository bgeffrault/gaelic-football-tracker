interface membersinfos {
  id: number;
  firstName: string;
  lastName: string;
  points: number;
  pourcentage: number;
}

const members: membersinfos[] = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    points: 12,
    pourcentage: 80,
  },
  {
    id: 2,
    firstName: "Morice",
    lastName: "kline",
    points: 16,
    pourcentage: 70,
  },
  {
    id: 4,
    firstName: "john",
    lastName: "uud",
    points: 10,
    pourcentage: 50,
  },
  {
    id: 5,
    firstName: "Jeanne",
    lastName: "verger",
    points: 19,
    pourcentage: 90,
  },
];

export default members;
