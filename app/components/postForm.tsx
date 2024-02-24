"use client";
import createPost from "@/api/createPost";
import updatePost from "@/api/updatePost";
import { useEffect, useState } from "react";

export default function PostForm({
  initialText,
  mode,
  initialPostId,
  setInitialText,
  onSubmit,
  onCancel,
}: {
  initialText: string;
  mode: "create" | "edit";
  initialPostId: number | null;
  setInitialText: Function;
  onSubmit: Function;
  onCancel: Function;
}) {
  const [text, setText] = useState(initialText);
  const [postId, setPostId] = useState(initialPostId);
  const [formMode, setFormMode] = useState(mode);

  useEffect(() => {
    setText(initialText);
    setPostId(initialPostId);
  }, [initialText, initialPostId]);

  useEffect(() => {
    setFormMode(mode);
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formMode === "create") {
      await createPost(text);
    } else if (formMode === "edit" && postId !== null) {
      await updatePost(text, postId);
      setPostId(null);
    }
    setText("");
    setInitialText("");
    onSubmit();
  };

  const handleCancel = () => {
    setText("");
    setPostId(null);
    setFormMode("create");
    if (formMode === "edit") {
      setInitialText("");
    }
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900 mx-20 my-3"
              >
                {formMode === "create" ? "Create a post" : "Update the post"}
              </label>
              <div className="flex justify-between p-4 bg-white rounded shadow h-100 mx-20 my-5 text-[1.5rem]">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  // defaultValue={''}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-x-4">
        {formMode === "edit" && (
          <button
            type="button"
            className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {/* {postId === null ? "Create" : "Update"} */}
          {formMode === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
}
