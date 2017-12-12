import React from 'react';
import { shape, oneOf, string, func, arrayOf } from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from 'styles/appStyles';
import { getTranslations } from 'utils/i18n';

import MenuLink from '../../MenuLink';

const styles = EStyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fffe82',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 130.5,
  },
  text: {
    color: '#303030',
    fontSize: 18,
    marginBottom: 25,
    fontFamily: '$fonts.circularBook',
  },
  textIpad: {
    color: '#303030',
    fontSize: 28,
    marginBottom: 25,
    fontFamily: '$fonts.circularBook',
  },
  button: { alignSelf: 'center' },
});

const Navigation = ({ mode, navigation, list, goTo }) => {
  return (
    <View style={[styles.background, theme.cardStyle]}>
      <View style={styles.content}>
        {list.map(link => {
          return (
            <MenuLink
              style={[styles.link, link.style]}
              Textstyle={link.Textstyle}
              key={`${link.entitled}`}
              to={() => link.linkto(navigation, goTo)}
              text={link.entitled}
            />
          );
        })}
      </View>
      {mode !== 'children' && (
        <View>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.text}>
              {getTranslations('navigation.myMonimalz')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

Navigation.defaultProps = {
  list: [
    {
      entitled: getTranslations('navigation.transfert'),
      linkto: (navigation, goTo) => {
        goTo(navigation, 'TransfertStack', { tab: 0 });
      },
    },
    {
      entitled: getTranslations('navigation.moneyPot'),
      linkto: (navigation, goTo) => {
        goTo(navigation, 'TransfertStack', { tab: 2 });
      },
    },
    {
      entitled: getTranslations('navigation.goals'),
      linkto: navigation => {
        navigation.navigate('Mission');
      },
    },
    {
      entitled: getTranslations('navigation.messages'),
      linkto: navigation => {
        navigation.navigate('Notification');
      },
    },
    {
      entitled: getTranslations('navigation.shop'),
      linkto: () => {},
    },
    {
      entitled: getTranslations('navigation.settings'),
      linkto: navigation => {
        navigation.navigate('Settings');
      },
    },
  ],
};

Navigation.propTypes = {
  goTo: func.isRequired,
  mode: oneOf(['children', 'adult']).isRequired,
  list: arrayOf(
    shape({
      entitled: string.isRequired,
      linkto: func.isRequired,
    }),
  ),
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Navigation;
