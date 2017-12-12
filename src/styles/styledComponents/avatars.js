import styled from 'styled-components/native';

const avatarSmall = 45;
const avatarSmallRadius = avatarSmall / 2;
const StyledAvatarSmall = styled.Image`
  width: ${avatarSmall};
  height: ${avatarSmall};
  border-radius: ${avatarSmallRadius};
`;

export const StyledAvatar = styled.Image`
width: ${props => props.size};
height: ${props => props.size};
border-radius: ${props => props.size / 2};
`
export default StyledAvatarSmall;
