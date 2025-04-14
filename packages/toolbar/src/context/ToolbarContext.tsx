import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ToolbarContextType, ToolbarItem, ToolbarState } from '../types';

// Initial state
const initialState: ToolbarState = {
  config: {
    groups: [],
    orientation: 'horizontal',
    size: 'medium',
    position: 'top'
  },
  activeItem: null
};

// Action types
type ActionType = 
  | { type: 'REGISTER_ITEM'; payload: ToolbarItem }
  | { type: 'UNREGISTER_ITEM'; payload: string }
  | { type: 'SET_ACTIVE_ITEM'; payload: string | null }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<ToolbarItem> } };

// Reducer function
const toolbarReducer = (state: ToolbarState, action: ActionType): ToolbarState => {
  switch (action.type) {
    case 'REGISTER_ITEM': {
      const newItem = action.payload;
      const groupIndex = state.config.groups.findIndex(g => g.id === newItem.group);
      
      if (groupIndex === -1) {
        // Create a new group if it doesn't exist
        return {
          ...state,
          config: {
            ...state.config,
            groups: [
              ...state.config.groups,
              {
                id: newItem.group || 'default',
                label: newItem.group || 'Default',
                items: [newItem]
              }
            ]
          }
        };
      } else {
        // Add to existing group
        const updatedGroups = [...state.config.groups];
        updatedGroups[groupIndex] = {
          ...updatedGroups[groupIndex],
          items: [...updatedGroups[groupIndex].items, newItem]
        };
        
        return {
          ...state,
          config: {
            ...state.config,
            groups: updatedGroups
          }
        };
      }
    }
    
    case 'UNREGISTER_ITEM': {
      const itemId = action.payload;
      const updatedGroups = state.config.groups.map(group => ({
        ...group,
        items: group.items.filter(item => item.id !== itemId)
      })).filter(group => group.items.length > 0);
      
      return {
        ...state,
        config: {
          ...state.config,
          groups: updatedGroups
        }
      };
    }
    
    case 'SET_ACTIVE_ITEM':
      return {
        ...state,
        activeItem: action.payload
      };
      
    case 'UPDATE_ITEM': {
      const { id, updates } = action.payload;
      const updatedGroups = state.config.groups.map(group => ({
        ...group,
        items: group.items.map(item => 
          item.id === id ? { ...item, ...updates } : item
        )
      }));
      
      return {
        ...state,
        config: {
          ...state.config,
          groups: updatedGroups
        }
      };
    }
    
    default:
      return state;
  }
};

// Create context
const ToolbarContext = createContext<ToolbarContextType | undefined>(undefined);

// Provider component
export const ToolbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(toolbarReducer, initialState);
  
  const registerItem = (item: ToolbarItem) => {
    dispatch({ type: 'REGISTER_ITEM', payload: item });
  };
  
  const unregisterItem = (id: string) => {
    dispatch({ type: 'UNREGISTER_ITEM', payload: id });
  };
  
  const setActiveItem = (id: string | null) => {
    dispatch({ type: 'SET_ACTIVE_ITEM', payload: id });
  };
  
  const executeAction = (id: string) => {
    // Find the item and execute its action
    for (const group of state.config.groups) {
      const item = group.items.find(item => item.id === id);
      if (item && !item.disabled) {
        item.action();
        setActiveItem(id);
        break;
      }
    }
  };
  
  const updateItemState = (id: string, updates: Partial<ToolbarItem>) => {
    dispatch({ 
      type: 'UPDATE_ITEM', 
      payload: { id, updates } 
    });
  };
  
  const value: ToolbarContextType = {
    state,
    registerItem,
    unregisterItem,
    setActiveItem,
    executeAction,
    updateItemState
  };
  
  return (
    <ToolbarContext.Provider value={value}>
      {children}
    </ToolbarContext.Provider>
  );
};

// Hook for using the toolbar context
export const useToolbar = (): ToolbarContextType => {
  const context = useContext(ToolbarContext);
  if (context === undefined) {
    throw new Error('useToolbar must be used within a ToolbarProvider');
  }
  return context;
};
