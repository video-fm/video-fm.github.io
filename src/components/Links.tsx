import React from 'react';

const Links: React.FC = () => {
    return (
        <div>
            <h2>Links</h2>
            <ul>
                <li>
                    <a href="URL_TO_PAPER" target="_blank" rel="noopener noreferrer">Paper</a>
                </li>
                <li>
                    <a href="URL_TO_CODE" target="_blank" rel="noopener noreferrer">Code</a>
                </li>
                <li>
                    <a href="URL_TO_DEMO" target="_blank" rel="noopener noreferrer">Demo</a>
                </li>
            </ul>
        </div>
    );
};

export default Links;