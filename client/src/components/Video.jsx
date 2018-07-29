import React from "react";
import ReactDOM from "react-dom";

class Video extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (<div id="video" onClick={()=>this.props.changeVideo(this.props.video)}>
      <label id="vidTitle">{this.props.video.title}</label>
      <label id="vidViews">Views: {this.props.video.views}</label>
      <label id="vidStreamed">Streamed: {this.props.video.recorded_at.split('T')[0]}</label>
      <img src={this.props.video.preview}></img>
    </div>);
  }
}

export default Video;
