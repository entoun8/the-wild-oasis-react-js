interface RowProps {
  type?: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Row = ({ type = "vertical", children }: RowProps) => {
  const baseStyles = "flex";
  const typeStyles = {
    horizontal: "flex-row items-center gap-4",
    vertical: "flex-col gap-2"
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      {children}
    </div>
  );
};

export default Row;