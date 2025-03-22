import React from "react";
import { SuceessContainer, SuccessHeader, Succestext,BookDetails,
     BookMeta, GobackButton, SuccessCard,IconCheckbox } from "./success_style";
import { Header } from '../../components/header/Header.tsx';


const SuccessPage: React.FC = () => {
    const MetaData = JSON.parse(localStorage.getItem('Metadata') || '{}');
    console.log(MetaData);
    return (

        <SuceessContainer>
            <div><Header /></div>
            <SuccessCard>
                <IconCheckbox>
                <IconCheckbox className="far fa-check-square" />
                </IconCheckbox>
                
                    <SuccessHeader>
                        <h2>Success</h2>
                    </SuccessHeader>
                <Succestext>
                    <p>Your story has been </p>
                    <p>successfully uploaded!</p>
                </Succestext>
                <BookDetails>
               <BookMeta>Booktitle: {MetaData.bookTitle} </BookMeta>
               <BookMeta>BookId: {MetaData.bookId}  </BookMeta>
                </BookDetails>
                <GobackButton onClick={() => window.location.href = '/main'}>Go back to Home</GobackButton>
            </SuccessCard>
        </SuceessContainer>
    );
};
export default SuccessPage;