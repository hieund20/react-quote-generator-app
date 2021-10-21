import './style.scss';

import React from 'react';
import PropTypes from 'prop-types';

Header.propTypes = {
    onRandom: PropTypes.func,
};

Header.defaultProps = {
    onRandom: null,
}

function Header(props) {
    const { onRandom } = props;

    function onRandomQuote() {
        if (onRandom !== null) {
            onRandom();
        }
    }

    return (
        <div className="random">
            <span className="random-text">random</span>
            <span
                className="material-icons"
                onClick={onRandomQuote}>
                autorenew
            </span>
        </div>
    );
}

export default Header;