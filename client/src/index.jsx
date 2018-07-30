import React from "react";
import ReactDOM from "react-dom";
import Stats from "./components/Stats.jsx";
import Search from "./components/Search.jsx";
import VideoList from "./components/VideoList.jsx";
import axios from "axios";
import config from "../../server/config.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      gamer: null,
      twitchPlayer: null,
      channelExists: true,
      isValidIngame: false,
      gamerStats: null
    };
  }

  createPlayer(options) {
    let twitchPlayer = new Twitch.Player("twitchPlayer");
    this.setState({
      twitchPlayer: twitchPlayer
    });
  }

  handleSearch(query){
    axios.get(`https://api.twitch.tv/kraken/channels/${query}/videos`, {
      headers: {'Client-ID': config.TWITCH},
      params: {broadcast_type: "all",limit:10}
    })
    .then((res) => {
      this.state.twitchPlayer.setChannel(query);
      this.setState({
        videos: res.data.videos,
        gamer: query,
        channelExists: true
      });
    })
    .then(() => {
      this.handleStatSearch(query);
    })
    .catch((err) => {
      this.setState({
        channelExists: false,
        isValidIngame: false
      })
    });
  }

  changeVideo(video){
    console.log(video);
    this.state.twitchPlayer.setVideo(video._id);
  }

  componentDidMount(){
    this.createPlayer();
    this.handleSearch('Ninja');
  }

  handleStatSearch(query){
    axios.get('/stats',{
      params: {gamer: query}
    })
    .then(res => {
      if(res.data === 'NOT FOUND') this.setState({isValidIngame: false});
      else{
        this.setState({isValidIngame: true, gamerStats: res.data});
        axios.post('/db',
          {gamer: this.state.gamer, query: query}
        )
      }
    });
  }

  wrongPlayer(player){
    console.log(player);
  }

  render() {
    return (<div id="main">
      <div id="left">
        <img id="logo" src="./LogoMakr_0AUnh0.png"></img>
        <Search handleSearch={this.handleSearch.bind(this)}/>
        {!this.state.channelExists
          ? <div id="notFound">Twitch channel not found</div>
          : null}
        <div id="twitchPlayer"></div>
        {this.state.isValidIngame
          ? <Stats gamerStats={this.state.gamerStats} wrongPlayer={this.wrongPlayer.bind(this)}/>
          : (<div id="stats">
              <label id="noStats">FORTNITE PLAYER NOT FOUND... <br></br>Twitch channel name may not match in-game name.</label>
              <Search className="statSearch" handleSearch={this.handleStatSearch.bind(this)}/>
            </div>)
        }
      </div>
      {this.state.videos.length !== 0
        ? <VideoList videos={this.state.videos} changeVideo={this.changeVideo.bind(this)}/>
        : <div id="noVids">No videos yet</div>}


    </div>);
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
