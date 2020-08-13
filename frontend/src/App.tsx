import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homes from "./pages/homes";
import HomeConfiguration from "./pages/home-configuration";
import { RootReducer } from "./redux";
import { Modal, Spin } from "antd";
import styles from "./app.module.css";
import { setError } from "./redux/reducers/app/actions";

interface MapStateToPropsType {
  isLoading: boolean;
  error: any;
}

interface MapDispatchToPropsType {
  setError: (error?: any) => void;
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const App: React.FC<PropsType> = ({ isLoading, error, setError }) => {
  if (error)
    Modal.error({
      title: "Oops. An error occurred. Try again.",
      onOk: async () => await setError(),
    });

  return (
    <BrowserRouter>
      <Spin spinning={isLoading}>
        <div className={styles.container}>
          <Switch>
            <Route exact path={"/"} component={Homes} />
            <Route path={"/homes/:id"} component={HomeConfiguration} />
          </Switch>
        </div>
      </Spin>
    </BrowserRouter>
  );
};
const mapStateToProps = (state: RootReducer) => ({
  isLoading: state.appReducer.isLoading,
  error: state.appReducer.error,
});

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  any,
  RootReducer
>(mapStateToProps, { setError })(App);
