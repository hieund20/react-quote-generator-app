import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Quote from './components/Quote';

function App() {
  const [quote, setQuote] = useState({});
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const requestUrl = 'https://quote-garden.herokuapp.com/api/v3/quotes/random';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setQuote(responseJSON.data[0]);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    fetchQuote();
  }, [filter]);

  function handleRandomNewQuote() {
    if (filter === false) setFilter(true);
    else setFilter(false);
  }

  return (
    <div className="App">
      <Header
        onRandom={handleRandomNewQuote}
      />
      <Quote
        quote={quote}
      />
    </div>
  );
}

export default App;
