import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

// Exported components for use elsewhere
export function TodayList({ children, ...props }) {
  return (
    <ul 
      data-component="today-list"
      {...props}
    >
      {children}
    </ul>
  );
}

export function NoActivity({ children, ...props }) {
  return (
    <p 
      data-component="no-activity"
      {...props}
    >
      {children}
    </p>
  );
}

function Today() {
  return (
    <div data-component="styled-today">
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
    </div>
  );
}

export default Today;
