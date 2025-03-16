import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100vw;
  overflow: scroll;
`

export const StyledManageBookTable = styled.table`
  table-layout: fixed;
  tbody{
    vertical-align: middle;
  }
  th {
    font-size: 14px;
    text-wrap: nowrap;
  }
  td {
    font-size: 14px;
    //word-break: break-all;
  }
  
`