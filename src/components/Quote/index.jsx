import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';

Quote.propTypes = {
    quote: PropTypes.object,
    quoteList: PropTypes.array,
    pagination: PropTypes.object,
    onShowQuotes: PropTypes.func,
    onPageChange: PropTypes.func
};

Quote.defaultProps = {
    quote: null,
    quoteList: [],
    pagination: null,
    onShowQuotes: null,
    onPageChange: null
}

function Quote(props) {
    const { quote, quoteList, pagination, onShowQuotes, onPageChange } = props;
    const { currentPage, totalPages } = pagination;

    function handlePageChange(newPage) {
        if (onPageChange !== null) {
            onPageChange(newPage);
        }
    }

    function handleShowQuotes() {
        if (onShowQuotes !== null) {
            onShowQuotes()
        }
    }

    return (
        <div className="container">
            {
                quoteList.length > 0 &&
                <div>
                    <span className="author">{quote.quoteAuthor}</span>
                    {quoteList.map(quoteItem => (
                        <div className="quote">
                            <blockquote>
                                {`"${quoteItem.quoteText}"`}
                            </blockquote>
                        </div>
                    ))
                    }
                    <div className="pagination">
                        <button
                            className="pagination-pre"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <span class="material-icons">arrow_back</span>
                        </button>
                        <div className="pagination-paging">
                            <span>{`${currentPage} of ${totalPages}`}</span>
                        </div>
                        <button
                            className="pagination-next"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <span class="material-icons">arrow_forward</span>
                        </button>
                    </div>
                </div>
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
                    onClick={() => handleShowQuotes()} >
                    <h3 className="quotes-author">{quote.quoteAuthor}</h3>
                    <span className="quotes-genre">{quote.quoteGenre}</span>
                    <span className="material-icons">trending_flat</span>
                </div>
            }
        </div>
    );
}

export default Quote;