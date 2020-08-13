import React from "react";
import Switch from "../switch";
import Dimmer from "../dimmer";
import Power from "../power";
import { Row } from "antd";
import styles from "./index.module.css";
import { ControlTypes } from "../../redux/reducers/home-configuration/types";
import Mode from "../mode";

interface PropsType {
  value: any;
  controlName: ControlTypes;
  onChange: (name: string, value: any) => void;
  remove: (name: string) => void;
}

const Control: React.FC<PropsType> = ({
  value,
  controlName,
  onChange,
  remove,
}) => (
  <Row align={"middle"} justify={"space-between"} className={styles.control}>
    {
      {
        Switch: (
          <Switch onChange={onChange} name={controlName} checked={value} />
        ),

        Power: <Power onChange={onChange} name={controlName} val={value} />,
        Mode: (
          <Mode
            remove={remove}
            onChange={onChange}
            name={controlName}
            val={value}
          />
        ),
        Dimmer: (
          <Dimmer
            remove={remove}
            onChange={onChange}
            name={controlName}
            val={value}
          />
        ),
      }[controlName]
    }
  </Row>
);
export default Control;
