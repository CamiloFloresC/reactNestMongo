export interface IApplication {
  _id: string;
  name: string;
  description: string;
  grouped: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IApplicationForm
  extends Pick<IApplication, "name" | "description"> {}
