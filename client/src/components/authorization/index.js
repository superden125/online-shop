import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userInfo && userInfo.isAdmin) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }

        if (userInfo && !userInfo.isAdmin) {
          return props.history.push("/");
        }

        return props.history.push(
          `/login?redirect=${props.location.pathname.slice(1)}`
        );
      }}
    />
  );
};

const DefaultRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export { AdminRoute, DefaultRoute };
