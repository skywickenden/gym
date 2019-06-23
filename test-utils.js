import React from 'react';
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryMock } from 'graphql-query-test-mock';

// Required when mocking due to babel
import regeneratorRuntime from "regenerator-runtime";

// Required by nock for mocking graphql requests.
global.fetch = require('node-fetch');

const queryMock = new QueryMock();
beforeEach(() => {
  queryMock.setup("http://localhost:3000/graphql"); // Variable containing the URL for your GraphQL API. This must match what you"re making requests to in your client code.
});

const wrapper = ({children}) => (
  <Router>{children}</Router>
);

const customRender = (ui, options) =>
  render(ui, { wrapper, ...options });
  
export * from '@testing-library/react';

export { customRender as render, queryMock };
