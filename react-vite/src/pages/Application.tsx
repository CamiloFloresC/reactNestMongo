import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteApplication, getApplicationById } from "../services/Appications";
import { Button } from "@mui/material";
import { dateFormat } from "../utils/dateFormat";
import BasicModal from "../components/ModalApp";
import { FormAppUpdate } from "../components/forms/FormAppUpdate";
import toast from "react-hot-toast";

export const Application = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteApp(id),
  });
  const { data, isLoading } = useQuery({
    queryFn: async () => await getApplicationById(id!),
    queryKey: ["application"],
  });
  const deleteApp = async (id: string) => {
    deleteApplication(id)
      .then(() => {
        setTimeout(() => {
          toast.success("success delete");
          navigate("/");
        }, 800);
      })
      .catch(() => toast.error("error"));
  };
  if (isLoading || !data) {
    return (
      <section className="min-h-[600px] grid justify-items-center justify-center w-full">
        Loading Applications...
      </section>
    );
  }
  return (
    <article className="w-full  h-[500px] flex flex-col p-4 gap-3 justify-center items-center ">
      {data ? (
        <section className="max-w-2xl grid gap-4 justify-start pl-4 bg-slate-50 p-4 rounded-md">
          <h2 className="font-bold">{data.name}</h2>
          <span className="font-light">{dateFormat(data.createdAt)}</span>
          <span>
            <span className="font-semibold">grouped:</span>{" "}
            {data.grouped ? "yes" : "none"}
          </span>
          <article className="flex gap-2">
            <span className="font-semibold">Description: </span>
            <span>{data.description}</span>
          </article>
          <article className="flex gap-2">
            <BasicModal
              setOpen={setOpen}
              open={open}
              component={<FormAppUpdate setOpen={setOpen} value={data} />}
              text="Update Application"
              color={"primary"}
            />
            <Button
              onClick={() => deleteMutation.mutate(data._id)}
              className="w-[120px]"
              variant="outlined"
              color="error">
              Delete
            </Button>
          </article>
        </section>
      ) : null}
    </article>
  );
};
