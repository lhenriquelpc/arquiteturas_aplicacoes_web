import React from 'react';

export default () => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query listQuery {
          viewer {
            name
          }
          allCustomers {
            id
            name
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return (
          <>
            <h1>Viewer</h1>
            <div>{props.viewer.name}</div>
            <h1>Customers</h1>
            {props.allCustomers.map(customer => (
              <div key={customer.id}>
                <strong>name: </strong>
                {customer.name}
              </div>
            ))}
          </>
        );
      }}
    />
  );
};
