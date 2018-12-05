import React from 'react';
import './markdown-previewer.css';
import marked from '../node_modules/marked/marked.min.js';

const defaultMarkdown = '# Welcome to my React Markdown Previewer!\n' +
      '## This is a sub-heading...\n' +
      'You can also make text **bold**... whoa!\n\n' +
      'There\'s also [links](https://www.freecodecamp.com), and\n' +
      '> Block Quotes!\n\n' +
      'Heres some code, `<div></div>`, between 2 backticks.\n\n' +
      '```\n\n' +
      '// this is multi-line code:\n\n' +
      'function anotherExample(firstLine, lastLine) { \n' +
      '  if (firstLine == \'```\' && lastLine == \'```\') { \n' +
      '    return multiLineCode; \n' +
      '  } \n' +
      '}' +
      '``` \n' +
      '- And of course there are lists.\n' +
      '  - Some are bulleted.\n' +
      '     - With different indentation levels.\n' +
      '        - That look like this.\n\n' +
      '![React Logo w/ Text](https://goo.gl/Umyytc)';
;


class Previewer extends React.Component {
  render() {
    console.log(this.props.text);
    return(
      <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.props.text)}}></div>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textTyped: defaultMarkdown
    }
  }

  handleChange = (event) => {
    this.setState({
      textTyped: event.target.value
    });
  }

  render() {
    return(
      <div>
        <textarea id="editor" value={this.state.textTyped} onChange={this.handleChange}></textarea>
        <Previewer text={this.state.textTyped} />
      </div>
    );
  }
}

export default Editor;
