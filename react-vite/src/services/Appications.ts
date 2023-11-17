import { IApplication, IApplicationForm } from "../interfaces/Application";
import axios, { AxiosResponse } from "axios";

export const getApplications = async (): Promise<IApplication[]> => {
  const res = await axios.get("http://localhost:3000/applications");
  return res.data;
};

export const getApplicationById = async (id: string): Promise<IApplication> => {
  const res = await axios.get(`http://localhost:3000/applications/${id}`);
  return res.data;
};

export const createApplication = async (
  dataForm: IApplicationForm
): Promise<AxiosResponse> => {
  const res = await axios.post("http://localhost:3000/applications", dataForm);
  return res;
};

export const updateApplication = async (
  dataForm: IApplicationForm,
  id: string
): Promise<AxiosResponse> => {
  const res = await axios.put(
    `http://localhost:3000/applications/${id}`,
    dataForm
  );
  return res;
};

export const deleteApplication = async (id: string): Promise<AxiosResponse> => {
  const res = await axios.delete(`http://localhost:3000/applications/${id}`);
  return res;
};
