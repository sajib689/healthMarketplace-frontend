"use client";

import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import DnDInput from "@/components/ui/DragNDrop";
import { convertScheduleFormat } from "@/lib/convertTimeRange";
import { useCreateConsultationMutation } from "@/redux/api/consultation/consultationApi";
import { Suggestion, useSuggestionsQuery } from "@/redux/api/others/OthersApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import AddBookingForm from "../booking/AddBookingForm";

type DaySchedule = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  pricing30: z.coerce
    .number()
    .min(1, { message: "Price for 30 min is required" }),
  pricing60: z.coerce
    .number()
    .min(1, { message: "Price for 60 min is required" }),
  adviceOn: z
    .array(z.string())
    .min(1, { message: "At least One Advice is required" }),
  //   images: z.instanceof(File).nullable(),
});

type FormValues = z.infer<typeof formSchema>;


export default function AddConsultation() {
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { data, isLoading: suggestionsLoading } = useSuggestionsQuery("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    data?.data ?? []
  );

  const [images, setImages] = useState<File | null>(null);

  const [createConsultation, { isLoading }] = useCreateConsultationMutation();
  const router = useRouter();

  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({
    SUN: { enabled: false, startTime: "09:00", endTime: "17:00" },
    MON: { enabled: true, startTime: "09:00", endTime: "17:00" },
    TUE: { enabled: true, startTime: "09:00", endTime: "17:00" },
    WED: { enabled: true, startTime: "09:00", endTime: "17:00" },
    THU: { enabled: true, startTime: "09:00", endTime: "17:00" },
    FRI: { enabled: true, startTime: "09:00", endTime: "17:00" },
    SAT: { enabled: false, startTime: "09:00", endTime: "17:00" },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      adviceOn: [],
      description: "",
      pricing30: 0,
      pricing60: 0,
    },
  });

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value.trim() && (data?.data?.length ?? 0) > 0) {
      setShowSuggestions(true);
      setFilteredSuggestions(
        (data?.data ?? []).filter(
          (skill) =>
            skill.name.toLowerCase().includes(value.toLowerCase()) &&
            !selectedSkills.includes(skill.name)
        )
      );
    } else {
      setShowSuggestions(false);
    }
  };

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      const newSelectedSkills = [...selectedSkills, skill];
      setSelectedSkills(newSelectedSkills);
      setValue("adviceOn", newSelectedSkills);
      setSkillInput("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSelectedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(newSelectedSkills);
    setValue("adviceOn", newSelectedSkills);
  };

  const onSubmit = async (data: FormValues) => {
    const formdata = new FormData();
    if (images) {
      formdata.append("image", images);
    }
    const book = convertScheduleFormat({
      data: schedule,
      direction: "toAvailable",
    });
    const formatedData = {
      title: data.title,
      adviceOn: data.adviceOn,
      description: data.description,
      ...book,
      pricing: [
        { duration: 30, price: data.pricing30 },
        { duration: 60, price: data.pricing60 },
      ],
    };
    formdata.append("bodyData", JSON.stringify(formatedData));
    console.log(formatedData);
    try {
      const res = await createConsultation(formdata);
      if (res.data?.success) {
        toast.success("Consultation Created Successfully");
        router.push("/my-consultation");
      }
      if (res.error) {
        toast.error("Consultation Created Failed");
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(data, images, schedule);
  };

  return (
    <div className="w-full container section-gap">
      <h1 className="text-lg md:text-2xl lg:text-4xl font-bold mb-6 border-b pb-2">
        Add Consultation
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium block">
            Consultation Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            // placeholder="Healthcare Consultation"
            {...register("title")}
            className={`w-full px-3 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>
        <DnDInput
          width="w-full"
          setNew={setImages}
          initialFile={null}
          id="bookCover"
          label="Upload Image (Optional)"
          acceptedTypes="image"
        />
        <div>
          {
            !suggestionsLoading && <div className="space-y-2">
              <label htmlFor="adviceOn" className="text-sm font-medium block">
                Advice On <span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center justify-start border rounded-lg focus-within:border-primary p-1">
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-gray-50 border text-gray-800 px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      {skill}
                      <X
                        size={14}
                        className="cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </div>
                  ))}
                </div>
                <div className="relative flex-1">
                  <input
                    id="adviceOn"
                    type="text"
                    // placeholder="Add Advices..."
                    value={skillInput}
                    onChange={handleSkillInputChange}
                    onFocus={() => skillInput.trim() && setShowSuggestions(true)}
                    className="w-full px-3 py-2 rounded-md focus:outline-none "
                  />
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredSuggestions.map((skill) => (
                        <div
                          key={skill.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => addSkill(skill.name)}
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Controller
                name="adviceOn"
                control={control}
                render={() => <input type="hidden" />}
              />
              {errors.adviceOn && (
                <p className="text-red-500 text-xs">{errors.adviceOn.message}</p>
              )}
            </div>
          }
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="pricing30" className="text-sm font-medium block">
              Pricing for 30 min <span className="text-red-500">*</span>
            </label>
            <input
              id="pricing30"
              type="text"
              placeholder="$50 - $100"
              {...register("pricing30")}
              className={`w-full px-3 py-2 border ${errors.pricing30 ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.pricing30 && (
              <p className="text-red-500 text-xs">{errors.pricing30.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="pricing60" className="text-sm font-medium block">
              Pricing for 60 min <span className="text-red-500">*</span>
            </label>
            <input
              id="pricing60"
              type="text"
              placeholder="$50 - $100"
              {...register("pricing60")}
              className={`w-full px-3 py-2 border ${errors.pricing60 ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.pricing60 && (
              <p className="text-red-500 text-xs">{errors.pricing60.message}</p>
            )}
          </div>
        </div>

        <AddBookingForm schedule={schedule} setSchedule={setSchedule} />

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium block">
            Consultation Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            // placeholder="It will take time to decide on when to hire or get the work started..."
            rows={4}
            {...register("description")}
            className={`w-full px-3 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <PrimaryButton
            loading={isLoading}
            onClick={() => { }}
            text="Add New Consultation"
          />
        </div>
      </form>
    </div>
  );
}
