import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendInvite, broadcastUsers } from '../../actions';
import { Link } from 'react-router-dom';


class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: ''
    }
  }

  componentWillMount() {
    this.props.broadcastUsers();
  }

  selectUser(e){
    console.log('playerinfo', e.target.value)
    e.preventDefault()
    this.setState({ player: e.target.value})
    this.props.sendInvite(this.state)
    this.setState({ player: '' })
    console.log(this.state);
  }

  render() {

    return (
      <div className="userlistContainer">
      {this.props.username.filter(userData => {
        return userData.username === localStorage.getItem("username")}).map(username => {
          return <span value="cat" onClick={this.selectUser.bind(this)}>{username.username}</span> })}

      <h2> Current Users </h2>
      <div className="userlist">
      {this.props.username.filter(userData => {
        return userData.username !== localStorage.getItem("username")}).map(username => {
          return <span value="cat" onClick={this.selectUser.bind(this)}>{username.username}</span> })}
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
  return {
    sendInvite: (player) => {
      dispatch(sendInvite(player))
    },
    broadcastUsers: (player) =>{

    }
  }
}


UserList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(UserList)

  export default UserList;