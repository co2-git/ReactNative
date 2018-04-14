import React from 'react';
import ReactDOM from 'react-dom';
import fixPath from 'fix-path';

import App from './App';

fixPath();

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
