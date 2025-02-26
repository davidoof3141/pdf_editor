import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

export default function PDFUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
    }
  };

  useEffect(() => {
    handleUpload();
  }, [selectedFiles]); // Triggers upload when selectedFiles updates

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setSelectedFiles([
        ...selectedFiles,
        ...Array.from(event.dataTransfer.files),
      ]);
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Upload success:", data))
      .catch((error) => console.error("Upload error:", error));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 p-4 shadow-lg rounded-2xl bg-white">
        <CardContent
          className="flex flex-col items-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <label className="flex flex-col items-center cursor-pointer border-dashed border-2 border-gray-400 rounded-lg p-6 w-full text-center bg-gray-50 hover:bg-gray-100">
            <UploadCloud className="w-12 h-30 text-gray-500" />
            <span className="mt-2 text-sm text-gray-700">
              Drag & drop PDFs or click to uploads
            </span>
            <input
              type="file"
              accept="application/pdf"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {selectedFiles.length > 0 && (
            <ul className="mt-4 text-sm text-gray-600">
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
