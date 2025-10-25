interface Path {
  id: string;
  name: string;
  description: string;
  masters: Master[];
}
interface Master {
  id: string;
  name: string;
  description: string;
}

class PathObj {
  public masters: Master[] = [];
  public initialPaths: Path[] = [];
  public selectedPaths: Path[] = [];
  public selectedMasters: Master[] = [];

  constructor() {
    this.masters = [
      {
        id: "0",
        name: "Snoop Dogg",
        description: "Master of the racing games",
      },
      {
        id: "1",
        name: "Putin",
        description: "Master of the strategy games",
      },
      {
        id: "2",
        name: "Trump",
        description: "Master of the MMO games",
      },
    ];

    this.initialPaths = [
      {
        id: "moba",
        name: "Moba",
        description:
          "Team-based strategy games focused on heroes, objectives, and coordination.",
        masters: [this.masters[2]],
      },
      {
        id: "fps",
        name: "Fps / Shooter",
        description:
          "Fast-paced action games centered on aiming, reflexes, and precision shooting.",
        masters: [this.masters[2]],
      },
      {
        id: "mmo",
        name: "Mmo",
        description:
          "Multiplayer online games that involve combat, exploration, and teamwork.",
        masters: [this.masters[2]],
      },
      {
        id: "racing",
        name: "Racing",
        description:
          "Games that focus on driving, racing, and competing against other players.",
        masters: [this.masters[0]],
      },
      {
        id: "strategy",
        name: "Strategy",
        description:
          "Games that emphasize planning, resource management, and tactical decision-making.",
        masters: [this.masters[1]],
      },
    ];

    this.selectedPaths = [];
  }
}

export const pathObj = new PathObj();
