import React from 'react';
import { ToolbarItem as ToolbarItemType } from '../types';
import { useToolbar } from '../context/ToolbarContext';
import '../styles/ToolbarItem.css';

interface ToolbarItemProps {
  item: ToolbarItemType;
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({ item }) => {
  const { state, executeAction } = useToolbar();
  const isActive = state.activeItem === item.id;
  
  const handleClick = () => {
    if (!item.disabled) {
      executeAction(item.id);
    }
  };
  
  const itemClassName = `vcut-toolbar-item ${isActive ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`.trim();
  
  return (
    <button
      className={itemClassName}
      onClick={handleClick}
      disabled={item.disabled}
      title={item.tooltip || item.label}
      aria-label={item.label}
      data-shortcut={item.shortcut}
    >
      <span className="vcut-toolbar-item-icon">{item.icon}</span>
      <span className="vcut-toolbar-item-label">{item.label}</span>
      {item.shortcut && <span className="vcut-toolbar-item-shortcut">{item.shortcut}</span>}
    </button>
  );
};

export default ToolbarItem;
