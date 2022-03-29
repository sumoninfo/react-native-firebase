import React, { Component, Fragment } from "react";
import RNCallKeep from 'react-native-callkeep';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList, Platform, Button, TouchableOpacity, PermissionsAndroid,
} from "react-native";
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
export default class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: []
    }
  }

  componentDidMount() {
    console.log("aaaaaaaaaa");
    try {
      RNCallKeep.setup({
        ios    : {
          appName: "NativeFirebase",
        },
        android: {
          alertTitle      : "Permissions required",
          alertDescription: "This application needs to access your phone accounts",
          cancelButton    : "Cancel",
          okButton        : "ok",
        },
      });
      RNCallKeep.setAvailable(true);
    } catch (err) {
      console.error("initializeCallKeep error:", err.message);
    }
  };
  _pushNotify(){
    let uid = "e09fbbd6-c3e8-42a2-862f-d0139cc3555c";
    const { number } = 1111;
    RNCallKeep.displayIncomingCall(uid, number, number, 'number', true);

    console.log('aaa');
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            <View style={styles.listHeader}>
              <Text>Push Notifications</Text>
            </View>

            <Button
              title={"push"}
              onPress={() => {
                this._pushNotify();
              }}>
            </Button>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  listHeader: {
    backgroundColor: '#eee',
    color: "#222",
    height: 44,
    padding: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10
  },
  noData: {
    paddingVertical: 50,
  },
  noDataText: {
    fontSize: 14,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
