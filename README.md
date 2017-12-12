# Monimalz

[![Build Status](https://www.bitrise.io/app/1d7dd9c1b5fa0776/status.svg?token=zPXK-To-hOx0B0SkCUfEOg&branch=master)](https://www.bitrise.io/app/1d7dd9c1b5fa0776)      

## The Basics

### Dependencies and install

You need to have Watchman installed:

```
brew install watchman

```

Install the React Native CLI:

```
npm i - g react-native-cli
```

Install Yarn or have least have version 1.1.0 already installed: 

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

Install the packages:

```
yarn
```

Link the native libraries:

```
react-native link
```

---

### Running the project

To run the React Native packager:

```
yarn start --reset-cache
```

You can launch the devices form the CLI or using Xcode or Android Studio. Using the CLI, you can use:

For an iPhone 8

```
yarn ios
```

For an iPhone 8 Plus

```
yarn iosPlus
```

For an Android device

```
yarn android
```

---

### Internationalization

The internationalization is handled using an Google excel that can be accessed via [here](https://docs.google.com/spreadsheets/d/1eKDKq5in_Ti8Mt9JoiD_Mn4GHU406l7LE6gBUY7oR0M/edit#gid=0)

Inside the components, no text is hardcoded and everything is using the process of defining a key for each wording wich can in turn be translated in the doc as follow:

```
import { getTranslations } from 'utils/i18n';

getTranslations('key.for.wording');
```

To update the translations in app you need to sync the doc with the project using the following command:

```
yarn syncmessages
```

---

### Tests with Jest

You can run tests using one of the three following commands but most of them won't work 😕:

To have jest run once for the whole project:

```
yarn test
```

To have jest run in watch mode:

```
yarn test:watch
```

To have jest run with code coverage:

```
yarn test:coverage
```

To update jest snapshots:

```
yarn test:update
```

---

## Stack

[React Native](https://facebook.github.io/react-native/)
[Redux](http://redux.js.org/)
[Redux Observable](https://redux-observable.js.org/)
[React Navigation](https://reactnavigation.org/)
[Lottie](https://github.com/airbnb/lottie-react-native/)
[React Native Config](https://github.com/luggit/react-native-config)

---

## Tips

Sometimes, React Native can produce cryptic errors... To handle thoses scenarios, you can use the following command:

```
yarn clean-cache
```

And if you are using Xcode clean the project or even the build folder via `Product > Clean`


## Other

The project is using [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formating, you can run ESlint via the command:

```
yarn lint
```

There is a prepush git hook that run the linting command to abort the push in case of a linting error.
