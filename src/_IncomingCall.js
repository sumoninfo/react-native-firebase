import React, { Fragment, useEffect } from "react";
import ramdomUuid                     from "uuid-random";

import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import {
  Colors,
  Header,
}                 from "react-native/Libraries/NewAppScreen";
import RNCallKeep from "react-native-callkeep";


function _IncomingCall(props) {
  let currentCallId;
  const init = async () => {
    await initializeCallKeep();
  };

  const initializeCallKeep = async () => {
    try {
      RNCallKeep.setup({
        selfManaged: true,
        ios        : {
          appName: "NativeFirebase",
        },
        android    : {
          alertTitle      : "Permissions required",
          alertDescription: "This application needs to access your phone accounts",
          cancelButton    : "Cancel",
          okButton        : "ok",
          imageName       : "phone_account_icon",
          //additionalPermissions: [PermissionsAndroid.PERMISSIONS.WAKE_LOCK],
          // Required to get audio in background when using Android 11
          foregroundService: {
            channelId        : "com.company.my",
            channelName      : "Foreground service for my app",
            notificationTitle: "My app is running on background",
            notificationIcon : "Path to the resource icon of the notification",
          },
        },
      });
      RNCallKeep.setAvailable(true);
    } catch (err) {
      console.error("initializeCallKeep error:", err.message);
    }
    RNCallKeep.addEventListener("didReceiveStartCallAction", onNativeCall);
    RNCallKeep.addEventListener("answerCall", onAnswerCallAction);
    RNCallKeep.addEventListener("endCall", onEndCallAction);
    RNCallKeep.addEventListener("didDisplayIncomingCall", onIncomingCallDisplayed);
  };

  const getCurrentCallId = () => {
    if (!currentCallId) {
      currentCallId = ramdomUuid().toLowerCase();
    }

    return currentCallId;
  };

  const onEndCallAction = ({ callUUID }) => {
    console.log("hangup");
  };

  const onAnswerCallAction = ({ callUUID }) => {
    // called when the user answer the incoming call

    RNCallKeep.setCurrentCallActive(callUUID);

    RNCallKeep.backToForeground();
  };

  const onIncomingCallDisplayed = ({ callUUID, handle, fromPushKit }) => {
    // Incoming call displayed (used for pushkit on iOS)
  };

  const onNativeCall = ({ handle }) => {
    console.log("onNativeCall");
    // _onOutGoingCall on android is also called when making a call from the app
    // so we have to check in order to not making 2 calls
    /*if (inCall) {
      return;
    }
    // Called when performing call from native Contact app
    call(handle);*/
  };

  function pushNotify() {
    let uuid         = getCurrentCallId();
    console.log(uuid, 'uuid');
    const { number } = 1111;
    RNCallKeep.startCall(uuid, number, "contactIdentifier");
    RNCallKeep.displayIncomingCall(uuid, number, number, "number", true);
    RNCallKeep.answerIncomingCall(uuid)
    console.log("aaa");
  }

  useEffect(() => {
    init();
  }, []);
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.listHeader}>
            <Text>Calling</Text>
          </View>

          <Button
            title={"Calling"}
            onPress={() => {
              pushNotify();
            }}>
          </Button>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

export default _IncomingCall;
const styles = StyleSheet.create({
  scrollView        : {
    backgroundColor: Colors.lighter,
  },
  listHeader        : {
    backgroundColor: "#eee",
    color          : "#222",
    height         : 44,
    padding        : 12,
  },
  title             : {
    fontSize  : 18,
    fontWeight: "bold",
    paddingTop: 10,
  },
  noData            : {
    paddingVertical: 50,
  },
  noDataText        : {
    fontSize : 14,
    textAlign: "center",
  },
  message           : {
    fontSize         : 14,
    paddingBottom    : 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  engine            : {
    position: "absolute",
    right   : 0,
  },
  body              : {
    backgroundColor  : Colors.white,
    paddingHorizontal: 20,
    paddingVertical  : 10,
  },
  sectionContainer  : {
    marginTop        : 32,
    paddingHorizontal: 24,
  },
  sectionTitle      : {
    fontSize  : 24,
    fontWeight: "600",
    color     : Colors.black,
  },
  sectionDescription: {
    marginTop : 8,
    fontSize  : 18,
    fontWeight: "400",
    color     : Colors.dark,
  },
  highlight         : {
    fontWeight: "700",
  },
  footer            : {
    color       : Colors.dark,
    fontSize    : 12,
    fontWeight  : "600",
    padding     : 4,
    paddingRight: 12,
    textAlign   : "right",
  },
});
