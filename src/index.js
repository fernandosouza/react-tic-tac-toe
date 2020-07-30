import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import Routes from './routes/Routes';

Sentry.init({dsn: "https://87727ed0238f4c228d9d492b99e40796@o420884.ingest.sentry.io/5339851"});

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
