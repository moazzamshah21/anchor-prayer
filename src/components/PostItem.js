import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import {
  CommentIcon,
  HeartIcon,
  ShareIcon,
  ThumbsUpIcon,
  WhatsAppIcon,
} from '../../assets/svg/SvgIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ReadMore from '@fawazahmed/react-native-read-more';
import Thumbnail from 'react-native-thumbnail-video';
import {POST_TYPE} from '../utils/Config';
import VideoPlayer from './VideoPlayer';
const {width} = Dimensions.get('window');

const PostItem = ({data}) => {
  const hashtags = ['everyone', 'family', 'handsome', 'everyone', 'test'];

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.mainContentContainer,
          {
            backgroundColor:
              useColorScheme() === 'dark'
                ? ThemeColors.BLACK
                : ThemeColors.WHITE,
          },
        ]}>
        <View style={styles.contentContainer}>
          <View style={styles?.ProfileView}>
            <Image
              source={require('../../assets/BlackmanImage.png')}
              style={{
                width: 45,
                height: 45,
                borderRadius: 50,
                marginRight: 2,
              }}
              resizeMode="contain"
            />
            <View style={styles.TextContainerStyle}>
              <Text
                style={[
                  styles.PersonNameText,
                  {
                    color:
                      useColorScheme() === 'dark'
                        ? ThemeColors.WHITE
                        : ThemeColors.BLACK,
                  },
                ]}>
                TerryVibe
              </Text>
              <Text style={styles.suggestedText}>Suggested for you . 59 .</Text>
            </View>
          </View>
          <View style={styles.ActionItemsView}>
            <TouchableOpacity style={[styles.ActionItem, {marginTop: 2.5}]}>
              <EntypoIcon
                name="dots-three-horizontal"
                style={{
                  color:
                    useColorScheme() === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors.BLACK,
                }}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ActionItem}>
              <EntypoIcon
                name="cross"
                style={{
                  color:
                    useColorScheme() === 'dark'
                      ? ThemeColors.WHITE
                      : ThemeColors.BLACK,
                }}
                size={26}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.PostContentContainer}>
          <ReadMore
            numberOfLines={2}
            ellipsis={''}
            seeMoreText="...See More"
            seeLessText=""
            seeMoreStyle={styles.SeeMoreText}
            seeLessStyle={styles.SeeMoreText}
            style={[
              styles.captionText,
              {
                color:
                  useColorScheme() === 'dark'
                    ? ThemeColors.WHITE
                    : ThemeColors.BLACK,
              },
            ]}>
            {data?.content}
            {data?.hashTags?.map((item, index) => {
              return (
                <Text
                  key={`hash-tag-${index}`}
                  onPress={() => console.log(item)}
                  style={styles.hashtagsText}>
                  #{item}{' '}
                </Text>
              );
            })}
          </ReadMore>
        </View>
      </View>
      {data?.postType == POST_TYPE.IMAGE && (
        <TouchableHighlight>
          <Image
            source={data.url}
            style={{
              width: width,
              height: (width / 4) * 3,
              backgroundColor:
                useColorScheme() === 'dark'
                  ? ThemeColors.BLACK
                  : ThemeColors.WHITE,
            }}
            resizeMode="cover"
          />
        </TouchableHighlight>
      )}
      {data?.postType == POST_TYPE.VIDEO && (
        <VideoPlayer
          video={{uri: data.url}}
          videoWidth={width}
          videoHeight={(width / 4) * 3}
          resizeMode="contain"
          showDuration
          hideControlsOnStart
          pauseOnPress
          fullScreenOnLongPress={true}
          seekBarBackground={ThemeColors.WHITE}
        />
      )}

      <View
        style={[
          styles.CommentsShareView,
          {
            backgroundColor:
              useColorScheme() === 'dark'
                ? ThemeColors.BLACK
                : ThemeColors.WHITE,
          },
        ]}>
        <View style={styles.LikeCountView}>
          <HeartIcon />
          <View style={{marginLeft: -5}}>
            <HeartIcon />
          </View>
          <Text style={styles.LikesText}>{data?.likes}</Text>
        </View>
        <View style={styles.centeredView}>
          <Text style={styles.LikesText}>
            {data?.comments} comments . {data?.shares} shares
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.IconView,
          {
            backgroundColor:
              useColorScheme() === 'dark'
                ? ThemeColors.BLACK
                : ThemeColors.WHITE,
          },
        ]}>
        <TouchableOpacity style={styles.IconItem}>
          <ThumbsUpIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.IconItem}>
          <CommentIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.IconItem}>
          <WhatsAppIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.IconItem}>
          <ShareIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  mainContainer: {},
  mainContentContainer: {
    width: width,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    paddingBottom: 5,
  },
  PostContentContainer: {
    paddingTop: 8,
  },
  ProfileView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  PersonNameText: {
    fontSize: 12,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.BOLD,
  },
  suggestedText: {
    fontSize: 8,
    color: '#707070',
    fontFamily: ThemeFonts.MEDIUM,
    marginTop: -3,
  },
  ActionItemsView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  ActionItem: {
    height: 25,
    width: 20,
    marginLeft: 15,
  },
  captionText: {
    fontSize: 8,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
  },
  SeeMoreText: {
    fontSize: 8,
    marginTop: 5,
    lineHeight: 10,
    color: '#006FFF',
    fontFamily: ThemeFonts.MEDIUM,
  },
  hashtagsText: {
    fontSize: 8,
    color: '#006FFF',
    fontFamily: ThemeFonts.SEMI_BOLD,
  },
  CommentsShareView: {
    flexDirection: 'row',
    width: width,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  LikeCountView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  LikesText: {
    fontSize: 10,
    color: '#707070',
    alignSelf: 'center',
    fontFamily: ThemeFonts.MEDIUM,
    marginTop: 5,
    marginLeft: 5,
  },
  IconView: {
    flexDirection: 'row',
    width: width,
    alignSelf: 'center',
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  IconItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
