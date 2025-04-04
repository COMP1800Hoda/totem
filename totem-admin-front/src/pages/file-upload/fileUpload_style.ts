import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 570px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  color: #5c5552;
  padding-top: 20px;
`;

export const UploadHeader = styled.h2`
  text-align: left;
  color: #5c5552;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
  gap: 50px;
  margin-top: 50px;
`;

export const FormRow = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  margin-left: 8px;
  margin-top: 30px;
`;

export const FormGroup = styled.div`
  position: relative;
  flex: 1;
  width: auto;
  margin-bottom: 10px;
  
  &.required{
    > label:first-child {
      display: block;
      &:after {
        position: relative;
        top: 2px;
        margin-left: 6px;
        color: red;
        font-weight: bold;
        content: '*';
      }
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 9px;
  margin-bottom: 11px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: black;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: black;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: black;
`;

export const SubPreButton = styled.button`
  background-color: #decbb7;
  color: white;
  padding: 12px 20px;
  font-size: 18px;
  border: solid;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
`;

export const FileInputContainer = styled.div`
  width: 100%;
  max-width: 560px;
  min-height: 200px;
  height: auto;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 2rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: 2vh auto;
  margin-bottom: 10px;
  text-align: center;
`;

export const FullWidthLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const IconAndText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CustomFileChoose = styled.button`
  background-color: white;
  color: #ccc;
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: solid;
  margin-top: 10px;
  transition: background-color 0.3s;
`;

export const Icon = styled.i`
  color: #decbb7;
  font-size: 90px;
  margin-bottom: 10px;
`;

export const AddButton = styled.button`
  background-color: #decbb7;
  border: solid;
  color: white;
  padding: 6px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  width: 10%;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #decbb7;
  font-size: 24px;
  padding: 5px;
  margin-bottom: 5px;

  &:hover {
    color: #555;
  }
`;

export const FileList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

export const FileItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  width: 150px;
`;

export const FilePreview = styled.img`
  max-width: 100%;
  max-height: 100px;
`;

export const FileIcon = styled.i`
  font-size: 24px;
`;

export const FileDetails = styled.div`
  p {
    margin: 5px 0;
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  min-height: 50px;
  gap: 10px;
  box-sizing: border-box;

`;

export const PreviewRemoveButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: black;
  font-size: 16px;
  margin-left: 10px;
`;

export const GenerateButton = styled.button`
  background-color: #decbb7;
  border: solid;
  color: white;
  padding: 2px 4px;
  margin-top: 2px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  width: 14%;
  height: 40px;
  line-height: 30px;
  display: inline-block;
`;
