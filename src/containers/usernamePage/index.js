import React, { Component } from "react";
import { connect } from "react-redux";
import { createUsername, userConnect } from "../../actions";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      id: localStorage.getItem("id")
    };
  }

  handleCreateUsername(e) {
    e.preventDefault();
    this.props.createUsername(this.state);
    this.setState({ username: "" });
    this.props.history.push("/userlist");
  }
  usernameInput(e) {
    this.setState({ username: e.target.value });
  }

  componentDidMount() {
    this.props.userConnect();
  }

  render() {
    return (
      <div className="usernameMainContainer">
        <div className="usernameFormBorder">
          <h1 className="userTitle"> MIRKOV </h1>
          <div className="usernameFormContainer">
            <div className="userMariel" />
            <div className="userIan" />
            <div className="userReyn" />
            <div className="sleeping">z</div>
            <div className="sleeping2">z</div>
            <div className="sleeping3">Z</div>
          </div>
          <input
            className="userChatInput"
            placeholder="input your username"
            value={this.state.username}
            onChange={this.usernameInput.bind(this)}
          />
          <button
            type="submit"
            className="userSendButton btn"
            onClick={this.handleCreateUsername.bind(this)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    createUsername: username => {
      dispatch(createUsername(username));
    },
    userConnect: () => {
      dispatch(userConnect());
    }
  };
};

UserLogin = connect(mapStateToProps, mapDispatchToProps)(UserLogin);

export default UserLogin;
