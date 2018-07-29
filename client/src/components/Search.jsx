import React from "react";
import ReactDOM from "react-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    }
  }

  render(){
    return (<div id="search">
      <div className="search-bar form-inline">
        <img id="logo" src="./LogoMakr_0AUnh0.png"></img>
        <input id="searchInput" className="form-control" type="text" defaultValue="search gamer..."
          onFocus={(e) => {e.target.value=""}} onChange={(e) => {this.state.query=e.target.value}}/>
        <button className="btn hidden-sm-down" onClick={() => {
          this.props.handleSearch(this.state.query);
          document.getElementById("searchInput").value = "search gamer...";
          this.state.query = null;
        }}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    </div>);
  }
}

export default Search;
