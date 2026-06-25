import CurrencyInput from "react-native-currency-input";
import styled from "styled-components/native";

export const InputContainer = styled.View`
    gap: 4px;    
`;
export const InputLabel = styled.Text`
    font-size: 14px;
    color: #ffffff;
`;
export const InputError = styled.Text`
    font-size: 12px;
    color: #ff4d4d;
`;

export const TextInputContainer = styled.View`
    outline-width: 1px;
    outline-color: #a5a5a5;
    outline-style: solid;
    border-radius: 4px;
    height: 40px;
    padding-horizontal: 8px;
    justify-content: center;
`;

export const StyledInput = styled.TextInput.attrs({
    placeholderClassName: "text-gray-200",
})`
    font-size: 16px;
    color: #ffffff;    
    margin: 0px;
    padding: 0px;
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
