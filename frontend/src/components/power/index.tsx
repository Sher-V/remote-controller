import React, { Fragment } from "react";
import { Button } from "antd";

interface PropsType {
  name: string;
  val: number;
  onChange: (name: string, value: number) => void;
}
const Power: React.FC<PropsType> = ({ name, val, onChange }) => (
  <Fragment>
    <div>
      <Button
        style={{ marginRight: "5px" }}
        onClick={() => onChange(name, val + 1)}
      >
        +
      </Button>
      <Button onClick={() => onChange(name, val - 1)}>-</Button>
    </div>
    <div>Value: {val}</div>
  </Fragment>
);

export default Power;
