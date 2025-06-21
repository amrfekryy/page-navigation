"use client"
import { useState, useEffect, useRef } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TabConnectorProps {
  isVisible?: boolean
  onAddTab?: () => void
  isDragging?: boolean
  disableHover?: boolean
}

export function TabConnector({
  isVisible = true,
  onAddTab,
  isDragging = false,
  disableHover = false,
}: TabConnectorProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showSplit, setShowSplit] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (disableHover) return

    setIsHovered(true)
    // Set a 0.5-second delay before showing the split effect
    hoverTimeoutRef.current = setTimeout(() => {
      setShowSplit(true)
    }, 500)
  }

  const handleMouseLeave = () => {
    if (disableHover) return

    setIsHovered(false)
    setShowSplit(false)
    // Clear the timeout if user leaves before 0.5 seconds
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`
        relative flex items-center justify-center transition-all duration-300 ease-out group flex-shrink-0
        ${isVisible ? "opacity-100" : "opacity-30"}
        ${isDragging ? "pointer-events-none" : ""}
        ${showSplit ? "w-20" : "w-8"}
      `}
      style={{ height: "40px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Default single connector - visible when not showing split */}
      {!showSplit && (
        <div
          className={`
            w-full border-t-2 border-dotted transition-colors duration-200
            ${isHovered && !disableHover ? "border-gray-400" : "border-gray-300"}
          `}
        ></div>
      )}

      {/* Split connectors container - visible when showing split */}
      {showSplit && !disableHover && (
        <div className="w-full flex items-center justify-between animate-in fade-in-0 duration-300">
          {/* Left connector */}
          <div className="w-6 border-t-2 border-dotted border-gray-400"></div>

          {/* Add button - appears in the center on split */}
          {!isDragging && onAddTab && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onAddTab}
                    className="
                      w-4 h-4 p-0 bg-white border-gray-300 rounded-full
                      hover:border-gray-400 hover:shadow-sm
                      transition-all ease-out
                      animate-in zoom-in-0 duration-300
                    "
                  >
                    <Plus className="w-2 h-2 text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add page here</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* Right connector */}
          <div className="w-6 border-t-2 border-dotted border-gray-400"></div>
        </div>
      )}
    </div>
  )
}
