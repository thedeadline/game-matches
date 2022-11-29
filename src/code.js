let teamsPlayed = new Set();
let leagueData = {};
let matchDay = 1;

export const processFile = (text) => {
  const lines = text.split("\n"); // each line is a game

  lines.forEach((line) => {
    const teams = line.split(", ");
    const lastIndex1 = teams[0].lastIndexOf(" ");
    const lastIndex2 = teams[1].lastIndexOf(" ");

    const team1 = {
      name: teams[0].slice(0, lastIndex1),
      score: teams[0].slice(lastIndex1 + 1)
    };
    const team2 = {
      name: teams[1].slice(0, lastIndex2),
      score: teams[1].slice(lastIndex2 + 1)
    };
    calcMatchDay(team1, team2);
    calcPoints(team1, team2);
  });
};

export const printMatchDay = () => {
  const sorted = Object.keys(leagueData).sort((a, b) => {
    return leagueData[b] - leagueData[a];
  });
  let text = `Matchday ${matchDay}\n`;
  let count = 0;
  const max = 3; // making this a variable so it can be changed if
  // needed in the future, also so it's more readible and isn't a magic number

  while (count < max) {
    const points = leagueData[sorted[count]];
    text += `${sorted[count]}, ${points} pt${points !== 1 ? "s" : ""}\n`;
    count++;
  }
  console.log(text);
};

export const calcMatchDay = (team1, team2) => {
  if (teamsPlayed.has(team1.name) || teamsPlayed.has(team2.name)) {
    printMatchDay();
    matchDay++;
    teamsPlayed.clear();
  }
  if (!leagueData[team1.name]) {
    leagueData[team1.name] = 0;
  }
  if (!leagueData[team2.name]) {
    leagueData[team2.name] = 0;
  }
  teamsPlayed.add(team1.name);
  teamsPlayed.add(team2.name);
};

export const calcPoints = (team1, team2) => {
  if (team1.score > team2.score) {
    leagueData[team1.name] += 3;
    leagueData[team2.name] += 0;
  } else if (team1.score < team2.score) {
    leagueData[team1.name] += 0;
    leagueData[team2.name] += 3;
  } else {
    // tie
    leagueData[team1.name] += 1;
    leagueData[team2.name] += 1;
  }
};
