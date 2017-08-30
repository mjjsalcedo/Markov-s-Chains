import React from 'react'

class Replay extends React.Component {

 /* componentDidMount(){
    this.props.submitText({ ...this.state});
  }
*/
  render() {
    return (
      <div>
        {this.props.texts.map(text => (
          <Text key={text.id} {...text} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
submitText: (text) => {
      dispatch(getText(text));
    }
  }
}

Replay = connect(
  mapStateToProps,
  mapDispatchToProps
)(Replay)

export default Replay