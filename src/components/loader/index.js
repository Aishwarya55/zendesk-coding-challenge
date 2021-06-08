import React, { Component } from "react"
import "./loader.css"
class Loader extends Component {



  render() {
    return <>
      {this.props.showLoader && <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>}
    </>
  }
}

export default Loader