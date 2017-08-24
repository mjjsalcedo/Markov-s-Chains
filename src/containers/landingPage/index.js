import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userConnect } from '../../actions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from '../App/App'

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
    this.props.userConnect();
  }
  render(){
    return(
      <div className="landingPage">This is the landing page
      <Link to="/playerOneGame">Player One</Link>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    userConnect: () => {
      dispatch(userConnect())
    }
  }
}

LandingPage = connect(
  mapStateToProps,
  mapDispatchToProps
  )(LandingPage)

export default LandingPage;