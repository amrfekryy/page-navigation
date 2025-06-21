"use client"

import type React from "react"

import { useState } from "react"
import PageNavigation from "./components/page-navigation"
import {
  Info,
  FileText,
  File,
  CheckCircle,
  Calendar,
  Settings,
  Users,
  Database,
  BarChartIcon as Chart,
} from "lucide-react"

interface Tab {
  id: string
  label: string
  icon: React.ReactNode
  completed?: boolean
  isEditing?: boolean
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState("info")
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "info",
      label: "Info",
      icon: <Info className="w-4 h-4" />,
    },
    {
      id: "details",
      label: "Details",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "other",
      label: "Other",
      icon: <File className="w-4 h-4" />,
    },
    {
      id: "ending",
      label: "Ending",
      icon: <CheckCircle className="w-4 h-4" />,
      completed: true,
    },
  ])

  const [showManyTabs, setShowManyTabs] = useState(false)
  const [manyTabs, setManyTabs] = useState<Tab[]>([
    {
      id: "info",
      label: "Info",
      icon: <Info className="w-4 h-4" />,
    },
    {
      id: "details",
      label: "Details",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "other",
      label: "Other",
      icon: <File className="w-4 h-4" />,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "users",
      label: "Users",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "database",
      label: "Database",
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <Chart className="w-4 h-4" />,
    },
    {
      id: "ending",
      label: "Ending",
      icon: <CheckCircle className="w-4 h-4" />,
      completed: true,
    },
  ])

  const currentTabs = showManyTabs ? manyTabs : tabs
  const setCurrentTabs = showManyTabs ? setManyTabs : setTabs

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    console.log("Tab changed to:", tabId)
  }

  const handleAddPage = () => {
    console.log("Add page clicked")
  }

  const handleTabsReorder = (reorderedTabs: Tab[]) => {
    setCurrentTabs(reorderedTabs)
    console.log(
      "Tabs reordered:",
      reorderedTabs.map((t) => t.label),
    )
  }

  const handleTabAdd = (newTab: Tab, insertIndex?: number) => {
    if (insertIndex !== undefined) {
      console.log(`Tab "${newTab.label}" added at position ${insertIndex}`)
    } else {
      console.log(`Tab "${newTab.label}" added to end`)
    }
  }

  const handleTabDelete = (tabId: string) => {
    const deletedTab = currentTabs.find((t) => t.id === tabId)
    console.log(`Tab "${deletedTab?.label}" deleted`)
  }

  const handleTabRename = (tabId: string, newName: string) => {
    console.log(`Tab renamed to "${newName}"`)
  }

  const handleTabDuplicate = (tabId: string) => {
    const duplicatedTab = currentTabs.find((t) => t.id === tabId)
    console.log(`Tab "${duplicatedTab?.label}" duplicated`)
  }

  const handleSetFirstPage = (tabId: string) => {
    const tab = currentTabs.find((t) => t.id === tabId)
    console.log(`Tab "${tab?.label}" set as first page`)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Refactored Page Navigation with shadcn/ui</h1>
        <p className="text-gray-600 mb-4">
          Now using modular components with shadcn/ui DropdownMenu and Tooltip components for better maintainability and
          consistency.
        </p>

        <div className="mb-6">
          <button
            onClick={() => setShowManyTabs(!showManyTabs)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {showManyTabs ? "Show Few Tabs" : "Show Many Tabs"}
          </button>
        </div>

        <PageNavigation
          tabs={currentTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onAddPage={handleAddPage}
          onTabsReorder={handleTabsReorder}
          onTabAdd={handleTabAdd}
          onTabDelete={handleTabDelete}
          onTabRename={handleTabRename}
          onTabDuplicate={handleTabDuplicate}
          onSetFirstPage={handleSetFirstPage}
        />

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Current Tab: {activeTab}</h2>
          <p className="text-gray-600 mb-4">
            Current tab order:{" "}
            {currentTabs
              .filter((t) => !t.isEditing)
              .map((t) => t.label)
              .join(" → ")}
          </p>

          <div className="text-sm text-gray-500">
            <p>
              <strong>Refactored Features:</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Modular component structure with separate files</li>
              <li>shadcn/ui DropdownMenu for tab actions</li>
              <li>shadcn/ui Tooltip for better UX</li>
              <li>shadcn/ui Button components throughout</li>
              <li>Improved maintainability and code organization</li>
              <li>Type-safe interfaces in separate types file</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
