/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { Eye, FileText, HardDrive, LoaderIcon, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
// Use a stable version of pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumeSectionProps {
  resume: File | string | null; // Accepts either a File or a URL string
  onResumeUpdate: (resume: File | null) => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
  resume,
  onResumeUpdate,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize pagesData with a default empty array
  const [pagesData, setPagesData] = useState<
    { pageNumber: number; numPages: number | undefined }[]
  >([]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only allow PDF uploads
    const validFileTypes = ["application/pdf"];
    if (!validFileTypes.includes(file.type)) {
      alert("Please select a valid PDF file.");
      return;
    }

    // Set file name for display
    setFileName(file.name);

    // Pass the actual File object to parent component
    onResumeUpdate(file);

    // Close upload modal
    setIsUploading(false);
  };

  const handleRemoveResume = () => {
    setFileName(null);
    onResumeUpdate(null);
  };

  const openModal = () => {
    if (resume) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // On document load success, update numPages for the specific index
  function onDocumentLoadSuccess(
    idx: number,
    { numPages }: { numPages: number }
  ) {
    setPagesData((prevData) =>
      prevData.map((data, i) => (i === idx ? { ...data, numPages } : data))
    );
  }

  const handlePageChange = (idx: number, increment: boolean) => {
    setPagesData((prevData) =>
      prevData.map((data, i) =>
        i === idx
          ? {
            ...data,
            pageNumber: Math.max(
              1,
              Math.min(
                data.pageNumber + (increment ? 1 : -1),
                data.numPages || 1
              )
            ),
          }
          : data
      )
    );
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center gap-1">
          <FileText /> CV / Resume
        </h2>
        <button
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
          onClick={() => setIsUploading(true)}
        >
          <Upload className="w-4 h-4" />
          <span className="text-sm">Upload</span>
        </button>
      </div>

      {/* Uploading Modal */}
      {isUploading ? (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Upload Resume</h3>
            <button
              onClick={() => setIsUploading(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
            onClick={handleFileClick}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF only (max. 5MB)</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : resume ? (
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <HardDrive className="text-gray-600" />
            <span className="text-sm font-medium">{fileName || "Resume"}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 text-green-600 hover:text-green-800 transition-colors duration-300 flex items-center gap-1"
              type="button"
              onClick={openModal}
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm">Preview</span>
            </button>
            <button
              className="p-2 text-red-600 hover:text-red-800 transition-colors duration-300"
              onClick={handleRemoveResume}
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg border-dashed">
          <p className="text-gray-500 text-sm mb-1">No resume uploaded yet.</p>
          <div className="flex justify-center w-fit mx-auto">
            <PrimaryButton
              onClick={() => setIsUploading(true)}
            >
              <div className="flex items-center justify-center gap-2 px-2">
                <Upload className="w-4 h-4" /> <p>Upload Resume</p>
              </div>
            </PrimaryButton>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">Resume Preview</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <Document
                file={resume}
                loading={
                  <div className="flex justify-center items-center h-full">
                    <LoaderIcon className="animate-spin" />
                  </div>
                }
                onLoadError={(error: any) =>
                  console.error("Error loading PDF", error)
                }
              >
                <Page
                  pageNumber={pagesData[1]?.pageNumber || 1}
                  width={window.innerWidth > 768 ? 600 : 300}
                />
              </Document>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResumeSection;
