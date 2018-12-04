import React from 'react';
// import ReactDOM from 'react-dom';

const quotes = [
  {
    quote: 'Brooooo',
    author: 'Matt Riddle'
  },
  {
    quote: "I'm in the top 1 percent",
    author: 'EC3'
  },
  {
    quote: 'Adam Cole, Bay Bay!',
    author: 'Adam Cole'
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
        <button id="new-quote" onClick={this.props.onClick}>New Quote</button>
      </div>
    );
  }
}

class TweetQuote extends React.Component {
  render() {
    let link = `https://www.twitter.com/intent/tweet?text=${this.props.quoteInfo.quote} - ${this.props.quoteInfo.author}`;
    return(
      <div>
        <a href={link} id="tweet-quote">Tweet Quote</a>
      </div>
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    let randomIndex = Math.floor(Math.random() * quotes.length);
    this.state = {
      currentQuote: quotes[randomIndex],
      currentIndex: randomIndex
    };
  }

  getNewQuote() {
    let newIndex = Math.floor(Math.random() * quotes.length);
    if (newIndex === this.state.currentIndex) {
      if (newIndex === quotes.length - 1) {
        newIndex -= 1;
      } else {
        newIndex += 1;
      }
    }
    this.setState({
      currentQuote: quotes[newIndex],
      currentIndex: newIndex
    });
  }

  render() {
    return (
      <div id="quote-box">
      <TextField quoteText={this.state.currentQuote.quote} />
      <AuthorField quoteAuthor={this.state.currentQuote.author} />
      <NewQuote onClick={() => this.getNewQuote()}/>
      <TweetQuote quoteInfo={this.state.currentQuote}/>
      </div>
    );
  };
}

export default QuoteBox;
