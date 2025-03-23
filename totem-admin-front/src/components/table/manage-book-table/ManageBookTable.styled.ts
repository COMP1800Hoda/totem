import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 222px);
  overflow: scroll;
`

export const StyledManageBookTable = styled.table`
  table-layout: fixed;
  border-collapse: collapse;

  thead {
    position: sticky;
    top: 0;
  }

  tbody {
    vertical-align: middle;

    tr {
      cursor: pointer;
      background-color: #fff;

      &:hover {
        background-color: #ededed
      }
    }
  }

  th {
    font-size: 14px;
    text-wrap: nowrap;
    border-bottom: 1px solid #dcdcdc;
  }

  td {
    font-size: 14px;
    //word-break: break-all;
    background: none;
  }

`