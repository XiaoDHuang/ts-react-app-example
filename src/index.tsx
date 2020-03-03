import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import Root from './routers';
import store from './redux/store';

ReactDom.render(
    <Provider store={store}>
        <Root />,
    </Provider>,
    document.getElementsByClassName('app')[0]
);