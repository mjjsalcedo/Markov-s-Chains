import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendInvite, acceptInvite, declineInvite, broadcastUsers } from '../../actions';
import { Link } from 'react-router-dom';


class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: ''
    }

    this.selectUser = this.selectUser.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
    this.onClickAccept = this.onClickAccept.bind(this);
    this.onClickDecline = this.onClickDecline.bind(this);
  }

  selectUser(username){
    return () => { // onClick handler
      this.setState({
        player : username
      });
    }
  }

  sendInvite(){
    this.props.sendInvite( this.state.player );
  }

  onClickAccept(){
    this.props.acceptInvite( this.props.invitesFrom );
  }

  onClickDecline(){
    this.props.declineInvite( this.props.invitesFrom );
  }

  componentWillMount() {
    this.props.broadcastUsers();
  }

  render() {
if(this.props.goToRoom){
      this.props.history.push('/room');
    }
    return (
      <div className="userlistContainer">
      {this.props.username.filter(userData => {
        return userData.username === localStorage.getItem("username")}).map(username => {
          return <span>{username.username}</span> })}

      <h2> Current Users </h2>
       <div className="userlist">
      {this.props.username.filter(userData => {
        return userData.username !== localStorage.getItem("username")}).map(username => {
          return <span onClick={this.selectUser(username)}>{username.username}</span> })}
      </div>

      <button onClick={this.sendInvite} type="button">Invite to Game</button>

      {
            ( this.props.invitesFrom !== undefined ) ?
              <div>
                <p>
                  You were invited to play a game with { this.props.invitesFrom }
                </p>
                <button onClick={this.onClickAccept} type="button">Accept</button>
                <button onClick={this.onClickDecline} type="button">DECLINE</button>
              </div>
            : null
          }
      <Link to='/playerOne'> PLAYER ONE</Link>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  console.log('testselect', state)
  return {
    username: state.userData,
    invitesFrom : state.invitesFrom,
    goToRoom : state.goToRoom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    broadcastUsers: (player) =>{

    },
    sendInvite: (player) => {
      dispatch(sendInvite(player))
    },
    acceptInvite: invitesFrom => {
      dispatch(acceptInvite(invitesFrom))
    },
    declineInvite: invitesFrom => {
      dispatch(declineInvite(invitesFrom))
    }
  }
}


UserList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(UserList)

  export default UserList;