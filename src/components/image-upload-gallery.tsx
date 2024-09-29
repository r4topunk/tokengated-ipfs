'use client'

import { useState, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

export function ImageUploadGallery() {
  const [images, setImages] = useState<string[]>([])

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prevImages => [...prevImages, ...newImages])
    }
  }, [])

  const removeImage = useCallback((index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
          <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</span>
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-2xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={image}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No images uploaded yet. Upload some images to see them here!
        </div>
      )}
    </div>
  )
}