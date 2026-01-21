"use client";

import { useState, useRef } from "react";
import { api } from "@/app/lib/api-client";

interface FileUploadProps {
    onUploadComplete: (url: string, filename: string) => void;
    onError: (error: string) => void;
}

export function FileUpload({ onUploadComplete, onError }: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset
        setFileName(file.name);
        setIsUploading(true);

        try {
            // 1. Get Presigned URL
            const signedRes = await api.post<{ upload_url: string; fields: Record<string, string>; file_url: string }>(
                '/api/files/signed-url',
                {
                    filename: file.name,
                    content_type: file.type
                }
            );

            if (!signedRes.success || !signedRes.data) {
                throw new Error(signedRes.error || "Failed to get upload URL");
            }

            const { upload_url, fields, file_url } = signedRes.data;

            // 2. Upload to S3
            const formData = new FormData();
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append('file', file);

            const uploadReq = await fetch(upload_url, {
                method: 'POST',
                body: formData
            });

            if (!uploadReq.ok) {
                throw new Error("Upload to storage failed");
            }

            // Success
            onUploadComplete(file_url, file.name);

        } catch (error: any) {
            console.error("Upload error:", error);
            onError(error.message || "File upload failed");
            setFileName(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="rounded-xl border-2 border-dashed border-black/20 p-6 dark:border-white/10 bw:border-black/20">
            <label className="mb-4 block text-xs font-black uppercase text-gray-400">Attached File</label>
            <div className="flex items-center gap-4">
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="text-sm font-bold text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:text-white dark:file:bg-white dark:file:text-black bw:file:bg-black bw:file:text-white file:cursor-pointer cursor-pointer disabled:opacity-50"
                />
                {isUploading && (
                    <span className="text-xs font-bold text-gray-400 animate-pulse">Uploading...</span>
                )}
            </div>
            {fileName && !isUploading && (
                <div className="mt-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#FFD600] text-sm">check_circle</span>
                    <p className="text-xs font-bold text-[#FFD600]">{fileName} uploaded</p>
                </div>
            )}
        </div>
    );
}
