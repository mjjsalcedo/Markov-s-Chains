import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class UserList extends Component {
  constructor(props) {
    super(props);
    console.log('moo',this.props)
  }
  render() {

    return (
    <div className="userlistContainer">

    {this.props.username.filter(userData => {
      if(userData.username !== localStorage.username)
      return <span>{userData.username}</span> })}

    <h2> Current Users </h2>
       <div className="userlist">

    <Link to='/playerOne'> PLAYER ONE</Link>
          <p className="users"></p>
        </div>
    </div>
      )
  }
}

const mapStateToProps = (state) => {
  console.log('testselect', state.userData)
  return {
    username: state.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
  }


UserList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(UserList)

export default UserList;
