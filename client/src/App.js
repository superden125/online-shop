import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import "jquery";
// /import "animate.css-react";
import "animate.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/views/HomePage";
import LoginPage from "./components/views/LoginPage";
import ShopPage from "./components/views/ShopPage";
import AdminPage from "./components/admin/AdminPage";
import ProductAdd from "./components/admin/ProductAdd";
import ProductManage from "./components/admin/ProductManage";
import ProductEdit from "./components/admin/ProductEdit";
import AdminLayout from "./components/layouts/AdminLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import Category from "./components/admin/Category";
import ProductPage from "./components/views/ProductPage";
import { AdminRoute, DefaultRoute } from "./components/authorization/index";
import CartPage from "./components/views/CartPage";
import SignupPage from "./components/views/SignupPage";
import Order from "./components/admin/Order";
// const RouteWithLayout = ({ component: Component, layout: Layout, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => (
//       <Layout>
//         <Component {...props} />
//       </Layout>
//     )}
//   />
// );

function App() {
  return (
    // <Router>
    //   <NavbarComponent />
    //   <Switch>
    //     <Route exact path="/" component={HomePage}></Route>
    //     <Route path="/login" component={LoginPage}></Route>
    //     <Route path="/shop" component={ShopPage}></Route>

    //     <Route component={AdminLayout}>
    //       <Route exact path="/admin" component={AdminPage} />
    //       <Route exact path="/product" component={ProductManage} />
    //       {/* <Route path="/product/add" component={ProductAdd} />
    //     <Route path="/admin/product/edit/:id" component={ProductEdit} /> */}
    //     </Route>

    //     {/* <Route exact path="/admin/product" component={ProductManage} />
    //     <Route path="/admin/product/add" component={ProductAdd} />
    //     <Route path="/admin/product/edit/:id" component={ProductEdit} /> */}
    //   </Switch>
    //   <FooterComponent />
    // </Router>
    <React.Fragment>
      <ReactNotification />
      <Router>
        <Switch>
          <DefaultRoute
            exact
            path="/"
            layout={HomeLayout}
            component={HomePage}
          ></DefaultRoute>
          <DefaultRoute
            exact
            path="/login"
            layout={HomeLayout}
            component={LoginPage}
          ></DefaultRoute>
          <DefaultRoute
            exact
            path="/shop"
            layout={HomeLayout}
            component={ShopPage}
          ></DefaultRoute>
          <DefaultRoute
            exact
            path="/shop/product/:id"
            layout={HomeLayout}
            component={ProductPage}
          ></DefaultRoute>
          <DefaultRoute
            exact
            path="/cart"
            layout={HomeLayout}
            component={CartPage}
          ></DefaultRoute>
          <DefaultRoute
            exact
            path="/signin"
            layout={HomeLayout}
            component={SignupPage}
          ></DefaultRoute>

          {/* admin */}
          <AdminRoute
            exact
            path="/admin"
            layout={AdminLayout}
            component={AdminPage}
          ></AdminRoute>

          {/* product */}
          <AdminRoute
            exact
            path="/admin/product"
            layout={AdminLayout}
            component={ProductManage}
          ></AdminRoute>
          <AdminRoute
            path="/admin/product/add"
            layout={AdminLayout}
            component={ProductAdd}
          ></AdminRoute>
          <AdminRoute
            path="/admin/product/edit/:id"
            layout={AdminLayout}
            component={ProductAdd}
          ></AdminRoute>

          {/* category */}
          <AdminRoute
            exact
            path="/admin/category"
            layout={AdminLayout}
            component={Category}
          ></AdminRoute>

          <AdminRoute
            exact
            path="/admin/order"
            layout={AdminLayout}
            component={Order}
          ></AdminRoute>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
