import React from 'react';
import { useToolbar } from '../context/ToolbarContext';
import ToolbarGroup from './ToolbarGroup';
import '../styles/Toolbar.css';

interface ToolbarProps {
  className?: string;
  style?: React.CSSProperties;
}

const Toolbar: React.FC<ToolbarProps> = ({ className = '', style }) => {
  const { state } = useToolbar();
  const { config } = state;
  
  const toolbarClassName = `vcut-toolbar ${config.orientation || 'horizontal'} ${config.position || 'top'} ${config.size || 'medium'} ${className}`.trim();
  
  return (
    <div className={toolbarClassName} style={style} role="toolbar" aria-orientation={config.orientation}>
      {config.groups.map((group) => (
        <ToolbarGroup 
          key={group.id} 
          group={group} 
        />
      ))}
    </div>
  );
};

export default Toolbar;
