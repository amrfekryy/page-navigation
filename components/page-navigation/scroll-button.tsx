"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ScrollButtonProps {
  direction: "left" | "right"
  onClick: () => void
  disabled?: boolean
  visible?: boolean
}

export function ScrollButton({ direction, onClick, disabled = false, visible = true }: ScrollButtonProps) {
  if (!visible) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className="w-8 h-8 p-0 bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          >
            {direction === "left" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Scroll {direction}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
