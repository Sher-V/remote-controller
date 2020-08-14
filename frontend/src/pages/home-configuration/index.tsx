import React, { useEffect } from "react";
import { Button, Card, Row, Col, Typography, Modal } from "antd";
import { RouteComponentProps, useParams } from "react-router-dom";
import Control from "../../components/control";
import "./index.css";
import {
  ControlObject,
  NewControlElements,
} from "../../redux/reducers/home-configuration/types";
import { connect } from "react-redux";
import { RootReducer } from "../../redux";
import {
  getHomeConfiguration,
  removeControlElement,
  save,
  setActiveObject,
  setSaved,
  toggleIsDragging,
  undo,
  updateControlElementsByObjectId,
} from "../../redux/reducers/home-configuration/actions";
import NewControlElement from "../../components/new-control-element";
import { defaultValues } from "./utils";

type MapStateToPropsType = {
  controlObjects: ControlObject[];
  pastControlObjects: ControlObject[][];
  controlElements: NewControlElements;
  newUniqueControlElements: string[];
  activeCard: number | null;
  isDragging: boolean;
  isSaved: boolean;
};

interface MapDispatchToPropsType {
  getHomeConfiguration: (id: string) => void;
  save: (id: string) => void;
  updateControlElementsByObjectId: (
    index: number,
    name: string,
    value: any
  ) => void;
  removeControlElement: (name: string, index: number) => void;
  setActiveObject: (index: number | null) => void;
  toggleIsDragging: () => void;
  undo: () => void;
  setSaved: () => void;
}

type PropsType = MapStateToPropsType &
  MapDispatchToPropsType &
  RouteComponentProps<{}>;

const HomeConfiguration: React.FC<PropsType> = ({
  isSaved,
  setSaved,
  controlObjects,
  pastControlObjects,
  controlElements,
  isDragging,
  activeCard,
  getHomeConfiguration,
  save,
  newUniqueControlElements,
  undo,
  toggleIsDragging,
  updateControlElementsByObjectId,
  removeControlElement,
  setActiveObject,
}) => {
  const params = useParams<{ id: string }>();

  useEffect(() => {
    getHomeConfiguration(params.id);
  }, [getHomeConfiguration, params.id]);

  if (isSaved)
    Modal.success({
      title: "Successfully saved!",
      onOk: async () => await setSaved(),
    });

  const onDragStart = (event: React.DragEvent, name: string) => {
    event.dataTransfer.setData("name", name);
    toggleIsDragging();
  };

  const onDragEnter = (event: React.DragEvent, index: number) => {
    event.preventDefault();
    setActiveObject(index);
  };

  const onDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setActiveObject(null);
  };

  const onDrop = (
    event: React.DragEvent,
    ctrlObjectName: string,
    index: number
  ) => {
    const name = event.dataTransfer.getData("name");
    if (!controlElements[ctrlObjectName].includes(name)) {
      Modal.error({
        title: "An error occurred",
        content: `${name} cannot be added to ${ctrlObjectName}.`,
      });
      return;
    }
    // @ts-ignore
    updateControlElementsByObjectId(index, name, defaultValues[name]);
  };

  const onDragEnd = () => {
    toggleIsDragging();
    setActiveObject(null);
  };

  return (
    <div>
      <Row justify={"center"} gutter={[16, 16]}>
        <Col>
          <Button
            disabled={!pastControlObjects.length}
            onClick={() => save(params.id)}
          >
            Save
          </Button>
        </Col>
        <Col>
          <Button disabled={!pastControlObjects.length} onClick={undo}>
            Undo
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {controlObjects.map((object, index) => (
          <Col span={8} key={`ctrlObj - ${index}`}>
            <Card
              className={`object ${isDragging ? "object__events" : ""}  ${
                activeCard === index ? "object__active" : ""
              }`}
              title={object.title}
              onDrop={(event) => onDrop(event, object.title, index)}
              onDragOver={(event) => event.preventDefault()}
              onDragEnter={(event) => onDragEnter(event, index)}
              onDragLeave={(event) => onDragLeave(event)}
            >
              {Object.keys(controlObjects[index].controlElements).map(
                (key, elIndex) => (
                  <Control
                    remove={(name: string) => removeControlElement(name, index)}
                    // @ts-ignore
                    controlName={key}
                    value={controlObjects[index].controlElements[key]}
                    onChange={(name: string, value: any) =>
                      updateControlElementsByObjectId(index, name, value)
                    }
                    key={`ctrlEl - ${elIndex}`}
                  />
                )
              )}
            </Card>
          </Col>
        ))}
      </Row>
      <Typography.Title style={{ textAlign: "center" }} level={4}>
        Set of controls. <br />
        Drag-and-Drop a needed control onto an object.
      </Typography.Title>
      <Row gutter={16}>
        {newUniqueControlElements.map((name, index) => (
          <Col key={`newCtrlEl - ${index}`}>
            <NewControlElement
              name={name}
              onDragEnd={onDragEnd}
              onDragStart={(event) => onDragStart(event, name)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const mapStateToProps = (state: RootReducer) => {
  let controlElements: NewControlElements;
  let newUniqueControlElements: string[] = [];
  if (state.homeConfigurationReducer.controlElements) {
    controlElements = state.homeConfigurationReducer.controlElements;
    newUniqueControlElements = Object.keys(controlElements).reduce(
      (prevValue: string[], key) => {
        (controlElements as any)[key].forEach(
          (el: string) => !prevValue.includes(el) && prevValue.push(el)
        );
        return prevValue;
      },
      []
    );
  }

  return {
    controlObjects: state.homeConfigurationReducer.controlObjects,
    activeCard: state.homeConfigurationReducer.activeCard,
    pastControlObjects: state.homeConfigurationReducer.pastControlObjects,
    isDragging: state.homeConfigurationReducer.isDragging,
    controlElements: state.homeConfigurationReducer.controlElements,
    newUniqueControlElements,
    isSaved: state.homeConfigurationReducer.isSaved,
  };
};

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  RouteComponentProps<{}>,
  RootReducer
>(mapStateToProps, {
  getHomeConfiguration,
  save,
  undo,
  updateControlElementsByObjectId,
  removeControlElement,
  setActiveObject,
  setSaved,
  toggleIsDragging,
})(HomeConfiguration);
