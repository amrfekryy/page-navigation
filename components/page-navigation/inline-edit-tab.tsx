"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Check, X, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Tab } from "./types"

interface InlineEditTabProps {
  tab: Tab
  onSave: (id: string, name: string) => void
  onCancel: (id: string) => void
  isAtEnd?: boolean
}

export function InlineEditTab({ tab, onSave, onCancel, isAtEnd = false }: InlineEditTabProps) {
  const [name, setName] = useState(tab.label || "")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (name.trim()) {
        onSave(tab.id, name.trim())
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      onCancel(tab.id)
    }
  }

  const handleBlur = () => {
    if (name.trim()) {
      onSave(tab.id, name.trim())
    } else {
      onCancel(tab.id)
    }
  }

  const handleSave = () => {
    if (name.trim()) {
      onSave(tab.id, name.trim())
    }
  }

  const handleCancel = () => {
    onCancel(tab.id)
  }

  return (
    <div className="flex items-center justify-center w-full">
      {/* Left connector */}
      <div className="w-6 border-t-2 border-dotted border-gray-400"></div>

      {/* Edit form container */}
      <div className="flex items-center gap-1 rounded-md mx-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-amber-50 border border-amber-200 shadow-sm">
          <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs bg-amber-500 text-white">
            <File className="w-3 h-3" />
          </span>

          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="bg-transparent border-none outline-none text-amber-800 placeholder-amber-600 min-w-0 w-20"
            placeholder="Tab name"
          />

          <div className="flex items-center gap-1 ml-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="w-4 h-4 p-0 text-green-600 hover:text-green-700 hover:bg-transparent"
              title="Save"
            >
              <Check className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="w-4 h-4 p-0 text-red-600 hover:text-red-700 hover:bg-transparent"
              title="Cancel"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right connector - only show if not at end */}
      {!isAtEnd && <div className="w-6 border-t-2 border-dotted border-gray-400"></div>}
    </div>
  )
}
