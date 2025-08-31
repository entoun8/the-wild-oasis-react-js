// TodayItem components converted from styled-components to plain HTML elements

export function TodayItem({ children, ...props }) {
  return (
    <li 
      data-component="today-item"
      {...props}
    >
      {children}
    </li>
  );
}

export function Guest({ children, ...props }) {
  return (
    <div 
      data-component="guest"
      {...props}
    >
      {children}
    </div>
  );
}