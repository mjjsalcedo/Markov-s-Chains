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
      <div className='userListMainContainer'>
      <div className='userListBorder'>
      <h1 className='userListTitle'> MIRKOV </h1>
      <div className="userListContainer">
      {this.props.username.filter(userData => {
        return userData.username === localStorage.getItem("username")}).map(username => {
          return <span className='currentUser'>Welcome {username.username}</span> })}
       <div className="userList">Friends:
      {this.props.username.filter(userData => {
        return userData.username !== localStorage.getItem("username")}).map(username => {
          return <span className='listOfUsers' onClick={this.selectUser(username)}>{username.username}</span> })}
      </div>

      <button className='inviteUser btn' onClick={this.sendInvite} type="button">Invite to Game</button>

      {
            ( this.props.invitesFrom !== null) ?
              <div className='inviteForm'>
                <p className='inviteText'>
                  You were invited to play a game with { this.props.invitesFrom }
                </p>
                <button className='acceptUser btn' onClick={this.onClickAccept} type="button">Accept</button>
                <button className='declineUser btn' onClick={this.onClickDecline} type="button">Decline</button>
              </div>
            : null
          }
      </div>
      </div>
      <div className='userListMariel'>
        </div>
        <div className='userListIan'>
        </div>
        <div className='userListReyn'>
        Reyn
        </div>
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