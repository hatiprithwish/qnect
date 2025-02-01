import React, { useState } from "react";
import toast from "react-hot-toast";

const ShareForm = (flowId: any) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("view");

  const handleCopyLink = () => {
    const link = `http://localhost:5173/${flowId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy link: ", error);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, permission });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-6 py-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Share with...
        </label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-2 px-2 py-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Permission:</span>
          <div className="flex items-center">
            <input
              type="radio"
              id="view"
              name="permission"
              value="view"
              checked={permission === "view"}
              onChange={(e) => setPermission(e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="view" className="ml-2 text-sm text-gray-700">
              View
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="edit"
              name="permission"
              value="edit"
              checked={permission === "edit"}
              onChange={(e) => setPermission(e.target.value)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="edit" className="ml-2 text-sm text-gray-700">
              Edit
            </label>
          </div>
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-500 px-2 py-1 rounded-md text-white mx-auto w-full text-sm hover:bg-blue-600 transition-colors"
      >
        Share
      </button>
    </form>
  );
};

export default ShareForm;
