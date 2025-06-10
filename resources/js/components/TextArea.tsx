"use client"

import type React from "react"

type TextAreaProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  name?: string
  id?: string
  rows?: number
  className?: string
  labelClassName?: string
  textareaClassName?: string
  error?: string
}

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  name,
  id,
  rows = 4,
  className = "",
  labelClassName = "",
  textareaClassName = "",
  error,
}: TextAreaProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id || name} className={`block text-gray-700 mb-2 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-beauty-purple/30 focus:border-beauty-purple transition-colors ${
          error ? "border-red-500" : ""
        } ${textareaClassName}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
