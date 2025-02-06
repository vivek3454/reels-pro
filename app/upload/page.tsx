"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FileUpload from "@/components/FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useNotification } from "@/components/Notification";
import { apiClient, VideoFormData } from "@/lib/api-client";
import { useRouter } from "next/navigation";


const Upload = () => {
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();
    const router = useRouter();

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<VideoFormData>({
        defaultValues: {
            title: "",
            description: "",
            videoUrl: "",
        },
    });

    const handleUploadSuccess = (response: IKUploadResponse) => {
        console.log("Upload Success", response);

        setValue("videoUrl", response.filePath);
        showNotification("Video uploaded successfully!", "success");
    };

    const onSubmit = async (data: VideoFormData) => {

        console.log("data", data);
        
        setLoading(true);
        try {
            await apiClient.uploadVideo(data);
            showNotification("Video uploaded successfully!", "success");

            // Reset form after successful submission
            setValue("title", "");
            setValue("description", "");
            setValue("videoUrl", "");
            router.push("/");
        } catch (error) {
            console.log("error", error);

            showNotification(
                error instanceof Error ? error.message : "Failed to upload video",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleUploadProgress = (progress: number) => {
        console.log("progress number", progress);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold">Upload New Reel</h2>
            <div className="form-control">
                <label className="label">Video Title</label>
                <input
                    type="text"
                    className={`input input-bordered ${errors.title ? "input-error" : ""}`}
                    {...register("title", { required: "Video title is required" })}
                />
                {errors.title && (
                    <span className="text-error text-sm mt-1">{errors.title.message}</span>
                )}
            </div>

            <div className="form-control">
                <label className="label">Description</label>
                <textarea
                    className={`textarea textarea-bordered h-24 ${errors.description ? "textarea-error" : ""
                        }`}
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && (
                    <span className="text-error text-sm mt-1">
                        {errors.description.message}
                    </span>
                )}
            </div>

            <div className="form-control">
                <label className="label">Upload Video</label>
                <FileUpload
                    onProgress={handleUploadProgress}
                    onSuccess={handleUploadSuccess}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Publishing Video...
                    </>
                ) : (
                    "Publish Video"
                )}
            </button>
        </form>
    );
};

export default Upload;