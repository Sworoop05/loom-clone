import useCreateWorkspace from "@/hooks/useCreateWorkspace";
import React from "react";
import FormGenerator from "../form-generator";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { error } from "console";
import { Button } from "@/components/ui/button";

const WorkspaceForm = () => {
  const { errors, isPending, register, onFormSubmit } = useCreateWorkspace();
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        inputTypes={"input"}
        register={register}
        name={"name"}
        placeholder="Workspace Name"
        label={"Workspace name "}
        errors={errors}
        type="text"
      />
      <Button
        className="text-sm w-full mt-2 text-white"
        type="submit"
        disabled={isPending}
      >
        Create Workspace
      </Button>
    </form>
  );
};

export default WorkspaceForm;
