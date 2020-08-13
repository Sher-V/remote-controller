import React, { Fragment } from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForDomChange,
} from "@testing-library/react";
import Dimmer from "./index";
import Control from "./index";

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
  const updateValue = (name, checked) => (state[name] = checked);
  const { getByTestId, getByText, getByRole } = render(
    <Fragment>
      <Control
        value={state.Switch}
        controlName={"Switch"}
        onChange={updateValue}
      />
      <Control
        value={state.Dimmer}
        controlName={"Dimmer"}
        onChange={updateValue}
      />
      <Control
        value={state.Power}
        controlName={"Power"}
        onChange={updateValue}
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
