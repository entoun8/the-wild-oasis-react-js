interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

const Heading = ({ as = "h1", children }: HeadingProps) => {
  const Component = as;
  
  const baseStyles = "font-bold text-gray-800";
  const sizeStyles = {
    h1: "text-3xl",
    h2: "text-2xl", 
    h3: "text-xl",
    h4: "text-lg",
    h5: "text-base",
    h6: "text-sm"
  };

  return (
    <Component className={`${baseStyles} ${sizeStyles[as]}`}>
      {children}
    </Component>
  );
};

export default Heading;