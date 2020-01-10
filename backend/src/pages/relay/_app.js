import React from 'react';
import { QueryRenderer, fetchQuery } from 'react-relay';
import { initEnvironment, createEnvironment } from '../../relay/environment';

function App({ Component, variables = {}, relayData }) {
  const environment = createEnvironment(
    relayData,
    JSON.stringify({
      queryID: Component.query ? Component.query.params.name : undefined,
      variables
    })
  );
  return (
    <QueryRenderer
      environment={environment}
      query={Component.query}
      variables={variables}
      render={({ error, props }) => {
        if (error) return <div>{error.message}</div>;
        else if (props) return <Component {...props} />;
        return <div>Loading</div>;
      }}
    />
  );
}

App.getInitialProps = async ({ Component, router, ctx }) => {
  const { variables } = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  try {
    if (initEnvironment && Component.query) {
      const { environment, relaySSR } = initEnvironment();
      await fetchQuery(environment, Component.query, variables);
      return {
        variables,
        relayData: await relaySSR.getCache()
      };
    }
  } catch (e) {
    console.log(e);
  }

  return {
    variables
  };
};

export default App;
