import CurrencyInput from "react-native-currency-input";
import styled from "styled-components/native";

export const InputContainer = styled.View`
    gap: 4px;    
`;
export const InputLabel = styled.Text`
    font-size: 15px;
    color: #000000;
    font-weight: 500;
`;
export const InputError = styled.Text`
    font-size: 12px;
    color: #ff4d4d;
`;

export const TextInputContainer = styled.View`
    outline-width: 1px;
    outline-color: #b1b1b1;
    outline-style: solid;
    border-radius: 4px;
    height: 40px;
    padding-horizontal: 8px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: white;
    gap: 6px;
`;

export const StyledInput = styled.TextInput.attrs({
    placeholderClassName: "text-gray-200",
})`
    font-size: 16px;
    color: #000000;    
    margin: 0px;
    padding: 0px;
    flex:1
`;

export const InputText = styled.Text<{ isPlaceholder?: boolean }>`    
    font-size: 16px;
    color: ${({ isPlaceholder }) => (isPlaceholder ? "#a5a5a5" : "#ffffff")};    
`;

export const StyledCurrencyInput = styled(CurrencyInput).attrs({
    placeholderClassName: "text-gray-200",
})`
    font-size: 16px;
    color: #ffffff;    
    margin: 0px;
    padding: 0px;
`;
