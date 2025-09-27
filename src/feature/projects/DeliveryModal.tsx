import React, { useState } from "react";
import { Upload, X, File } from "lucide-react";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useCreateDeliveryMutation } from "@/redux/api/delivey/deliveryApi";
import { toast } from "sonner";

interface FormData {
  message: string;
  file: File | null;
}

interface FormErrors {
  message?: string;
}

const Delivery = ({ id }: { id: string }) => {
  const [createDelivery, { isLoading }] = useCreateDeliveryMutation();
  const [formData, setFormData] = useState<FormData>({
    message: "",
    file: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [dragOver, setDragOver] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const result = await createDelivery({
          agreementId: id,
          message: formData.message,
          file: formData.file, // from file input
        });
        if (result.data.success) {
          toast.success("Success");
        }
        // Handle success
      } catch (err) {
        console.error("SDFSDDF", err);
      }
      console.log("Submitted Delivery:", formData);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4 p-4 max-w-md min-w-[calc(105vw)] md:min-w-[450px] mx-auto">
      {/* Message */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium block text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          placeholder="Write your delivery message..."
          rows={4}
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className={`w-full px-3 py-2 border ${
            errors.message ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message}</p>
        )}
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium block text-gray-700">
          Upload File (optional)
        </label>

        {!formData.file ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input
              type="file"
              onChange={(e) => handleFileChange(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Any file type accepted
              </p>
            </label>
          </div>
        ) : (
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <File className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(formData.file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Submit Button */}
      <PrimaryButton
        loading={isLoading}
        onClick={handleSubmit}
        text="Submit Delivery"
      />
    </div>
  );
};

export default Delivery;
