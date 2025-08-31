import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface CabinFormData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

interface CabinToEdit {
  id?: number;
  name?: string;
  maxCapacity?: number;
  regularPrice?: number;
  discount?: number;
  description?: string;
  image?: string;
}

const CabinForm = ({
  cabinToEdit = {},
  onCloseModal,
}: {
  cabinToEdit?: CabinToEdit;
  onCloseModal?: () => void;
}) => {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditingSession = Boolean(editId);

  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  });

  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const onSubmit = (data: any) => {
    const image = typeof data.image === "string" ? data.image : data.image?.[0];

    if (isEditingSession)
      editCabin({ newCabinData: { ...data, image: image }, id: editId });
    else createCabin({ ...data, image: image });
    onCloseModal?.();
  };

  const handleCancel = () => {
    onCloseModal?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Cabin name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            errors?.name
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {errors?.name?.message && (
          <span className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="maxCapacity"
          className="text-sm font-medium text-gray-700"
        >
          Maximum capacity
        </label>
        <input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            errors?.maxCapacity
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {errors?.maxCapacity?.message && (
          <span className="text-red-500 text-sm mt-1">
            {errors.maxCapacity.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="regularPrice"
          className="text-sm font-medium text-gray-700"
        >
          Regular price
        </label>
        <input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            errors?.regularPrice
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {errors?.regularPrice?.message && (
          <span className="text-red-500 text-sm mt-1">
            {errors.regularPrice.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="discount" className="text-sm font-medium text-gray-700">
          Discount
        </label>
        <input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) < Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
            errors?.discount
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {errors?.discount?.message && (
          <span className="text-red-500 text-sm mt-1">
            {errors.discount.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Description for website
        </label>
        <textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          rows={3}
          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-y transition-colors ${
            errors?.description
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {errors?.description?.message && (
          <span className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="image" className="text-sm font-medium text-gray-700">
          Cabin photo
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingSession ? false : "This field is required",
          })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={handleCancel}
          type="reset"
          className="px-4 py-2 text-gray-600 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isWorking}
          className="px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEditingSession ? "Edit cabin" : "Create cabin"}
        </button>
      </div>
    </form>
  );
};

export default CabinForm;
