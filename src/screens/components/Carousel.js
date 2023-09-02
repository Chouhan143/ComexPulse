import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Carousel = () => {
  const FlatlistRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const ScreenWidth = Dimensions.get('screen').width;

  const CarouselData = [
    {
      id: 1,
      image: require('../../../assets/images/CarouselImage/Carousel01.jpg'),
    },
    {
      id: 2,
      image: require('../../../assets/images/CarouselImage/Carousel02.jpg'),
    },
    {
      id: 3,
      image: require('../../../assets/images/CarouselImage/Carousel03.jpg'),
    },
    {
      id: 4,
      image: require('../../../assets/images/CarouselImage/Carousel04.jpg'),
    },
  ];

  //   Display Images
  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{
            width: ScreenWidth,
            height: responsiveHeight(20),
            borderWidth:responsiveWidth(0.1),
          }}
        />
      </View>
    );
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: responsiveHeight(1),
        }}
      >
        {CarouselData.map((dot, index) => (
          <View
            key={index}
            style={[
              styles.indicatorStyle,
              { backgroundColor: index === activeIndex ? '#24c1db' : '#c3c5d1' },
            ]}
          ></View>
        ))}
      </View>
    );
  };


  useEffect(() => {
    const interVal = setInterval(() => {
      const nextIndex = (activeIndex + 1) % CarouselData.length;
      setActiveIndex(nextIndex);
      FlatlistRef.current.scrollToIndex({
        animated: true,
        index: nextIndex,
      });
    }, 3000);

    return () => clearInterval(interVal);
  }, [activeIndex, CarouselData.length]);

  return (
    <View>
      <FlatList
        ref={FlatlistRef}
        data={CarouselData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: responsiveHeight(1),
        }}>
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: 'red',
    height: responsiveHeight(1.5),
    width: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    marginHorizontal: responsiveWidth(1.2),
  },
});
