"use client";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void;
    onProgress?: (progress: number) => void;
    fileType?: "image" | "video";
}


export default function FileUpload({
    onSuccess,
    onProgress,
    fileType = "video"
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const onError = (err: { message: string }) => {
        console.log("Error", err);
        setError(err.message);
        setUploading(false);
    };

    const handleSuccess = (res: IKUploadResponse) => {
        console.log("Success", res);
        setUploading(false);
        setError(null);
        onSuccess(res);
    };

    const handleUploadProgress = (progress: { lengthComputable: any; loaded: number; total: number; }) => {
        if (progress.lengthComputable && onProgress) {
            const percentComplete = (progress.loaded / progress.total) * 100;
            setProgress(Math.round(percentComplete));
        }
    };

    const handleUploadStart = () => {
        setUploading(true);
        setError(null);
    };

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload a video");
                return false;
            }

            if (file.size > 100 * 1024 * 1024) {
                setError("Video size must be less than 100 MB");
                return false;
            }
        }
        else {
            const validTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                setError("Please upload a valid file (JPEG, PNG, WEBP)");
                return false;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError("Video size must be less than 5 MB");
                return false;
            }
        }
        return true;
    };

    return (
        <div className="space-y-2">
            <IKUpload
                fileName={fileType === "video" ? "video" : "image"}
                onError={onError}
                onSuccess={handleSuccess}
                onUploadProgress={handleUploadProgress}
                onUploadStart={handleUploadStart}
                accept={fileType === "video" ? "video/*" : "image/*"}
                className="file-input file-input-bordered w-full"
                validateFile={validateFile}
                useUniqueFileName={true}
                folder={fileType === "video" ? "/videos" : "/images"}
            />

            {uploading && (
                <div className="">
                    <div className="flex items-center justify-between gap-2 text-sm text-primary">
                        <div className="flex items-center font-bold">
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading Video...
                        </div>
                        <span className="font-bold">{progress} %</span>
                    </div>
                    <progress className="progress progress-primary w-full mt-2" value={progress} max="100"></progress>
                </div>
            )}

            {error && <div className="text-error text-sm">{error}</div>}
        </div>
    );
}