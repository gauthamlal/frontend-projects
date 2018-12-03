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
    const index = Math.floor(Math.random() * quotes.length);
    this.state = {
      currentQuote: quotes[index],
      currentIndex: index
    }
  }

  getNewQuote() {
    const updatedQuotes = quotes.split(0, this.state.currentIndex).concat(quotes.split(this.state.currentIndex + 1));
    let i = Math.floor(Math.random() * quotes.length);
    i = i === this.state.currentIndex ? i - 1 : i;
    this.setState({
      currentQuote: quotes[i],
      currentIndex: i
    });
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
        <TweetQuote quoteInfo={quoteObject}/>
      </div>
    );
  };
}

export default QuoteBox;

// ReactDOM.render(<QuoteBox />, document.getElementById('root'));
