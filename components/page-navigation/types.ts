import { IconProps } from "@/lib/types";
import { FC } from "react";

export interface Tab {
  id: string;
  label: string;
  icon: FC<IconProps>;
  isEditing?: boolean;
}

export interface PageNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange?: (tabId: string) => void
  onAddPage?: () => void
  onTabsReorder?: (tabs: Tab[]) => void
  onTabAdd?: (tab: Tab, insertIndex?: number) => void
  onTabDelete?: (tabId: string) => void
  onTabRename?: (tabId: string, newName: string) => void
  onTabDuplicate?: (tabId: string) => void
  onSetFirstPage?: (tabId: string) => void
}
