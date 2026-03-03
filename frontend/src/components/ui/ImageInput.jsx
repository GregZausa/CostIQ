import { ImagePlus, X } from "lucide-react";
import React, { useRef } from "react";
import toast from "react-hot-toast";

const ImageInput = ({
  value,
  onChange,
  accept = "image/*",
  maxSizeMB = 5,
  label = "Upload Image",
}) => {
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image size must be smaller than ${maxSizeMB}MB`);
    }

    onChange(file);
  };
  const preview =
    value && typeof value === "string"
      ? value
      : value instanceof File
        ? URL.createObjectURL(value)
        : null;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        ref={fileRef}
        accept={accept}
        hidden
        onChange={handleChange}
      />
      <div
        className="relative group h-64 w-full cursor-pointer rounded-xl border-2 border-dashed border-gray-300
       bg-gray-50 hover:border-indigo-500 hover:bg-indigo-50 transition flex items-center justify-center overflow-hidden"
        onClick={() => fileRef.current.click()}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 h-full w-full object-contain object-center"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                Change Image
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute top-2 right-2 rounded-full bg-white/90 p-1 shadow hover:bg-white"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <ImagePlus size={32} />
            <span className="text-sm">Click to Upload</span>
            <span className="text-xs text-gray-400">
              PNG, JPG up to {maxSizeMB}MB
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
