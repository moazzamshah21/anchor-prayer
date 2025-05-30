import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useState} from 'react';
import PrayerService from '../services/Prayer/PrayerService';
import {showMessage} from 'react-native-flash-message';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActionSheet from 'react-native-actions-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');

const ActivePrayerItem = ({item, index, navigation}) => {
  const actionSheetRef = createRef();
  const OpenCommentSheet = () => {
    actionSheetRef.current?.setModalVisible(true);
  };
  const [isHearted, setIsHearted] = useState(item?.isLike);
  const [commentCount, setCommentCount] = useState(item?.commentCount);
  const [CommentArray, setCommentArray] = useState(item?.comments);
  const [isLike, setIsLike] = useState(null);
  const [text, setText] = useState('');
  const LikeAndDislikePrayer = async (id, value) => {
    var payload = {
      prayerId: id,
    };
    if (value == false) {
      var response = await PrayerService.LikePrayer(payload);
      if (response?.success) {
        setIsHearted(true);
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    } else {
      var response = await PrayerService.DisLikePrayer(payload);
      if (response?.success) {
        setIsHearted(false);
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    }
  };

  const addComment = async () => {
    var payload = {
      prayerId: item?._id,
      comment: text,
    };
    var response = await PrayerService.AddComment(payload);
    if (response?.success) {
      setCommentCount(prev => prev + 1);
      const newComment = {name: item?.name, comment: text};
      setCommentArray([...CommentArray, newComment]);
      setText('');
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  return (
    <View
      key={`index-${index}`}
      style={{
        borderRadius: 15,
        borderColor: ThemeColors?.BLACK,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 30,
        alignSelf: 'center',
        paddingHorizontal: 15,
        height: 70,
        marginVertical: 8,
      }}>
      <View style={{justifyContent: 'center', flexGrow :1}}>
        <Text style={styles.HelloText}>{item?.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/like.png')}
            style={{
              width: 10,
              height: 10,
              marginLeft: -2,
            }}
            resizeMode="contain"
          />
          <Text style={styles.ViewedText}>
            {item?.likeCount} people like this
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            LikeAndDislikePrayer(item?._id, isHearted);
          }}
          style={{
            backgroundColor: '#F0EFEF',
            borderRadius: 20,
            width: 35,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isHearted == true ? (
            <AntDesign name="heart" style={{color: '#D7443E'}} size={20} />
          ) : (
            <Image
              source={require('../../assets/images/heart.png')}
              style={{
                width: 20,
                height: 20,
              }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={OpenCommentSheet}
          style={{
            backgroundColor: '#F0EFEF',
            borderRadius: 20,
            width: 35,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Image
            source={require('../../assets/images/message1.png')}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <TouchableOpacity>
          <ImageBackground
            source={require('../../assets/images/bggreen.png')}
            style={{
              width: 85,
              height: 85,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            resizeMode="contain">
            <Text style={styles.ActivePrayText}>Active{'\n'}Pray</Text>
          </ImageBackground>
        </TouchableOpacity> */}
        <TouchableOpacity>
          <ImageBackground
            source={require('../../assets/images/bggreen.png')}
            style={{
              width: 85,
              height: 85,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            resizeMode="contain">
            <Text style={styles.ActivePrayText}>Pray</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <ActionSheet
        gestureEnabled={false}
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: 'hidden',
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/images/like.png')}
              style={{width: 23, height: 20}}
              resizeMode="contain"
            />
            <View style={{}}>
              <Text style={styles.NumberText}>
                {/* {likeCount} */}
                {'>'}
              </Text>
            </View>
          </View>
          <View>
            <AntDesign
              name="like2"
              style={{
                color: ThemeColors.BLACK,
              }}
              size={20}
            />
          </View>
        </View>
        <View style={styles.BlackDivider} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 15}}>
            {CommentArray.map((item, index) => {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('PersonalProfile');
                    }}
                    style={styles.ImageCenteredView}>
                    <Image
                      source={require('../../assets/images/avatar.png')}
                      style={{width: 50, height: 50, borderRadius: 50}}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View style={{marginTop: 12}}>
                    <View style={styles.GrayBox}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          navigation.navigate('PersonalProfile');
                        }}>
                        <Text style={styles.NameHeading}>{item?.name}</Text>
                      </TouchableOpacity>
                      <Text style={styles.CommentBoxText}>{item?.comment}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 10,
                      }}>
                      <Text style={styles.likeTextBtn}>6d</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setIsLike(index);
                        }}>
                        <Text style={styles.likeTextBtn}>Like</Text>
                      </TouchableOpacity>
                      {isLike == index && (
                        <Image
                          source={require('../../assets/images/like.png')}
                          style={{
                            width: 8,
                            height: 8,
                            marginTop: 1.5,
                            marginLeft: 3,
                          }}
                          resizeMode="contain"
                        />
                      )}
                      <Text style={styles.likeTextBtn}>Reply</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            paddingTop: 20,
            flexDirection: 'row',
            paddingBottom: 10,
          }}>
          <View style={styles.TextInputStyle}>
            <TextInput
              value={text}
              placeholder="Comment"
              placeholderTextColor={'#5A5957'}
              onChangeText={x => setText(x)}
              style={{
                paddingHorizontal: 10,
                fontSize: 10,
                color: '#5A5957',
                fontFamily: ThemeFonts.MEDIUM,
                width: width / 2 + 30,
                paddingBottom: 8,
              }}
            />
            <TouchableOpacity onPress={addComment}>
              <FontAwesome
                name="send"
                style={{
                  color: ThemeColors.BLACK,
                }}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};

export default ActivePrayerItem;

const styles = StyleSheet.create({
  HelloText: {
    fontSize: 12,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
  },
  ViewedText: {
    fontSize: 5,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    marginLeft: 5,
  },
  ActivePrayText: {
    fontSize: 10,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    textAlign: 'center',
  },
  NumberText: {
    fontSize: 12,
    color: '#5A5957',
    fontFamily: ThemeFonts.MEDIUM,
    marginTop: 4,
    marginLeft: 5,
  },
  BlackDivider: {
    height: 2,
    width: width,
    backgroundColor: ThemeColors?.DARK_GRAY,
    alignSelf: 'center',
  },
  TextContainerStyle: {
    marginLeft: 5,
  },
  TextInputStyle: {
    borderRadius: 20,
    borderColor: ThemeColors?.BLACK,
    borderWidth: 1,
    height: 35,
    flexGrow: 1,
    paddingHorizontal: 15,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SmileyView: {
    borderRadius: 35,
    width: 35,
    height: 35,
    backgroundColor: '#DDCFCF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageCenteredView: {
    borderRadius: 50,
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: ThemeColors?.BLACK,
    borderWidth: 1,
  },
  GrayBox: {
    width: 215,
    height: 62,
    borderRadius: 10,
    backgroundColor: '#E8E4E4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 12,
  },
  likeTextBtn: {
    fontSize: 8,
    color: '#5A5957',
    fontFamily: ThemeFonts.MEDIUM,
    marginLeft: 10,
  },
  CommentBoxText: {
    fontSize: 10,
    color: '#5A5957',
    fontFamily: ThemeFonts.MEDIUM,
    width: '95%',
  },
  NameHeading: {
    fontSize: 12,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.BOLD,
  },
});
