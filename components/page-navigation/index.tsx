"use client";

import { Button } from "@/components/ui/button";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FileIcon } from "../icons/file";
import { ScrollButton } from "./scroll-button";
import { SortableTab } from "./tab";
import { TabConnector } from "./tab-connector";
import type { PageNavigationProps, Tab } from "./types";

export default function PageNavigation({
  tabs: initialTabs,
  activeTab = "info",
  onTabChange,
  onAddPage,
  onTabsReorder,
  onTabAdd,
  onTabDelete,
  onTabRename,
  onTabDuplicate,
  onSetFirstPage,
}: PageNavigationProps) {
  const [tabs, setTabs] = useState(initialTabs);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [needsScrolling, setNeedsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Update tabs when initialTabs prop changes
  useEffect(() => {
    setTabs(initialTabs);
  }, [initialTabs]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const hasOverflow = scrollWidth > clientWidth;

      setNeedsScrolling(hasOverflow);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollToStart = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollToEnd = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        left: scrollWidth - clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToShowEditingTab = () => {
    if (scrollContainerRef.current) {
      const editingTab = scrollContainerRef.current.querySelector(
        '[data-editing="true"]'
      );
      if (editingTab) {
        const container = scrollContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const tabRect = editingTab.getBoundingClientRect();

        const isFullyVisible =
          tabRect.left >= containerRect.left &&
          tabRect.right <= containerRect.right;

        if (!isFullyVisible) {
          const scrollLeft =
            container.scrollLeft + (tabRect.left - containerRect.left) - 20;
          container.scrollTo({
            left: Math.max(0, scrollLeft),
            behavior: "smooth",
          });
        }
      }
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tabs]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => checkScrollButtons();
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const hasEditingTab = tabs.some((tab) => tab.isEditing);
    if (hasEditingTab) {
      setTimeout(scrollToShowEditingTab, 100);
    }
  }, [tabs]);

  const handleTabClick = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab?.isEditing) return;
    onTabChange?.(tabId);
  };

  const handleAddPage = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      label: "",
      icon: FileIcon,
      isEditing: true,
    };

    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    // Set the new tab as active
    onTabChange?.(newTab.id);
  };

  const handleAddTabBetween = (index: number) => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      label: "",
      icon: FileIcon,
      isEditing: true,
    };

    const newTabs = [...tabs];
    newTabs.splice(index + 1, 0, newTab);
    setTabs(newTabs);
    // Set the new tab as active
    onTabChange?.(newTab.id);
  };

  const handleEditSave = (tabId: string, name: string) => {
    setTabs((prevTabs) => {
      const newTabs = prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, label: name, isEditing: false } : tab
      );

      const savedTab = newTabs.find((t) => t.id === tabId);
      if (savedTab) {
        const insertIndex = newTabs.indexOf(savedTab);
        if (insertIndex === newTabs.length - 1) {
          onTabAdd?.(savedTab);
          onAddPage?.();
        } else {
          onTabAdd?.(savedTab, insertIndex);
        }
      }

      return newTabs;
    });
    // Notify parent of tab change
    onTabChange?.(tabId);
  };

  const handleEditCancel = (tabId: string) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    // If we cancelled the active tab, switch to the first available tab
    if (activeTab === tabId) {
      const remainingTabs = tabs.filter((tab) => tab.id !== tabId);
      if (remainingTabs.length > 0) {
        onTabChange?.(remainingTabs[0].id);
      }
    }
  };

  const handleMenuAction = (action: string, tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab) return;

    switch (action) {
      case "setFirst":
        setTabs((prevTabs) => {
          const tabIndex = prevTabs.findIndex((t) => t.id === tabId);
          if (tabIndex > 0) {
            const newTabs = [...prevTabs];
            const [movedTab] = newTabs.splice(tabIndex, 1);
            newTabs.unshift(movedTab);
            onSetFirstPage?.(tabId);
            return newTabs;
          }
          return prevTabs;
        });
        break;

      case "rename":
        setTabs((prevTabs) =>
          prevTabs.map((t) => (t.id === tabId ? { ...t, isEditing: true } : t))
        );
        break;

      case "copy":
        // Copy action - no functionality implemented yet
        console.log(`Copy action for tab: ${tab.label}`);
        break;

      case "duplicate":
        const duplicatedTab: Tab = {
          id: `tab-${Date.now()}`,
          label: `${tab.label} Copy`,
          icon: tab.icon,
        };
        setTabs((prevTabs) => {
          const tabIndex = prevTabs.findIndex((t) => t.id === tabId);
          const newTabs = [...prevTabs];
          newTabs.splice(tabIndex + 1, 0, duplicatedTab);
          onTabDuplicate?.(tabId);
          return newTabs;
        });
        // Set the duplicated tab as active after state update
        setTimeout(() => {
          onTabChange?.(duplicatedTab.id);
        }, 0);
        break;
        
        case "delete":
          if (tabs.length > 1) {
            setTabs((prevTabs) => {
              const newTabs = prevTabs.filter((t) => t.id !== tabId);
              if (activeTab === tabId && newTabs.length > 0) {
                console.log({activeTab, newTabs});
                setTimeout(() => {
                  onTabChange?.(newTabs[0].id);
                }, 0);
              }
              onTabDelete?.(tabId);
              return newTabs;
            });
          }
        break;
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTabs((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newTabs = arrayMove(items, oldIndex, newIndex);
        onTabsReorder?.(newTabs);
        return newTabs;
      });
    }

    setActiveId(null);
  };

  const activeTab_obj = tabs.find((tab) => tab.id === activeId);
  const isDragging = activeId !== null;

  const draggableTabs = tabs.filter((tab) => !tab.isEditing);

  return (
    <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
      <ScrollButton
        direction="left"
        onClick={scrollToStart}
        disabled={!canScrollLeft}
        visible={needsScrolling}
      />

      <div
        ref={scrollContainerRef}
        className="flex items-center overflow-x-auto flex-1 min-w-0 p-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbarWidth: "none",
        }}
        onWheel={(e) => {
          e.preventDefault();
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += e.deltaY;
            checkScrollButtons();
          }
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={draggableTabs.map((tab) => tab.id)}
            strategy={horizontalListSortingStrategy}
          >
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <div data-editing={tab.isEditing ? "true" : "false"}>
                  <SortableTab
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onTabClick={handleTabClick}
                    isDragging={activeId === tab.id}
                    onEditSave={handleEditSave}
                    onEditCancel={handleEditCancel}
                    onMenuAction={handleMenuAction}
                    isAtEnd={index === tabs.length - 1}
                    isAtStart={index === 0}
                  />
                </div>

                {index < tabs.length - 1 &&
                  !tab.isEditing &&
                  !tabs[index + 1]?.isEditing && (
                    <TabConnector
                      isVisible={activeId === null}
                      onAddTab={() => handleAddTabBetween(index)}
                      isDragging={isDragging}
                    />
                  )}
              </React.Fragment>
            ))}
          </SortableContext>

          <DragOverlay>
            {activeId && activeTab_obj ? (
              <div className="flex items-center gap-1">
                <div
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium shadow-lg ring-2 ring-blue-300 bg-white border border-gray-200
                    ${
                      activeTab === activeTab_obj.id
                        ? "text-gray-900"
                        : "text-gray-600"
                    }
                  `}
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs">
                    <activeTab_obj.icon
                      color={
                        activeTab === activeTab_obj.id ? "#F59D0E" : undefined
                      }
                    />
                  </span>
                  {activeTab_obj.label}
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {!tabs[tabs.length - 1]?.isEditing && (
          <>
            {/* Last connector - no add functionality, no hover effects */}
            <TabConnector
              isVisible={activeId === null}
              isDragging={isDragging}
              disableHover={true}
            />

            <Button
              variant="ghost"
              onClick={handleAddPage}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 border border-transparent hover:bg-white hover:text-gray-900 hover:border-gray-200 shadow-sm flex-shrink-0 rounded-md transition-all duration-300 ease-out"
            >
              <Plus className="w-4 h-4" />
              Add page
            </Button>
          </>
        )}
      </div>

      <ScrollButton
        direction="right"
        onClick={scrollToEnd}
        disabled={!canScrollRight}
        visible={needsScrolling}
      />
    </div>
  );
}
