import styled from 'styled-components/native';

export const SContainer = styled.ScrollView`
  flex: 1;
  padding-horizontal: 40px;
  background-color: ${props => props.theme.colors.white};
`;
export const SHeader = styled.View`
  flex-direction: row;
  padding-vertical: 35px;
  align-items: center;
`;
export const SSides = styled.View`
  flex: 1;
  align-items: flex-end;
`;
export const SCentered = styled.View`
  flex: 3;
  align-items: center;
`;
export const SContent = styled.View`
  padding-bottom: 50px;
`;
