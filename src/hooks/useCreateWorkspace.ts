import { useMutation } from "@tanstack/react-query";
import { createWorkspace } from "@/actions/workspace"; // Ensure this is a real API function
import useZodForm from "./useZodForm";
import { workspaceSchema } from "@/schema";
import { useMutationData } from "./use-mutation";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ['create-workspace'],
    (data: { name: string }) => createWorkspace(data.name),
    'user-workspaces'
  )
  const { register, watch, reset, onFormSubmit, errors } = useZodForm(
    workspaceSchema,
    mutate
  );
  return { register, watch, reset, onFormSubmit, errors, mutate, isPending };
}

export default useCreateWorkspace;
