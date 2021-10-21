import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Quote from './components/Quote';

function App() {
  const [quote, setQuote] = useState({});
  const [filter, setFilter] = useState(false);
  const [quoteList, setQuoteList] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
  });
  const [reRender, setReRender] = useState(1);

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

  async function fetchQuoteList() {
    try {
      const requestUrl =
        `https://quote-garden.herokuapp.com/api/v3/quotes?author=${quote.quoteAuthor}&limit=10&page=${pagination.currentPage}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      setQuoteList(responseJSON.data);
      setPagination(responseJSON.pagination);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchQuoteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRender]);

  function handleRandomNewQuote() {
    if (filter === false) setFilter(true);
    else setFilter(false);
    setQuoteList([]);
  }

  function handleShowQuote() {
    setPagination(pagination.currentPage = 1);
    fetchQuoteList();
  }

  function handlePageChange(newPage) {
    setPagination({
      ...pagination,
      currentPage: newPage
    });
    setReRender(reRender === false ? true : false);
  }

  return (
    <div className="App">
      <Header
        onRandom={handleRandomNewQuote}
      />
      <Quote
        quote={quote}
        quoteList={quoteList}
        pagination={pagination}
        onShowQuotes={handleShowQuote}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
