import styled from 'styled-components';


export const MenuItem = styled.ul`
  
`

export const MenuItemTitle = styled.h3`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`

export const StyledMenuSubItem = styled.li`
  height: 50px;
  width: 100%;
  display: flex;
  border-top: 1px solid var(--color-border-gray);
  
  a {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
