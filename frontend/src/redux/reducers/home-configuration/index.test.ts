import { initialState, reducer } from "./index";
import { ActionTypes } from "./types";

const data = {
  pastControlObjects: [],
  controlObjects: [
    {
      title: "Heater",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Light Bulb",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Air conditioner",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Fan",
      controlElements: {
        Switch: true,
        Power: 2,
      },
    },
  ],
  controlElements: {
    "Light Bulb": ["Dimmer"],
    Fan: [],
    "Air conditioner": [],
    Heater: [],
  },
  activeCard: null,
  isDragging: false,
  isLoading: false,
  isSaved: false
};

const updatedData = {
  pastControlObjects: [data.controlObjects],
  controlObjects: [
    {
      title: "Heater",
      controlElements: {
        Switch: true,
        Power: 2,
      },
    },
    {
      title: "Light Bulb",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Air conditioner",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Fan",
      controlElements: {
        Switch: true,
        Power: 2,
      },
    },
  ],
  controlElements: {
    "Light Bulb": ["Dimmer"],
    Fan: [],
    "Air conditioner": [],
    Heater: [],
  },
  activeCard: null,
  isDragging: false,
  isLoading: false,
  isSaved: false
};

const removeItemData = {
  pastControlObjects: [data.controlObjects],
  controlObjects: [
    {
      title: "Heater",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Light Bulb",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Air conditioner",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Fan",
      controlElements: {
        Power: 2,
      },
    },
  ],
  controlElements: {
    "Light Bulb": ["Dimmer"],
    Fan: [],
    "Air conditioner": [],
    Heater: [],
  },
  activeCard: null,
  isDragging: false,
  isLoading: false,
  isSaved: false
};

const resetData = {
  pastControlObjects: [],
  controlObjects: [
    {
      title: "Heater",
      controlElements: {
        Switch: true,
        Power: 2,
      },
    },
    {
      title: "Light Bulb",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Air conditioner",
      controlElements: {
        Switch: false,
        Power: 2,
      },
    },
    {
      title: "Fan",
      controlElements: {
        Switch: true,
        Power: 2,
      },
    },
  ],
  controlElements: {
    "Light Bulb": ["Dimmer"],
    Fan: [],
    "Air conditioner": [],
    Heater: [],
  },
  activeCard: null,
  isDragging: false,
  isLoading: false,
  isSaved: true
};

const loadingData = { ...data, isLoading: true },
  activeData = { ...data, activeCard: 2 },
  toggleData = { ...data, isDragging: true };

describe("testing reducer", () => {
  it("should set state", () =>
    expect(
      reducer(initialState, { type: ActionTypes.SET_STATE, ...data })
    ).toEqual(data));

  it("should update state", () =>
    expect(
      reducer(data, {
        type: ActionTypes.UPDATE,
        index: 0,
        name: "Switch",
        value: true,
      })
    ).toEqual(updatedData));

  it("should update state", () =>
    expect(
      reducer(data, {
        type: ActionTypes.REMOVE_CONTROL_ELEMENT,
        index: 3,
        name: "Switch",
      })
    ).toEqual(removeItemData));

  it("should reset state", () =>
    expect(reducer(updatedData, { type: ActionTypes.SET_SAVED })).toEqual(
      resetData
    ));

  it("should set loading", () =>
    expect(reducer(data, { type: ActionTypes.SET_LOADING })).toEqual(
      loadingData
    ));

  it("should set active", () =>
    expect(
      reducer(data, { type: ActionTypes.SET_ACTIVE_OBJECT, index: 2 })
    ).toEqual(activeData));

  it("should set dragging", () =>
    expect(reducer(data, { type: ActionTypes.TOGGLE_IS_DRAGGING })).toEqual(
      toggleData
    ));

  it("should undo", () =>
    expect(reducer(updatedData, { type: ActionTypes.UNDO })).toEqual(data));
});
