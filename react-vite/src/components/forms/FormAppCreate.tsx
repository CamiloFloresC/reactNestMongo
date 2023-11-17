import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { createApplication } from "../../services/Appications";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const FormAppCreate = ({
  setOpen,
}: {
  setOpen: (state: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  interface IFormAppCreate {
    name: string;
    description: string;
  }
  const initialValue: IFormAppCreate = {
    name: "",
    description: "",
  };
  const [input, setInput] = useState<IFormAppCreate>(initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const create = useMutation({
    mutationFn: (e: FormEvent<HTMLFormElement>) => handleSubmit(e),
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await createApplication(input);
      setInput(initialValue);
      toast.success("success");
      setTimeout(() => {
        setOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["applications"],
        });
      }, 1000);
    } catch (error) {
      toast.error("error");
    }
  };
  return (
    <form
      onSubmit={create.mutate}
      className="w-full h-full flex flex-col gap-4">
      <h2 className="font-bold">Create Application</h2>
      <TextField
        name="name"
        value={input.name}
        onChange={handleChange}
        label="Name"
        variant="standard"
      />
      <TextField
        name="description"
        value={input.description}
        onChange={handleChange}
        label="Description"
        variant="standard"
      />
      <Button
        type="submit"
        className="w-[120px]"
        variant="outlined"
        color="primary">
        Create
      </Button>
    </form>
  );
};
