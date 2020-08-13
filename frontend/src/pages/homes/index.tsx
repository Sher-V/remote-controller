import React, { Fragment, useEffect } from "react";
import { List } from "antd";
import Home from "../../components/home";
import { Home as HomeType } from "../../redux/reducers/homes/types";
import { connect } from "react-redux";
import { getHomes } from "../../redux/reducers/homes/actions";
import { RootReducer } from "../../redux";
import { RouteComponentProps } from "react-router-dom";

interface MapStateToPropsType {
  homes: HomeType[];
}

interface MapDispatchToPropsType {
  getHomes: () => void;
}

type PropsType = MapStateToPropsType &
  MapDispatchToPropsType &
  RouteComponentProps<{}>;

const Homes: React.FC<PropsType> = ({ homes, getHomes }) => {
  useEffect(() => {
    getHomes();
  }, []);

  return (
    <Fragment>
      <List
        dataSource={homes}
        renderItem={(home) => (
          <List.Item>
            <Home {...home} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

const mapStateToProps = (state: RootReducer) => ({
  homes: state.homesReducer.homes,
});

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  RouteComponentProps<{}>,
  RootReducer
>(mapStateToProps, {
  getHomes,
})(Homes);
