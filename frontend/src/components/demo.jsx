import React, { useState, useRef } from 'react';
import { Upload, Image, X } from 'lucide-react';

export default function BeautifulImageUpload() {
    const [imageFile, setImageFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (file) => {
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFileSelect(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleRemove = () => {
        setImageFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Upload Image
                </h3>

                {!preview ? (
                    <div
                        onClick={handleClick}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
              relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
              transition-all duration-300 ease-in-out transform hover:scale-[1.02]
              ${isDragOver
                                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]'
                                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400'
                            }
              bg-gradient-to-br from-gray-50 to-gray-100 
              dark:from-gray-800 dark:to-gray-900
              hover:from-blue-50 hover:to-indigo-50
              dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10
              shadow-lg hover:shadow-xl
            `}
                    >
                        <div className="space-y-4">
                            <div className={`
                mx-auto w-16 h-16 rounded-full flex items-center justify-center
                transition-colors duration-300
                ${isDragOver
                                    ? 'bg-blue-100 dark:bg-blue-800'
                                    : 'bg-gray-200 dark:bg-gray-700'
                                }
              `}>
                                <Upload className={`
                  w-8 h-8 transition-colors duration-300
                  ${isDragOver
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-500 dark:text-gray-400'
                                    }
                `} />
                            </div>

                            <div>
                                <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                    {isDragOver ? 'Drop your image here' : 'Click to upload or drag & drop'}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                ) : (
                    <div className="relative group">
                        <div className="relative rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                <button
                                    onClick={handleRemove}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transform hover:scale-110"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center space-x-2">
                                <Image className="w-4 h-4 text-green-600 dark:text-green-400" />
                                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                    {imageFile?.name}
                                </span>
                                <span className="text-xs text-green-600 dark:text-green-400">
                                    ({(imageFile?.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {preview && (
                    <button
                        onClick={handleClick}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Change Image
                    </button>
                )}
            </div>
        </div>
    );
}