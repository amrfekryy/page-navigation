"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { CopyIcon } from "../icons/copy";
import { DeleteIcon } from "../icons/delete";
import { DuplicateIcon } from "../icons/duplicate";
import { EditIcon } from "../icons/edit";
import { FlagIcon } from "../icons/flag";
import { MenuIcon } from "../icons/menu";
import { InlineEditTab } from "./inline-edit-tab";
import type { Tab } from "./types";

interface SortableTabProps {
  tab: Tab;
  isActive: boolean;
  onTabClick: (tabId: string) => void;
  isDragging?: boolean;
  onEditSave?: (id: string, name: string) => void;
  onEditCancel?: (id: string) => void;
  onMenuAction?: (action: string, tabId: string) => void;
  isAtEnd?: boolean;
}

export function SortableTab({
  tab,
  isActive,
  onTabClick,
  isDragging = false,
  onEditSave,
  onEditCancel,
  onMenuAction,
  isAtEnd = false,
}: SortableTabProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const handleMenuAction = (action: string) => {
    onMenuAction?.(action, tab.id);
  };

  if (tab.isEditing && onEditSave && onEditCancel) {
    return (
      <InlineEditTab
        tab={tab}
        onSave={onEditSave}
        onCancel={onEditCancel}
        isAtEnd={isAtEnd}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative flex items-center rounded-md transition-all duration-300 ease-out flex-shrink-0
        ${isSortableDragging ? "z-50 shadow-lg scale-105" : ""}
        ${isActive ? "z-10" : "z-0"}
      `}
    >
      <button
        {...attributes}
        {...listeners}
        onClick={() => onTabClick(tab.id)}
        className={`
          flex items-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out relative overflow-hidden cursor-grab active:cursor-grabbing
          ${isHovered ? "px-3 py-2" : "px-3 py-2"}
          ${
            isActive
              ? "bg-white text-gray-900 border border-gray-200 shadow-sm"
              : isHovered
              ? "bg-gray-200 text-gray-700 border border-transparent"
              : "bg-gray-100 text-gray-600 border border-transparent"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white focus:z-20 focus:border focus:border-[#2F72E2]
          ${isSortableDragging ? "shadow-lg ring-2 ring-amber-200" : ""}
        `}
        style={{
          width: isHovered ? "auto" : "fit-content",
          minWidth: isHovered ? "auto" : "fit-content",
        }}
      >
        <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs transition-all duration-200">
          <tab.icon color={isActive ? "#F59D0E" : undefined} />
        </span>

        <span className="select-none whitespace-nowrap">{tab.label}</span>

        {/* Menu Button - Only shown on active tab, always visible */}
        {isActive && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-4 h-4 p-0 ml-1 hover:bg-gray-200 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleMenuAction("setFirst")}>
                <FlagIcon />
                Set as first page
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuAction("rename")}>
                <EditIcon />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuAction("copy")}>
                <CopyIcon />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuAction("duplicate")}>
                <DuplicateIcon />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleMenuAction("delete")}
                className="text-red-600 focus:text-red-600"
              >
                <DeleteIcon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </button>
    </div>
  );
}
