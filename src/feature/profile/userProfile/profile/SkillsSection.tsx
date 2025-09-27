import React, { useState } from "react";
import { Plus, X, Wrench } from "lucide-react";
import { Tag } from "./cards/Tag";

interface SkillsSectionProps {
  skills: string[];
  onSkillsUpdate: (skills: string[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onSkillsUpdate,
}) => {
  const [newSkill, setNewSkill] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    // Check if skill already exists
    if (skills.includes(newSkill.trim())) {
      alert("This skill already exists in your profile");
      return;
    }

    onSkillsUpdate([...skills, newSkill.trim()]);
    setNewSkill("");
    setIsAdding(false);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsUpdate(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center gap-1">
          <Wrench /> Expertise/Skills
        </h2>
        <button
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add</span>
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Add New Skill</h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 p-2 border rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              // placeholder="Enter a skill (e.g. JavaScript, Project Management)"
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors duration-300"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {skills.length === 0 ? (
          <p className="text-gray-500 italic text-sm">No skills added yet.</p>
        ) : (
          skills.map((skill, index) => (
            <Tag
              key={index}
              name={skill}
              onRemove={() => handleRemoveSkill(skill)}
              removable={true}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
