import './style/index.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import App from './App.js';
import { Locale } from "./globalization/loading-messages";
import { IntlProvider, LocalizationProvider } from "@progress/kendo-react-intl";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
      <LocalizationProvider language={Locale.language}>
          <IntlProvider locale={Locale.locale}>
              <App />
          </IntlProvider>
      </LocalizationProvider>
  </BrowserRouter>,
  rootElement);


