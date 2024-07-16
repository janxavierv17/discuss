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

export const PostCreateForm = ({ slug }: { slug: string }) => {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    { errors: {} },
  );
  const isLoggedIn = (
    <div className="p-2 bg-red-200 broder border-red-400 rounded">
      {formState.errors._form?.join(", ")}
    </div>
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary"> Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg"> Create a post</h3>
            <Input
              errorMessage={formState.errors.title?.join(", ")}
              isInvalid={!!formState.errors.title}
              label="Title"
              labelPlacement="outside"
              name="title"
              placeholder="Title"
            />
            <Textarea
              errorMessage={formState.errors.content?.join(", ")}
              isInvalid={!!formState.errors.content}
              label="Content"
              labelPlacement="outside"
              name="content"
              placeholder="Content"
            />

            {isLoggedIn}
            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
