import React from 'react'
import { connect } from 'react-redux'
import { addText } from './App/actions'

class AddText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word: ''
    }
  }

  textInput(e) {
    this.setState({ word: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitText({ ...this.state});
    this.setState({
      word: ''
    });

  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit.bind(this)} >
      <div>
      <input id="textInput" placeholder= "message"value={this.state.text} onChange={this.textInput.bind(this)} />

      <button type="submit">Submit</button>
      </div>
      </form>
      </div>
      );
  }
}


const mapStateToProps = (state) => {
  return {
    words: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitText: (word) => {
      dispatch(addText(word));
    }
  }
}

AddText = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AddText);

  export default AddText;