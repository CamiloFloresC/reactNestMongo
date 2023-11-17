import { IApplication } from "./Application";

export interface IGroup {
  _id: string;
  name: string;
  applications: IApplication[];
}
