import React, { Fragment } from "react";
import { Switch as AntSwitch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

interface PropsType {
  name: string;
  checked: boolean;
  onChange: (name: string, checked: boolean) => void;
}

const Switch: React.FC<PropsType> = ({ name, checked, onChange }) => (
  <Fragment>
    <AntSwitch
      data-testid={"switch"}
      checked={checked}
      onChange={() => onChange(name, !checked)}
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
    />
    <div>{(checked && "On") || "Off"}</div>
  </Fragment>
);

export default Switch;
