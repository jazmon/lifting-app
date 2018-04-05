//  Created by react-native-create-bridge

import { NativeModules } from 'react-native';

const { AlarmManager } = NativeModules;

export default {
  exampleMethod() {
    return AlarmManager.exampleMethod();
  },

  EXAMPLE_CONSTANT: AlarmManager.EXAMPLE_CONSTANT,
};
