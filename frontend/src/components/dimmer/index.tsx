import React, { Fragment } from "react";
import { Slider, Col, Button } from "antd";

interface PropsType {
  name: string;
  val: number;
  onChange: (name: string, value: number) => void;
  remove: (name: string) => void;
}

const Dimmer: React.FC<PropsType> = ({ name, val, onChange, remove }) => (
  <Fragment>
    <Col>
      <Slider
        style={{ width: "100px" }}
        data-testid={"dimmer"}
        value={val}
        onChange={(value: number) => onChange(name, value)}
      />
      <div>Brightness: {val}</div>
    </Col>
    <Col>
      <Button onClick={() => remove(name)}>Remove</Button>
    </Col>
  </Fragment>
);

export default Dimmer;
