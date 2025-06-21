"use client";


import { CheckIcon } from "@/components/icons/check";
import { FileIcon } from "@/components/icons/file";
import { InfoIcon } from "@/components/icons/info";
import { IconProps } from "@/lib/types";
import { FC, useState } from "react";
import PageNavigation from "../components/page-navigation";
import { Tab } from "@/components/page-navigation/types";

const fewTabs: Tab[] = [
  {
    id: "info",
    label: "Info",
    icon: InfoIcon,
  },
  {
    id: "details",
    label: "Details",
    icon: FileIcon,
  },
  {
    id: "other",
    label: "Other",
    icon: FileIcon,
  },
  {
    id: "ending",
    label: "Ending",
    icon: CheckIcon,
  },
];

const moreTabs: Tab[] = [
  {
    id: "info",
    label: "Info",
    icon: InfoIcon,
  },
  {
    id: "details",
    label: "Details",
    icon: FileIcon,
  },
  {
    id: "other",
    label: "Other",
    icon: FileIcon,
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: FileIcon,
  },
  {
    id: "settings",
    label: "Settings",
    icon: FileIcon,
  },
  {
    id: "users",
    label: "Users",
    icon: FileIcon,
  },
  {
    id: "database",
    label: "Database",
    icon: FileIcon,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: FileIcon,
  },
  {
    id: "ending",
    label: "Ending",
    icon: CheckIcon,
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("info");
  const [tabs, setTabs] = useState<Tab[]>(fewTabs);

  const [showManyTabs, setShowManyTabs] = useState(false);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log("Tab changed to:", tabId);
  };

  const handleAddPage = () => {
    console.log("Add page clicked");
  };

  const handleTabsReorder = (reorderedTabs: Tab[]) => {
    setTabs(reorderedTabs);
    console.log(
      "Tabs reordered:",
      reorderedTabs.map((t) => t.label)
    );
  };

  const handleTabAdd = (newTab: Tab, insertIndex?: number) => {
    if (insertIndex !== undefined) {
      console.log(`Tab "${newTab.label}" added at position ${insertIndex}`);
    } else {
      console.log(`Tab "${newTab.label}" added to end`);
    }
  };

  const handleTabDelete = (tabId: string) => {
    const deletedTab = tabs.find((t) => t.id === tabId);
    console.log(`Tab "${deletedTab?.label}" deleted`);
  };

  const handleTabRename = (tabId: string, newName: string) => {
    console.log(`Tab renamed to "${newName}"`);
  };

  const handleTabDuplicate = (tabId: string) => {
    const duplicatedTab = tabs.find((t) => t.id === tabId);
    console.log(`Tab "${duplicatedTab?.label}" duplicated`);
  };

  const handleSetFirstPage = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    console.log(`Tab "${tab?.label}" set as first page`);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Page navigation component with Next.js and Tailwind
        </h1>
        <p className="text-gray-600 mb-4">
          Now using modular components with shadcn/ui DropdownMenu and Tooltip
          components for better maintainability and consistency.
        </p>

        <div className="mb-6">
          <button
            onClick={() =>
              setShowManyTabs((s) => {
                setTabs(s ? fewTabs : moreTabs);
                return !s;
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {showManyTabs ? "Show Few Tabs" : "Show Many Tabs"}
          </button>
        </div>

        <PageNavigation
          tabs={tabs}
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
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Current Tab: {activeTab}
          </h2>
          <p className="text-gray-600 mb-4">
            Current tab order:{" "}
            {tabs
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
  );
}
