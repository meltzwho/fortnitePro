import React from "react";
import ReactDOM from "react-dom";
import Video from "./Video.jsx";


class VideoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let videoComponents = this.props.videos.map(video => {
      return(<Video video={video} changeVideo={this.props.changeVideo} key={video._id}/>);
    });
    return (<div id="videoList">{videoComponents}</div>);
  }
}

export default VideoList;
