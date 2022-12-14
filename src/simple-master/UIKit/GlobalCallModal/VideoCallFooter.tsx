import { Text } from 'components';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CallEvents } from '../../WebRtcSimple/contains';
import { CallIcons } from './CallIcons';
import WebrtcSimple from '../../index';
import { styles } from './styles';
interface IVideoCallFooter {
  onAccept: () => void;
  onEndCall: () => void;
  callStatus?: string;
  videoDisabled?: boolean;
  audioDisabled?: boolean;
  loudSpeakerDisabled?: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
  toggleLoudSpeaker: () => void;
  isCallAgain?: boolean;
}
const VideoCallFooter: React.FC<IVideoCallFooter> = ({
  onAccept,
  onEndCall,
  callStatus,
  toggleVideo,
  toggleAudio,
  toggleLoudSpeaker,
  videoDisabled,
  audioDisabled,
  loudSpeakerDisabled,
  isCallAgain,
  data
}) => {

  useEffect(() => {
    console.log('Im shani footter', data);
  }, [])
  const [cameraType, setCameraType] = useState<'front' | 'end'>('front');

  const switchCamera = () => {

    if (cameraType === 'front') {
      setCameraType('end');
      WebrtcSimple.events.message({ type: 'SWITCH_CAMERA', value: 'end' });
    } else {
      setCameraType('front');
      WebrtcSimple.events.message({ type: 'SWITCH_CAMERA', value: 'front' });
    }
    WebrtcSimple.events.switchCamera();
  };
  return (
    <View style={footerStyle.container}>
      {callStatus === CallEvents.received && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly',
            marginBottom: 100,
          }}>
          {/* <CallIcons
            iconSize={40}
            iconSizeBackground={80}
            icon={require('./icon/call_white.png')}
            color="red"
            onPress={onEndCall}
          />
          <CallIcons
            iconSize={40}
            iconSizeBackground={80}
            icon={require('./icon/call-white.png')}
            color="green"
            onPress={onAccept}
          /> */}
          <TouchableOpacity onPress={onAccept}>
            <View style={footerStyle.acceptCallView}>
              <Text style={footerStyle.endCallText}>Accept</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onEndCall}>
            <View style={footerStyle.endCallView}>
              <Text style={footerStyle.endCallText}>Decline</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {callStatus === CallEvents.start && (
        <View
          style={[
            // footerStyle.flexRow,
            {
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 15,
              // backgroundColor: "rgba(255, 255, 255, 0.5)",
              // opacity: 0.5,
              paddingVertical: 25,
            },
          ]}>

          <View
            style={[
              footerStyle.flexRow,
              {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginVertical: 10
              },
            ]}>
            {!isCallAgain && data.callType === 'VIDEO' && <>
              <CallIcons
                icon={require('./icon/camera.png')}
                onPress={() => { switchCamera() }}
                color='grey'
              />
              <CallIcons
                icon={require('./icon/volume.png')}
                color={!loudSpeakerDisabled ? undefined : 'grey'}
                onPress={toggleLoudSpeaker}
              />
              <CallIcons
                icon={require('./icon/no-video.png')}
                color={!videoDisabled ? undefined : 'grey'}
                onPress={toggleVideo}
              />
              <CallIcons
                icon={require('./icon/mic_black.png')}
                color={!audioDisabled ? undefined : 'grey'}
                onPress={toggleAudio}
              />
            </>}
          </View>
          {!isCallAgain && <TouchableOpacity onPress={onEndCall}>
            <View style={footerStyle.endCallView1}>
              <Text style={footerStyle.endCallText}>Disconnect</Text>
            </View>
          </TouchableOpacity>}
        </View>
      )}

      {callStatus === CallEvents.accept && (
        <View
          style={[
            // footerStyle.flexRow,
            {
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 15,
              // backgroundColor: "rgba(255, 255, 255, 0.5)",
              // opacity: 0.5,
              paddingVertical: 25,
            },
          ]}>

          <View
            style={[
              footerStyle.flexRow,
              {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginVertical: 10
              },
            ]}>
            {data.callType === 'VIDEO' && <>
              <CallIcons
                icon={require('./icon/camera.png')}
                onPress={() => { switchCamera() }}
                color={'grey'}
              />
            </>}

            <CallIcons
              icon={require('./icon/volume.png')}
              color={!loudSpeakerDisabled ? undefined : 'grey'}
              onPress={toggleLoudSpeaker}
            />
            {data.callType === 'VIDEO' && <CallIcons
              icon={require('./icon/no-video.png')}
              color={!videoDisabled ? undefined : 'grey'}
              onPress={toggleVideo}
            />}
            <CallIcons
              icon={require('./icon/mic_black.png')}
              color={!audioDisabled ? undefined : 'grey'}
              onPress={toggleAudio}
            />
          </View>
          <TouchableOpacity onPress={onEndCall}>
            <View style={footerStyle.endCallView1}>
              <Text style={footerStyle.endCallText}>Disconnect</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const footerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  endCallView: {
    backgroundColor: '#EF3737',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 50,
  },
  endCallView1: {
    backgroundColor: '#EF3737',
    // paddingHorizontal: 20,
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 50,
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center'
  },
  endCallText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  acceptCallView: {
    backgroundColor: '#37CEEF',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 50
  }
});

export default VideoCallFooter;
