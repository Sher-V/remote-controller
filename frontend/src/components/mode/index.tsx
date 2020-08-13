import React, { Fragment } from "react";
import { Button, Col, Select } from "antd";

interface PropsType {
  name: string;
  val: string;
  onChange: (name: string, value: string) => void;
  remove: (name: string) => void;
}

const Mode: React.FC<PropsType> = ({ name, val, onChange, remove }) => (
  <Fragment>
    <Col>
      <Select
        value={val}
        onChange={(value) => onChange(name, value)}
      >
        <Select.Option value={"Economy"}>Economy</Select.Option>
        <Select.Option value={"Standard"}>Standard</Select.Option>
      </Select>
    </Col>
    <Col>
      <Button onClick={() => remove(name)}>Remove</Button>
    </Col>
  </Fragment>
);

export default Mode;
