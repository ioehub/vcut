import React from 'react';
import { ToolbarGroup as ToolbarGroupType } from '../types';
import ToolbarItem from './ToolbarItem';
import '../styles/ToolbarGroup.css';

interface ToolbarGroupProps {
  group: ToolbarGroupType;
}

const ToolbarGroup: React.FC<ToolbarGroupProps> = ({ group }) => {
  return (
    <div className="vcut-toolbar-group" role="group" aria-label={group.label}>
      <div className="vcut-toolbar-group-label">{group.label}</div>
      <div className="vcut-toolbar-group-items">
        {group.items.map((item) => (
          <ToolbarItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ToolbarGroup;
