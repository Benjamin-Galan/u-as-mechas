"use client"

import type React from "react"

type InputProps = {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  name?: string
  id?: string
  className?: string
  labelClassName?: string
  inputClassName?: string
  error?: string
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  name,
  id,
  className = "",
  labelClassName = "",
  inputClassName = "",
  error,
}: InputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id || name} className={`block text-gray-700 mb-2 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-beauty-purple/30 focus:border-beauty-purple transition-colors ${
          error ? "border-red-500" : ""
        } ${inputClassName}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
