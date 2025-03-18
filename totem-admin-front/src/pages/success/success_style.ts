import styled from "styled-components";

export const SuceessContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center; 
width: 570px;
min-height: 100vh;
padding: 1em;
margin: 0 auto; 
background-color: #F8F0E9; }
`;

export const SuccessCard = styled.div`
display: flex;
flex-direction: column;
// padding: 16px;
background: white;
border-radius: 8px;
width: 100%; /* Adjust as needed */
max-width: 500px; 
height:500px;
justify-content: center; 
align-items: center;
text-align:left;
`;
export const SuccessHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.5em;
`;

export const Succestext = styled.div`
  font-size: 1.0em;
  color: #333; /* Dark gray color for text */
  text-align: left;
  margin-left:8px;
  padding:0;
`;
export const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align:center;
//   margin-right:60px;
`;
export const BookMeta = styled.p`
  font-size: 12px;
  color: #333;
  gap:0;
  padding:0;
  
`;

export const GobackButton = styled.button`
  width: 35%;
  margin-top: 16px;
  background: #DECBB7;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
export const IconCheckbox = styled.i`
  font-size: 100px; 
  color:#DECBB7; 
`;