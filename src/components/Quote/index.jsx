import './style.scss';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Quote.propTypes = {
    quote: PropTypes.object,
};

Quote.defaultProps = {
    quote: null,
}

function Quote(props) {
    const { quote } = props;
    const [quoteList, setQuoteList] = useState([]);

    useEffect(() => {
        setQuoteList([]);
    }, [quote]);

    async function fetchQuoteList() {
        try {
            const requestUrl = `https://quote-garden.herokuapp.com/api/v3/quotes?author=${quote.quoteAuthor}`;
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();

            console.log('author ', responseJSON.data);
            setQuoteList(responseJSON.data);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            {
                quoteList.length > 0 &&
                quoteList.map(quoteItem => (
                    <div className="quote">
                        <blockquote>
                            {`"${quoteItem.quoteText}"`}
                        </blockquote>
                    </div>
                ))
            }
            {
                quoteList.length === 0 &&
                <div className="quote">
                    <blockquote>
                        {`"${quote.quoteText}"`}
                    </blockquote>
                </div>
            }
            {
                quoteList.length === 0 &&
                <div
                    className="quotes"
                    onClick={fetchQuoteList}>
                    <h3 className="quotes-author">{quote.quoteAuthor}</h3>
                    <span className="quotes-genre">{quote.quoteGenre}</span>
                    <span className="material-icons">trending_flat</span>
                </div>
            }
        </div>
    );
}

export default Quote;