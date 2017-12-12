import {
  TabRouter,
  createNavigator,
  StackRouter,
  StackNavigator,
} from 'react-navigation';
import RouterTransitioner from './navigator/RouterTransitioner';
import Swiper from './navigator/Swiper';
import {
  Home,
  TransfertStep,
  Transfert,
  Navigation,
  Auth,
  Settings,
  CardScanner,
  Notification,
  Pairing,
  Messenger,
  Mission,
  MissionAdd,
  MissionDetail,
  MissionPayment,
  CodeSelector,
  Splashscreen,
  OpenMonimalz,
  History,
  PrivacyPolicies,
} from './pages';
import FlipTransitioner from './navigator/FlipTransitioner';

const navigationOptions = {
  headerMode: 'none',
  initialRouteName: 'Home',
};

const MissionStack = createNavigator(
  TabRouter({
    Mission: {
      screen: Mission,
    },
    MissionAdd: {
      screen: MissionAdd,
    },
  }),
)(FlipTransitioner);

const NavigationStack = createNavigator(
  StackRouter({
    NavigationHome: {
      screen: Navigation,
      navigationOptions: {
        title: 'NavigationHome',
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        fullscreen: true,
      },
    },
    Mission: {
      screen: MissionStack,
      navigationOptions: {
        fullscreen: true,
      },
    },
    Notification: {
      screen: Notification,
    },
    MissionDetail: {
      screen: MissionDetail,
    },
    MissionPayment: {
      screen: MissionPayment,
    },
    NavigationCardScanner: {
      screen: CardScanner,
    },
  }),
)(RouterTransitioner);

const TransfertStack = createNavigator(
  StackRouter({
    TransfertHome: {
      screen: Transfert,
      navigationOptions: {
        title: 'TransfertHome',
      },
    },
    TransfertStep: {
      screen: TransfertStep,
    },
    CardScanner: {
      screen: CardScanner,
    },
    Messenger: {
      screen: Messenger,
    },
  }),
)(RouterTransitioner);

const HomeStack = createNavigator(
  TabRouter({
    Home: {
      screen: Home,
      navigationOptions: {
        fullscreen: true,
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        fullscreen: true,
      },
    },
  }),
)(FlipTransitioner);

const SwiperRouter = createNavigator(
  TabRouter(
    {
      Navigation: {
        screen: NavigationStack,
        navigationOptions: {
          fullscreen: true,
        },
      },
      Home: {
        screen: HomeStack,
        navigationOptions: {
          fullscreen: true,
        },
      },
      TransfertStack: {
        screen: TransfertStack,
        navigationOptions: {
          fullscreen: true,
        },
      },
    },
    navigationOptions,
  ),
)(Swiper);

const AppNavigator = StackNavigator(
  {
    Splashscreen: {
      screen: Splashscreen,
    },
    Auth: {
      screen: Auth,
    },
    PrivacyPolicies: {
      screen: PrivacyPolicies,
    },
    CodeSelector: {
      screen: CodeSelector,
    },
    Pairing: {
      screen: Pairing,
    },
    InitialCardScanner: {
      screen: CardScanner,
    },
    Swiper: {
      screen: SwiperRouter,
    },
    OpenMonimalz: {
      screen: OpenMonimalz,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Splashscreen',
  },
);

export default AppNavigator;
