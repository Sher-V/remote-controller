import React from "react";

interface PropsType {
  name: string;
  onDragEnd: () => void;
  onDragStart: (event: any, name: string) => void;
}

const NewControlElement: React.FC<PropsType> = ({
  name,
  onDragEnd,
  onDragStart,
}) => {
  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, "Dimmer")}
      onDragEnd={onDragEnd}
      className={"control"}
    >
      {name}
    </div>
  );
};

export default NewControlElement;
