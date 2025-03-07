import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow: auto;
  position: relative;
  // should be fixed height
  height: calc(100vh - 226px - 56px);
`;

export const LazyTableContainer = styled.div`
  table {
    display: grid;
  }
  thead {
    display: grid;
    position: sticky;
    top: 0;
    z-index: 1;
    th {
      display: flex;
    }
    tr {
      display: flex;
      width: 100%;
      padding: 3px 0;
      background-color: #fff;
    }
  }

  tbody {
    display: grid;
    //needed for absolute positioning of rows
    position: relative;
    tr {
      display: flex;
      position: absolute;
      width: 100%;
      cursor: pointer;
      border-bottom: 1px solid var(--mantine-color-gray-3);

      &:hover,
      &:focus {
        background-color: var(--mantine-color-default-hover);
      }

      td {
        padding: 16px 10px;
      }
    }
  }
  .cell-num {
    word-break: break-all;
  }
`;
