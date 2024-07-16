"use client";

import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

import { FormButton } from "../common/form-button";

import * as actions from "@/actions";

export function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, { errors: {} });
  const isLoggedIn = formState.errors._form ? (
    <div className="p-2 bg-red-200 broder border-red-400 rounded">
      {formState.errors._form?.join(", ")}
    </div>
  ) : null;

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a topic</h3>
            <Input
              errorMessage={formState.errors.name?.join(", ")}
              isInvalid={!!formState.errors.name}
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Topic name"
            />
            <Textarea
              errorMessage={formState.errors.description?.join(", ")}
              isInvalid={!!formState.errors.description}
              label="Description"
              labelPlacement="outside"
              name="description"
              placeholder="Describe your topic"
            />

            {isLoggedIn}
            <FormButton> Save </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
