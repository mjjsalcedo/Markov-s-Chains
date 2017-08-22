import React from 'react'
import { connect } from 'react-redux'
import Text from './Text'

class GetText extends React.Component {

  fetchTasks(url) {
     fetch(url)
       .then(tasks => tasks.json())
       .then(tasks => {
         console.log('response',tasks);
         return tasks.json;
       });
   }
   componentDidMount(){
     this.fetchTasks('/api/text');
   }

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
  return {
    texts: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

GetText = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetText)

export default GetText