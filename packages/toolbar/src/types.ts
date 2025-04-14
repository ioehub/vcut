// Types for the toolbar package

export interface ToolbarItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  disabled?: boolean;
  tooltip?: string;
  shortcut?: string;
  group?: string;
}

export interface ToolbarGroup {
  id: string;
  label: string;
  items: ToolbarItem[];
}

export interface ToolbarConfig {
  groups: ToolbarGroup[];
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface ToolbarState {
  config: ToolbarConfig;
  activeItem: string | null;
}

export interface ToolbarContextType {
  state: ToolbarState;
  registerItem: (item: ToolbarItem) => void;
  unregisterItem: (id: string) => void;
  setActiveItem: (id: string | null) => void;
  executeAction: (id: string) => void;
  updateItemState: (id: string, updates: Partial<ToolbarItem>) => void;
}
