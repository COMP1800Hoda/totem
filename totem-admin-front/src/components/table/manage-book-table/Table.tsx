import {Table as TableBase} from "@tanstack/react-table";
import {StyledManageBookTable} from "./ManageBookTable.styled.ts";
import {TableHead} from "./TableHead.tsx";
import {TableBody} from "./TableBody.tsx";
import {Storybook} from "../../../types/Storybook.ts";
import {Container} from "../../Container.tsx";

type TableProps = {
  table: TableBase<Storybook>,
  isLoading: boolean,
  isError: boolean,
  error: Error | null
}
export const Table = ({table,isLoading, isError, error }: TableProps) => {

  if (isLoading) {
    return (
      <Container className="loading-table">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading...
      </Container>
    );
  }

  if (isError) {
    console.log(error)
    return <div>Error occured</div>;
  }
  return (
      <StyledManageBookTable className="table">
        <TableHead table={table} />
        <TableBody table={table}/>
      </StyledManageBookTable>
  )
}