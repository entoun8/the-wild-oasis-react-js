import React from "react";

// Menu components converted from styled-components to plain HTML elements

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Menu({ children, ...props }: MenuProps): React.JSX.Element {
  return (
    <div 
      data-component="menu"
      {...props}
    >
      {children}
    </div>
  );
}

interface MenuToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MenuToggle({ children, ...props }: MenuToggleProps): React.JSX.Element {
  return (
    <button 
      data-component="menu-toggle"
      {...props}
    >
      {children}
    </button>
  );
}

interface Position {
  x: number;
  y: number;
}

interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  position?: Position;
}

export function MenuList({ children, position = { x: 0, y: 0 }, ...props }: MenuListProps): React.JSX.Element {
  return (
    <ul 
      data-component="menu-list"
      style={{
        position: 'fixed',
        right: `${position.x}px`,
        top: `${position.y}px`,
      }}
      {...props}
    >
      {children}
    </ul>
  );
}

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MenuButton({ children, ...props }: MenuButtonProps): React.JSX.Element {
  return (
    <button 
      data-component="menu-button"
      {...props}
    >
      {children}
    </button>
  );
}