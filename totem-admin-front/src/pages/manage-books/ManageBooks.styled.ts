import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  
  select {
    width: 140px;
    margin-right: 10px;
    font-size: 13px;
    height: 40px; 
  }
  input {
    flex:1;
    height: 40px;
    font-size: 13px;
  }
  
  button{
    width: 100px;
    height: 40px;
    background-color: var(--color-primary);
    margin-left: 10px;
    font-size: 13px;
    
    &:hover{
      background-color: var(--color-primary-hover);
    }
  }
`