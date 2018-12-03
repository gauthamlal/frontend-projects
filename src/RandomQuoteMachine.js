import React from 'react';
// import ReactDOM from 'react-dom';

const quotes = [
  {
    quote: 'Brooooo',
    author: 'Matt Riddle'
  }
];

class TextField extends React.Component {
  render() {
    return (
      <div id="text">{this.props.quoteText}</div>
    );
  }
}

class AuthorField extends React.Component {
  render() {
    return (
      <div id="author">{this.props.quoteAuthor}</div>
    );
  }
}

class NewQuote extends React.Component {
  render() {
    return(
      <div>
        <button id="new-quote">New Quote</button>
      </div>
    );
  }
}

class TweetQuote extends React.Component {
  render() {
    return(
      <div>
        <button id="tweet-quote">Tweet Quote</button>
      </div>
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
  }

  getNewQuote() {

  }

  render() {
    let i = Math.floor(Math.random() * quotes.length);
    console.log(i);
    let quoteObject = quotes[Math.floor(Math.random() * quotes.length)];
    return (
      <div id="quote-box">
      <TextField quoteText={quoteObject.quote} />
      <AuthorField quoteAuthor={quoteObject.author} />
      <NewQuote />
      <TweetQuote />
      </div>
    );
  };
}

export default QuoteBox;

// ReactDOM.render(<QuoteBox />, document.getElementById('root'));
