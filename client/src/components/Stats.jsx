import React from "react";
import ReactDOM from "react-dom";

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gamerStats = this.props.gamerStats;
    let gameTypes = [];
    let mapStatToTD = [];
    for(var gameType in gamerStats.group){
      if(gameType === "info") continue;
      gameTypes.push(gameType);
    }
    for(var stat in gamerStats.lifetimeStats){
      if(!/top/.test(stat) && !/time/.test(stat) && !/Min/.test(stat))
      mapStatToTD.push(
        (<tr>
          <td>{stat}</td>
          <td>{gamerStats.group[gameTypes[0]][stat]}</td>
          <td>{gamerStats.group[gameTypes[1]][stat]}</td>
          <td>{gamerStats.group[gameTypes[2]][stat]}</td>
          <td>{gamerStats.lifetimeStats[stat]}</td>
        </tr>)
      );
    }
    return (<div id="stats">
      <h1>{this.props.gamerStats.info.username}</h1>
      <button id="wrongPlayer" className="btn" onClick={
        ()=>this.props.wrongPlayer(this.props.gamerStats.info.username)
      }>
        wrong player?
      </button>
      <table id="statTable">
        <tr>
          <th>Stat</th>
          <th>Solos</th>
          <th>Duos</th>
          <th>Squads</th>
          <th>Overall (current season)</th>
        </tr>
        {mapStatToTD}
      </table>
    </div>);
  }
}

export default Stats;
