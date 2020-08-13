import React, {Fragment} from "react";
import {cleanup, fireEvent, render, waitForDomChange,} from "@testing-library/react";
import Control from "./index";
import {ControlTypes} from "../../redux/reducers/home-configuration/types";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

afterEach(cleanup);

it("should render", async () => {
  let state = {
    Switch: true,
    Dimmer: 4,
    Power: 2,
  };
  // @ts-ignore
  const updateValue = (name: any, checked: any) => (state[name] = checked);
  const { getByTestId, getByText, getByRole } = render(
    <Fragment>
      <Control
        value={state.Switch}
        controlName={ControlTypes.Switch}
        onChange={updateValue}
        remove={(name: string) => {}}
      />
      <Control
        value={state.Dimmer}
        controlName={ControlTypes.Dimmer}
        onChange={updateValue}
        remove={(name: string) => {}}
      />
      <Control
        value={state.Power}
        controlName={ControlTypes.Power}
        onChange={updateValue}
        remove={(name: string) => {}}
      />
    </Fragment>
  );
  const sw = getByTestId("switch"),
    powerButton = getByText("+"),
    dimmer = getByRole("slider");

  expect(sw.getAttribute("aria-checked")).toEqual("true");

  fireEvent.click(sw);
  fireEvent.click(powerButton);
  fireEvent.click(dimmer);

  await waitForDomChange();

  expect(state).toEqual({ Switch: false, Dimmer: 4, Power: 3 });
});
