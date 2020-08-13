import axios from "axios";
import { Home } from "../redux/reducers/homes/types";
import {
  ControlObject,
  NewControlElements,
} from "../redux/reducers/home-configuration/types";

interface HomeConfiguration {
  controlObjects: ControlObject[];
  controlElements: NewControlElements;
}

const getHomes = () => axios.get<Home[]>("/homes");

const getHomeConfiguration = (id: string) =>
  axios.get<HomeConfiguration>(`/homes/${id}`);

const saveHomeConfiguration = (id: string, controlObjects: ControlObject[]) =>
  axios.put(`update/${id}`, controlObjects);

export const api = {
  getHomes,
  getHomeConfiguration,
  saveHomeConfiguration
};
