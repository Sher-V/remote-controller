import React from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "antd";
import styles from "./index.module.css";

interface PropsType {
  _id: string;
  title: string;
}

const Home: React.FC<PropsType> = ({ _id, title }) => {
  const history = useHistory();

  return (
    <div
      className={styles.home}
      onClick={() => history.push(`/homes/${_id}`)}
      key={_id}
    >
      <Typography.Text>{title}</Typography.Text>
    </div>
  );
};

export default Home;
