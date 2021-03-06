# Ralli ![Ralli Icon](http://i.imgur.com/H5eG30o.png)
Rally is a geolocation-based social event planning mobile app built by a team of five Dev Bootcamp students as our final project. The concept around Rally was to make social event planning easier, users can create events by placing markers on a map at the event's physical address complete with event details such as start time and description. The app was built using the React-Native framework and uses Firebase on the backend. It features real time geo-location marker rendering, group chat, news-feed notifications, and group creation. 

## Watch the demo
<a href="https://www.youtube.com/watch?v=_Ny1eIW7BKU&feature=youtu.be"><img src="./readme-images/youtube-demo.png" height="250"></a>

## Core Features
  - Facebook authentication
  - Creating your own groups
  - Add people to a group by email
  - Real time chat in group with friends
  - Real time event creating
  - Real time event rendering on map
  - Real time feed and invitations
  - Attending events
  - Invite your groups or friends
  - Suprise button offers randomized event look up

####Login/Singup page

<img src="./readme-images/login.png" height="700">
<img src="./readme-images/signup.png" height="700">

####Ralli marker map page
<img src="./readme-images/main-map.png" height="700">
<img src="./readme-images/marker.png" height="700">

####Group page & create a new group
<img src="./readme-images/group.png" height="700">
<img src="./readme-images/create-group.png" height="700">

####Chat in a group & add a user to a group 
<img src="./readme-images/chat-in-group.png" height="700">
<img src="./readme-images/add-person-to-group.png" height="700">

####Create a event & invite your groups to an event
<img src="./readme-images/create-ralli.png" height="700">
<img src="./readme-images/invite-group.png" height="700">

####Real time notification & user profile
<img src="./readme-images/feed.png" height="700">
<img src="./readme-images/profile.png" height="700">

####Randomized event look up
<img src="./readme-images/random.png" height="700">


##Tech stack used
React Native
Firebase

##Test it on your machine locally
- Clone this repo ```git clone https://github.com/OUCHUNYU/Ralli.git```
- ```cd Ralli```
- run `npm install` in your command line tool
- Open Ralli.xcodeproj in XCode
- Press cmd+r to build it


## Collaborators
- [Eric](https://github.com/egumerlock)
- [Miqueas](https://github.com/MiqueasLH)
- [Kevin](https://github.com/kevniu)
- [Blair](https://github.com/BlairWhite)
- [Chunyu](https://github.com/OUCHUNYU)



## Note to all collaborators
** All warning messages are disabled, to activate go change** <br />
```javascript
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
```
<br />
**to**
<br />
```javascript
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=false"];
```
## Todo list
- [ ] Testing
- [ ] Deleting events
- [ ] Set timeout
- [ ] Delete person from group

