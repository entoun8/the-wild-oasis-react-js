import React, { createContext, useContext } from "react";

interface TableContextType {
  columns: string;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

interface TableProps {
  columns: string;
  children: React.ReactNode;
}

function Table({ columns, children }: TableProps): React.JSX.Element {
  return (
    <TableContext.Provider value={{ columns }}>
      <div role="table" data-columns={columns}>
        {children}
      </div>
    </TableContext.Provider>
  );
}

interface HeaderProps {
  children: React.ReactNode;
}

function Header({ children }: HeaderProps): React.JSX.Element {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Header must be used within a Table");
  }
  const { columns } = context;
  return (
    <div role="row" data-columns={columns} data-table-header="true">
      {children}
    </div>
  );
}

interface RowProps {
  children: React.ReactNode;
}

function Row({ children }: RowProps): React.JSX.Element {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Row must be used within a Table");
  }
  const { columns } = context;
  return (
    <div role="row" data-columns={columns}>
      {children}
    </div>
  );
}

interface BodyProps<T> {
  data: T[] | undefined;
  render: (item: T) => React.ReactNode;
}

function Body<T>({ data, render }: BodyProps<T>): React.JSX.Element {
  if (!data?.length) return <p data-table-empty="true">No data to show at the moment</p>;

  return (
    <section role="rowgroup">
      {data.map(render)}
    </section>
  );
}

interface FooterProps {
  children: React.ReactNode;
}

function Footer({ children }: FooterProps): React.JSX.Element {
  return (
    <footer data-table-footer="true">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;