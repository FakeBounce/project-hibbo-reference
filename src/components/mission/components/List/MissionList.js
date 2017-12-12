import React from 'react';
import { shape, func, arrayOf, number, string, bool } from 'prop-types';
import { getTrueNumber } from 'utils/i18n';
import MissionItem from './MissionItem';
import { StyledWhiteContainer, StyledWhiteWrapper } from '../../styles';

const MissionList = ({ list, editMode, navigation, disableEdit }) => {
  return (
    <StyledWhiteWrapper>
      <StyledWhiteContainer>
        {list.map(missionList => {
          return (
            <MissionItem
              {...missionList}
              amount={getTrueNumber(missionList.amount, '', '')}
              key={missionList.id}
              navigation={navigation}
              editMode={editMode}
              disableEdit={disableEdit}
            />
          );
        })}
      </StyledWhiteContainer>
    </StyledWhiteWrapper>
  );
};

MissionList.propTypes = {
  list: arrayOf(
    shape({
      amount: number.isRequired,
      completionDate: string,
      creationDate: number.isRequired,
      deadline: number.isRequired,
      icon: string.isRequired,
      id: number.isRequired,
      profileGiver: shape({
        nickname: string.isRequired,
      }).isRequired,
      status: string.isRequired,
      theme: string.isRequired,
      title: string.isRequired,
    }),
  ).isRequired,
  editMode: bool.isRequired,
  disableEdit: func.isRequired,
  navigation: shape({
    goBack: func.isRequired,
    navigate: func.isRequired,
  }).isRequired,
};

export default MissionList;
