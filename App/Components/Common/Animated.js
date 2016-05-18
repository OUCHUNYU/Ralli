var React = require('react-native');
var Dimensions = require('Dimensions');
var {
  width,
  height
} = Dimensions.get('window');
var {
  AppRegistry,
  StyleSheet,
  View,
  Animated
} = React;
var SQUARE_DIMENSIONS = 30;
var SPRING_CONFIG = {tension: 2, friction: 3}; //Soft spring
var Animated = React.createClass({
  getInitialState: function() {
    return {
        pan: new Animated.ValueXY()
    };
  },
  componentDidMount: function() {
    this.startAndRepeat();
  },
  startAndRepeat: function() {
    this.triggerAnimation(this.startAndRepeat);
  },
  triggerAnimation: function(cb) {
    Animated.sequence([
      Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: 0, y: height - SQUARE_DIMENSIONS} //animate to bottom left
      }),
      Animated.spring(this.state.pan, {
          ...SPRING_CONFIG,
          toValue: {x: width - SQUARE_DIMENSIONS, y: height - SQUARE_DIMENSIONS} // animated to bottom right
      }),
      Animated.spring(this.state.pan, {
            ...SPRING_CONFIG,
            toValue: {x: width - SQUARE_DIMENSIONS, y: 0} //animate to top right
      }),
      Animated.spring(this.state.pan, {
          ...SPRING_CONFIG,
          toValue: {x: 0, y: 0} // return to start
      })
    ]).start(cb);
  },
  getStyle: function() {
    return [
              styles.square,
              {
                transform: this.state.pan.getTranslateTransform()
              }
            ];
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Animated.View style={this.getStyle()} />
      </View>
    );
  }
});
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  square: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    backgroundColor: 'blue'
  }
});

module.exports = Animated;
