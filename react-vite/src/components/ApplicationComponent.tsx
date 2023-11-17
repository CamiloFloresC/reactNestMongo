import { Button } from "@mui/material";
import { IApplication } from "../interfaces/Application";
import { dateFormat } from "../utils/dateFormat";
import BasicModal from "./ModalApp";
import { FormAppUpdate } from "./forms/FormAppUpdate";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteApplication } from "../services/Appications";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export const ApplicationComponent = ({
  application,
}: {
  application: IApplication;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteApp(id),
  });
  const deleteApp = async (id: string) => {
    deleteApplication(id)
      .then(() => {
        setTimeout(() => {
          toast.success("success delete");
          queryClient.invalidateQueries({
            queryKey: ["applications"],
          });
        }, 800);
      })
      .catch(() => toast.error("error"));
  };
  return (
    <article className="w-full max-w-sm h-full flex flex-col border-gray-200 border-2 rounded-md p-4 gap-3">
      <h2 className="font-bold">{application.name}</h2>
      <span className="font-light">{dateFormat(application.createdAt)}</span>
      <span>
        <span className="font-semibold">grouped:</span>{" "}
        {application.grouped ? "yes" : "none"}
      </span>
      <article className="flex gap-2">
        <span className="font-semibold">Description: </span>
        <span>{application.description}</span>
      </article>
      <article className="flex gap-2">
        <BasicModal
          setOpen={setOpen}
          open={open}
          component={<FormAppUpdate setOpen={setOpen} value={application} />}
          text="Update Application"
          color={"primary"}
        />
        <Button
          onClick={() => deleteMutation.mutate(application._id)}
          className="w-[120px]"
          variant="outlined"
          color="error">
          Delete
        </Button>
      </article>
    </article>
  );
};
