import axios, { AxiosResponse } from "axios";
import { ISwitch } from "entities/switch";
import { QueryState, getQueryData, Response } from "shared";

export const QUERIES = {
  GET_ALL: 'Switches_get_all'
}

const API_URL = process.env.REACT_APP_API_URL
const GET_ALL_URL = `${API_URL}/switches/get-all`

export const getAll = (query: QueryState): Promise<Response<Array<ISwitch>>> => {
  const data = getQueryData(query)
  
  return axios
  .post(GET_ALL_URL, data)
  .then((d: AxiosResponse<Response<Array<ISwitch>>>) => d.data) 
}