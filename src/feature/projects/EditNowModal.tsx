/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useForm } from "react-hook-form";
import { JobCardProps, UpdateProjectFunction } from "./card/cardTypes";
import { Tag } from "./card/Tag";

export const EditProjectModal = ({
  name,
  avatar,
  title,
  postedTime,
  tags,
  priceType,
  deadline,
  description,
  className,
  budget,
  handleUpdateProjects,
  projectId,
  buttonLoading,
  scopeOfWork,
}: JobCardProps & UpdateProjectFunction) => {
  // Set up the form using React Hook Form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: name,
      title: title,
      description: description,
      budget: budget,
      priceType: priceType,
      deadline: deadline,
      scopeOfWork: scopeOfWork || "",
    },
  });

  // Handle form submission (for now, just log the updated values)
  const onSubmit = (data: any) => {
    console.log(data);
    handleUpdateProjects(data, projectId);
    // Add functionality to save the data (e.g., API call)
  };

  return (
    <div
      className={`w-full bg-white border-gray-200   p-6 space-y-4 ${className}`}
    >
      {/* Header with avatar and bookmark */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-medium text-gray-900">
              <input
                readOnly
                {...register("name")}
                className="bg-transparent  border-none p-1 text-lg font-medium text-gray-900"
              />
            </h2>
          </div>
        </div>
      </div>
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          <input
            {...register("title")}
            className="bg-transparent w-full border-none p-1 text-xl font-semibold text-gray-900"
          />
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Posted {new Date(postedTime).toDateString()}
        </p>
      </div>
      {/* Tags */}
      <div>
        <div className="flex flex-wrap gap-2 border-y py-4">
          {tags?.map((tag, index) => (
            <Tag key={index} name={tag} />
          ))}
        </div>

        {/* Price and Deadline */}
        <div className="grid grid-cols-2 gap-8 border-b py-4">
          <div>
            <h3 className="md:text-xl text-lg font-semibold flex items-center gap-1">
              <input
                {...register("budget")}
                className="bg-transparent w-32 border-none p-1  text-lg font-semibold text-gray-900"
                type="text"
              />
            </h3>
            <p className="text-sm text-gray-500">
              <input
                {...register("priceType")}
                className="bg-transparent border-none p-1 text-sm text-gray-500"
              />
            </p>
          </div>

          <div className="">
            <h3 className="md:text-xl text-lg font-semibold">Deadline</h3>
            <input
              readOnly
              {...register("deadline")}
              className="bg-transparent w-full border-none p-1 text-sm text-gray-500"
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <h3 className="md:text-xl text-lg font-semibold">Goal</h3>

      <div className="space-y-2 border  w-full m">
        <textarea
          {...register("description")}
          className=" border-gray-300 rounded-md w-full p-1"
          rows={4}
        />
      </div>
      <h3 className="md:text-xl text-lg font-semibold">Scope Of Work</h3>

      <div className="space-y-2 border  w-full m">
        <textarea
          {...register("scopeOfWork")}
          className=" border-gray-300 rounded-md w-full p-1"
          rows={4}
        />
      </div>
      <div className="mt-1 max-w-2xl text-sm text-gray-500">
        ⚠️ Warning: This changes will be reflected in the project but if
        someneone has already applied to this project, there will be no change
        in their application.
      </div>
      {/* Submit button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-secondary text-white px-4 py-2 rounded-md"
        >
          {buttonLoading ? <p>Saving....</p> : <p>Save Changes</p>}
        </button>
      </div>
    </div>
  );
};
