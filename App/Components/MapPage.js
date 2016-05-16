'use strict';
var Button = require('./Common/button');
var UserProfilePage = require('./UserProfilePage.js')
var EventFeed = require('./EventFeed.js')
var GroupsPage = require('./GroupsPage.js')
var GoogleMap = require('./GoogleMap.js')
var CreateMarker = require('./CreateMarker.js')


var maps = 'data:image/png;base64,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'
var groups = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADWklEQVRoQ+2Y/ZVNMRTF91SACpgKUAEqYCpABagAFaACpgJUgAqMClABKmD9ZmXflRcvyU1y73rGuuefd9fLxzl7n68kR7rgcnTB7dcG4NAe3DyweWCQgS2EEgKvSbol6Z4kvm+E8TNJ3yS9k/Re0s9B4qflS3ngsqRHkh5L4rskGP9S0qslgCwBAJbfBsZbiMUrDyXx2y2jADD+wwzWcwbijTsjIEYAECpfB4w3KEAc94bTCIA3ku53+3534amkBz175QCQkGxIiMAQcYrBKEJuh9Dp0ZlbQyh9DIMQY/14Gv0kvvVnqxCTiWmXv1SZlSzJvnXYCyVyAIINUxlOPfC5YDyKPP/HArGfkoNRV8KfvwuuBcRNj8cAqOEvCgs/hdChQZG8awjJTMMjlGiIOaH8EgU794Ea+wawRvzbUIdoDcDkhdgDJbeh4F8CMJH/XwHALdcLcUdsEqNUKpJ4DSGJSWZyjFzLyRcXm31JfBJOjSUDa2B7wE1GFRZzyuXctTeJWYdhV8MEjr6xkLywz/9xxWLNkx6LQ9Vzz2EPmhVG4gU3NW/N/68lfY9LfdoHMJCFhBKG8c1mLEaRmw3zCKlLYfeJkQYgdFoMQn6FkEGXmyT6IQtdkId+vMR3tpFZP5vDsnOChbBzXnuDPJP0NHyzIQzG4yUs7E/P8d3huST2a9F/PnfkMMd6GLqbgCpdVHzxiY3lhoaHuyQFwCGKzQgdXEjtR+iKuJCx+FDnnIi7Jt4AGOt9WWGt18c3NvZ3zKPHhzivT/UTPoxNhzoDqB3iUnbSQxXhxQm2RfAUYYp06zeA2jFin2E7h6rAMEBKZxj2gVUMj6+S3foBEFeDFgaZu6/6wKZfJdyMqFh+lUhfJIb0A6AHPWWPXIBxDBsRQOIRgLgsz93vbLQKOX4pt064ucoJNcrz0BvRCAAqAn2AXwRP4BXKYu6phErkSufwoqqQ0GnnnUVEDwBinA5aq92AMLusyV1TbSjgaYZNHmkF0FruZrEYTfrrzlvboAXA2sbb1iYQLQB6mlWNwNx43OSKe8wFsOY9OGcgLw/Vd9O5ANZ4B6p5Z9Zr3RwAa14hayB8xczOmwNgpNXXDKyNVy9KcwDUlBx0fANwUPoXuFIe2v7hO/EGYJSBP57ywWBBqxjOAAAAAElFTkSuQmCC"
var search ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAEAElEQVRoQ9WajZENQRDH+yJABkRwLgJEgAiOCBABFwEXASI4IuAiQASIABFQP7V9+rXp3Z6PfbVvqq583O7M/Lr/093T7x1J37guIscicjeY5qOIfBGRn33L5N8+yj969eRNETkVkQcicjv5/mcReScib0XkW/KdpsdqgAB5LiKPmlb699IbETlbCywDhKwAedoJ4l9/NYENleMSEJJ6PSOt95OUkBEbQ1oM3sMQeBVp3g+MwfOPzXvdNpsDYlMfpo3Zhb6LyIsJJGtd4ADDK9fcrpnj3iioCAiYTwVzoX02lQXxUwCGdJGwHycjoEpAJc/8mkKzSqpXGqxBSLfeGuIpD4QFkZkNx+QR8kyrVyJ41gKKPKYDgyG/5rU8EHJ6YhbAMxzs5gUWXAkUAcV66rwnologNv7VweCZUTKL2Ern9VZrnrJAJDwqAB0EAKLZPgbr2EBBRdGUwBXIe4fQjOXWklop+nnpNXlJgbyFSHZ4bJ8Dj5DEuxSiQOQcG9lu7NE7CkCA+OEiHrmpagDkJ6KcIavbQXAgxK49qMhtmVRtWIDYLLlHR0luRD80vfaginhpFiEnVRkSIH9+/CR460JElgrZEbDeuNWRtgTkayoFrrZWA6HPSUOAvCdw+Z3p7rKPvPS7J9KVPBQBUTFUR50GLw0H8pJTD7G3tWW3iuT8pm3QAI7frzV8UHg23b/S62XCts/gD6fbanqRigeHhO2lxOp/P+QiFkAOSazMzYG3Fy2foX0lTiGJ9Eb22LzhLmcamKHTs8Vp6SI22lNe2tXnB8ro+sBmKXXs9cEvqFYiaHDL7LlqYDDKK/7UUV3HWSD+nrngRVDAAEZh2yLD4Rc8gPwlj/8rtZao7YD3/TW1rPax+Tdw/HAeorHaFZwFfZOkJD2e0/4aYTYC4zk8xpxRxVySWnX9Zi1VamPVtpZIhv7jFLzEz5z8opZZ9hONosejRuMqTUCzg6jNTB4icTeP2lZwb0TDK/T95qp2zidRk5urnr90oFlq1ntPYTnOFWeH85EN1YCwQc6TDc0ZT7AGOSnVtFm6hSINJrJVhN0EEuEHC9JltR+nECx4n/PlexQ6B9GPDUcft9i1Up2oJSCNaEjEtogzlp17BnjmxGOlHBi9uwiVAdLJyVNswnZXa8EAwaPMY8+FvzbMzTsLVQNkwagYkFEkRb8hpAUI8i2dO18pLBkqhGoBsotxwPWc+E3oR5SZNpS/By0B8fsiVC9QZuHMM8iZgDJXdZTm+Q9qK0BsNip8lwyyA7UloCFQWwPqhtoiUA/UyVaBWqHOtwzUAnW5daBaqLNDAMpC/f0KwqEALUFdfdPlkIAiqJ2v7RwaEFDUjlQV+n2hnS9T/QHeWQNU0fKQxgAAAABJRU5ErkJggg=='
var profile ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADDElEQVRoQ+WZgZENQRCG/4sAGRDBEQEiQASIABEgAkSACBCBEwEiIANEQH1X21dzc7PbPfN6n7d1XfWqrm5me/rv/runZ+ZIuXJP0n1J1yVdlXRzUv9N0m9JPyV9lPQpa9mjBEUY+3wyHKMjAhiAPJuARb5pztkVAIY/nbw9YgRAXkt6OfIx34wCwNOfC4qMrm/fQbG7I9EYAQCvMT5Klyg4ogEIwISlFwBG/1jBeDMYEDd6ItEDIJs2c14mAreiIegB8GKqNlHdu8wjqVnPlSgASuXXFalTGxqmUhTAO0kPXXfkTngv6ZGnMgrg1x69Xyb0tQwAtAYfPEUrjT+YduxZ9ZEI/A/6mMFvpp1+JwAnkm6v5GFP7RdJd5YmRSJA9bGu0lswe9zdEyIA/mZb1alv0cZLAYAwHnd6LWv6d4++kQhsPok3X0Y3v5HBZ5qrKwWx6VOITKbQ95T91p9I+xLJAYysaRTuFoMIWwel1GaOBbgSKaNAcnMEzBCOqOWOi/dp4XHUokQjgJLWgYbIPPYWccbfNtrm9AON2dDaE7jfAYTrrQoIUcV4ikQpbu0vJ/dEgO9aVOL/0IsIwduIkKzcB9U3G2Hq2CK9APiOxg7+l/lg+uzqkHE6SYsKhtLRwnO7eqyBYjzjq16r2KIYhJFZLQa0wfheGg7fzBkQaMPVYisaESrhdagUuoFoKRyhUK2HaGAE1IgCwXCSH/DdXt8liT2vAqK8XjeKQREMhd9QD+NTJCMCKYaMKrnUACinXSVvwcvDunojQH/CJkTnyN/UfRKYDaw3GUl+dJHIpovWBF3oDUkUAIu9cq76SE77WdKWRqCDpKbe22/OSICEnp8iAKgq9CzZDxqeh4koPdZixfIA8AY2vMl4FgbHWX/2DW0JANx+Elxk7WmzV4xzAEhSaHNIAp0uHGNbAPb9mBF1EjnB09O5CtUCUB/vogvsY96FY2wNgPIGgEMWzuEAOZUawCF732w+F4USANs5V+lbEHLhtI0pARxS2fSceFZWSwC8wFOBtiBnDx//AHtGkDFHCqndAAAAAElFTkSuQmCC'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Image,
  TabBarIOS
} from 'react-native';

var styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    flex: 1
  },
  label: {
    fontSize: 14
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  }
});



class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'GoogleMap'
    };
  }

  render() {
    this.rightButtonAssign
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}
      tintColor='red'>
        <TabBarIOS.Item
        selected={this.state.selectedTab === 'GoogleMap'}
        title='Map'
        icon={{uri: maps, scale: 2}}
        style={styles.wrapper}
        onPress={() => {
          this.setState({
            selectedTab: 'GoogleMap'
          });
        }}>
        <GoogleMap />
        </TabBarIOS.Item>

        <TabBarIOS.Item
        selected={this.state.selectedTab === 'UserProfilePage'}
        title='Profile'
        icon={{uri: profile, scale: 2}}
        style={styles.wrapper}
        onPress={() => {
          this.setState({
            selectedTab: 'UserProfilePage'
          });
        }}>
        <UserProfilePage />
        </TabBarIOS.Item>

        <TabBarIOS.Item
        selected={this.state.selectedTab === 'GroupsPage'}
        title='Groups'
        icon={{uri: groups, scale: 1.5}}
        style={styles.wrapper}
        onPress={() => {
          this.setState({
            selectedTab: 'GroupsPage'
          });
        }}>
        <GroupsPage />
        </TabBarIOS.Item>

        <TabBarIOS.Item
        selected={this.state.selectedTab === 'SearchLocationPage'}
        title='Search'
        icon={{uri: search, scale: 2}}
        style={styles.wrapper}
        onPress={() => {
          this.setState({
            selectedTab: 'EventFeed'
          });
        }}>
        <EventFeed />
        </TabBarIOS.Item>

      </TabBarIOS>

    )}

    rightButtonAssign() {
      console.log("eagoheaoguh")
      this.props.navigator.push({
        onRightButtonPress: gotoMarker
      })
    }

    gotoMarker() {
      this.props.navigator.push ({
        title: 'Create Marker',
        Component: CreateMarker
      })
    }

};

module.exports = MapPage;
