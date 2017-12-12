import React, { PureComponent } from 'react';
import {
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { bind } from 'decko';
import base64 from 'base64-js';
import b64 from 'base-64';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BleHOCHandler = Target => {
  class BleHOC extends PureComponent {
    constructor() {
      super();

      this.state = {
        connected: false,
        scanning: false,
        peripherals: new Map(),
        wifiState: '',
        SSIDs: new Map(),
        password: '',
        scanStatus: '',
        wifiStatus: '',
      };

      this.BLE_WIFI_SERVICE = 'ED2B4EFA-2830-492F-9607-DF165285E830';
      this.BLE_WIFI_TRIGGER_SCAN = 'ED2B4E3B-2820-492F-9507-DF165285E831';
      this.BLE_WIFI_SCAN_STATUS = 'ED2B4E3B-2820-492F-9507-DF165285E832';
      this.BLE_WIFI_LIST = 'ED2B4E3B-2820-492F-9507-DF165285E833';
      this.BLE_WIFI_WRITE_SSID = 'ED2B4E3B-2820-492F-9507-DF165285E834';
      this.BLE_WIFI_WRITE_KEY = 'ED2B4E3B-2820-492F-9507-DF165285E835';
      this.BLE_WIFI_STATUS = 'ED2B4E3B-2820-492F-9507-DF165285E836';
    }

    componentDidMount() {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ).then(result => {
          if (result) {
            console.log('Permission is OK');
          } else {
            PermissionsAndroid.requestPermission(
              PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            ).then(permAccepted => {
              if (permAccepted) {
                console.log('User accept');
              } else {
                console.log('User refuse');
              }
            });
          }
        });
      }

      this.handlerDiscover = bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        this.handleDiscoverPeripheral,
      );
      this.handlerStop = bleManagerEmitter.addListener(
        'BleManagerStopScan',
        this.handleStopScan,
      );
      this.handlerDisconnect = bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        this.handleDisconnectedPeripheral,
      );
      this.handlerUpdate = bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        this.handleUpdateValueForCharacteristic,
      );
    }

    componentWillUnmount() {
      this.handlerDiscover.remove();
      this.handlerStop.remove();
      this.handlerDisconnect.remove();
      this.handlerUpdate.remove();
    }

    setValue(name, value, cb = null) {
      this.setState(
        state => {
          return {
            ...state,
            [name]: value,
          };
        },
        () => {
          if (cb) {
            cb();
          }
        },
      );
    }

    convertString(str) {
      return [...base64.toByteArray(b64.encode(str))];
    }

    @bind
    initBle() {
      BleManager.start({ showAlert: false }).then(() => {
        console.log('BLE initialized');

        this.startScan();
      });
    }

    @bind
    handleDisconnectedPeripheral(data) {
      const { peripherals } = this.state;

      const peripheral = peripherals.get(data.peripheral);
      if (peripheral) {
        peripheral.connected = false;
        peripherals.set(peripheral.id, peripheral);

        this.setState(state => {
          return {
            ...state,
            peripherals,
            connected: false,
          };
        });
      }

      console.log(`Disconnected from ${data.peripheral}`);
    }

    @bind
    handleUpdateValueForCharacteristic(data) {
      const receivedValue = base64.fromByteArray(data.value);
      const bytes = b64.decode(receivedValue);

      console.log('Characteristic update', data);

      if (data.characteristic === this.BLE_WIFI_SCAN_STATUS) {
        switch (receivedValue) {
          case 'AA==':
            this.setValue('scanStatus', 'notTriggered');
            break;
          case 'AQ==':
            this.setValue('scanning', false, () => {
              this.setValue('scanStatus', 'success');
            });
            break;
          case 'Ag==':
            this.setValue('scanStatus', 'scanning');
            break;
          case 'Aw==':
            this.setValue('scanStatus', 'error');
            break;
          default:
            break;
        }
      } else if (data.characteristic === this.BLE_WIFI_LIST) {
        this.handleDiscoveredWifi(JSON.parse(bytes));
      } else if (data.characteristic === this.BLE_WIFI_STATUS) {
        switch (receivedValue) {
          case 'AA==':
            this.setValue('wifiStatus', 'noTry');
            break;
          case 'AQ==':
            this.setValue('wifiStatus', 'connecting');
            break;
          case 'Ag==':
            this.setValue('wifiStatus', 'connected');
            break;
          case 'Aw==':
            this.setValue('wifiStatus', 'badSsid');
            break;
          case 'BA==':
            this.setValue('wifiStatus', 'badKey');
            break;
          case 'BQ==':
            this.setValue('wifiStatus', 'error');
            break;
          default:
            break;
        }
      }
    }

    startScan() {
      const { scanning } = this.state;

      if (!scanning) {
        BleManager.scan([], 5, false).then(() => {
          console.log('Scanning...');
          this.setState(state => {
            return {
              ...state,
              scanning: true,
            };
          });
        });
      }
    }

    @bind
    handleStopScan() {
      console.log('Scan is stopped');

      this.setState(
        state => {
          return {
            ...state,
            scanning: false,
          };
        },
        () => {
          BleManager.getDiscoveredPeripherals([]).then(peripheralsArray => {
            console.log(`Discovered peripherals: ${peripheralsArray.length}`);
          });
        },
      );
    }

    @bind
    handleDiscoverPeripheral(peripheral) {
      const { peripherals } = this.state;

      console.log('peripheral found', peripheral);

      if (!peripherals.has(peripheral.id)) {
        peripherals.set(peripheral.id, peripheral);

        if (peripheral.name && peripheral.name.substr(0, 9) === 'Monimalz-') {
          console.log('Monimalz found');
          BleManager.stopScan().then(() => {
            this.handleDeviceConnection(peripheral.id);

            this.deviceId = peripheral.id;
          });
        }

        this.setState(state => {
          return {
            ...state,
            peripherals,
          };
        });
      }
    }

    handleDiscoveredWifi(wifi) {
      const { SSIDs } = this.state;

      if (!SSIDs.has(wifi.ssid)) {
        SSIDs.set(wifi.ssid, wifi);

        this.setState(state => {
          return {
            ...state,
            SSIDs,
          };
        });
      }
    }

    handleDeviceConnection(deviceId) {
      BleManager.connect(deviceId)
        .then(() => {
          console.log('Connected to the Monimalz');

          this.setState(
            state => {
              return {
                ...state,
                connected: true,
              };
            },
            () => {
              this.handleGetServices(deviceId);
            },
          );
        })
        .catch(error => {
          console.log(error);
        });
    }

    handleGetServices(deviceId) {
      BleManager.retrieveServices(deviceId).then(() => {
        this.subscribeToAllChars(deviceId);
        this.triggerScan(deviceId);
      });
    }

    triggerScan(deviceId) {
      this.startWrite(
        deviceId,
        this.BLE_WIFI_SERVICE,
        this.BLE_WIFI_TRIGGER_SCAN,
        [0x01],
      );
    }

    writeSsid(deviceId, ssid) {
      this.startWrite(
        deviceId,
        this.BLE_WIFI_SERVICE,
        this.BLE_WIFI_WRITE_SSID,
        ssid,
      );
    }

    writePassword(deviceId, password) {
      this.startWrite(
        deviceId,
        this.BLE_WIFI_SERVICE,
        this.BLE_WIFI_WRITE_KEY,
        password,
      );
    }

    subscribeToAllChars(deviceId) {
      this.startNotification(
        deviceId,
        this.BLE_WIFI_SERVICE,
        this.BLE_WIFI_SCAN_STATUS,
      );

      this.startNotification(
        deviceId,
        this.BLE_WIFI_SERVICE,
        this.BLE_WIFI_LIST,
      );

      this.startNotification(
        deviceId,
        this.BLE_WIFI_SERVICE,
        this.BLE_WIFI_STATUS,
      );
    }

    startNotification(deviceId, serviceId, charId) {
      BleManager.startNotification(deviceId, serviceId, charId)
        .then(() => {
          console.log('Notification started for ', charId);
        })
        .catch(error => {
          console.log('Notification failure:', error);
        });
    }

    startWrite(deviceId, serviceId, charId, data, maxByteSize) {
      BleManager.write(deviceId, serviceId, charId, data, maxByteSize)
        .then(() => {
          console.log(`Write: ${data}`);
        })
        .catch(error => {
          console.log('Write error ', error);
        });
    }

    startRead(deviceId, serviceId, charId) {
      BleManager.read(deviceId, serviceId, charId)
        .then(res => {
          console.log('read val', res);
        })
        .catch(error => {
          console.log(error);
        });
    }

    render() {
      return <Target {...this.props} {...this.state} initBle={this.initBle} />;
    }
  }

  return BleHOC;
};

export default BleHOCHandler;
