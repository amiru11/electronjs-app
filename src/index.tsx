import React from 'react';
import ReactDOM from 'react-dom';

import Root from './client/Root';
import './index.scss';

const ROOT_ID = 'root';

const rootElement = document.createElement('div');
rootElement.id = ROOT_ID;
document.body.appendChild(rootElement);

ReactDOM.render(<Root />, rootElement);
