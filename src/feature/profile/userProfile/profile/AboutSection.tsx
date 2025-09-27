import React, { useState, useEffect } from "react";
import { Edit, Save, Loader2 } from "lucide-react";
import { TiDocumentText } from "react-icons/ti";

interface AboutSectionProps {
  bio: string;
  loading: boolean;
  onBioUpdate: (bio: string) => void;
  role?: "company" | "user";
}

const AboutSection: React.FC<AboutSectionProps> = ({
  bio,
  onBioUpdate,
  loading,
  role,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);

  // Sync editedBio if bio changes externally (e.g., after reload)
  useEffect(() => {
    setEditedBio(bio);
  }, [bio]);

  const handleSave = () => {
    if (loading) return; // Prevent multiple clicks while saving
    onBioUpdate(editedBio);
    setIsEditing(false); // Exit edit mode immediately
  };

  return (
    <section className="border-b pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium w-fit pb-2 border-b-2 border-black">
          About
        </h2>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center gap-1">
          <TiDocumentText />
          {role === "company" ? "Company Bio" : "Bio"}
        </h2>
        <button
          disabled={loading}
          className={`text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300 ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
          onClick={() => {
            if (loading) return;
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              <span className="text-sm">Save</span>
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              <span className="text-sm">Edit Bio</span>
            </>
          )}
        </button>
      </div>
      {isEditing || loading ? (
        <div className="space-y-2">
          <textarea
            className="w-full p-2 border rounded resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
            rows={5}
            disabled={loading}
          />
          <div className="flex justify-end space-x-2">
            <button
              disabled={loading}
              className={`px-3 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100 transition-colors duration-300 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
              onClick={() => {
                setEditedBio(bio);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className={`px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-300 flex items-center gap-1 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handleSave}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>
      )}
    </section>
  );
};

export default AboutSection;
