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
      channelExists: true
    };
    //FIX -- Handle Mismatched twitch and in-game name Tfue -> Not Tfue
    axios.get('/stats',{
      params: {gamer: "Not Tfue"}
    })
    .then(res => console.log(res.data));
    //FIX
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
      console.log(res.data);
      this.state.twitchPlayer.setChannel(query);
      this.setState({
        videos: res.data.videos,
        gamer: query,
        channelExists: true
      });
    })
    .catch((err) => {
      this.setState({
        channelExists: false
      })
    });
  }

  changeVideo(video){
    console.log(video);
    this.state.twitchPlayer.setVideo(video._id);
  }

  componentDidMount(){
    this.createPlayer();
    this.handleSearch('Tfue');
  }

  render() {
    return (<div id="main">
      <div id="left">
        <Search handleSearch={this.handleSearch.bind(this)}/>
        {!this.state.channelExists
          ? <div id="notFound">Twitch channel not found</div>
          : null}
        <div id="twitchPlayer"></div>
        <Stats gamer={this.state.gamer}/>
      </div>
      {this.state.videos.length !== 0
        ? <VideoList videos={this.state.videos} changeVideo={this.changeVideo.bind(this)}/>
        : <div id="noVids">No videos yet</div>}


    </div>);
  }
}

//curl -H 'Client-ID: XXX' -X GET 'https://api.twitch.tv/kraken/videos/top?game=Fortnite&limit=100' top vids
//'https://api.twitch.tv/helix/streams?game_id=33214' most active streams



ReactDOM.render(<App/>, document.getElementById('app'));
