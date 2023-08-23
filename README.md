# Coding Society

**_Coding Society is a social media platform that provides users with the opportunity to connect, share their thoughts, discuss coding topics, and explore interesting ideas related to the world of programming._**

## Table Of Contents

- [Coding Society](#coding-society)
  - [Table Of Contents](#table-of-contents)
  - [App Structure](#app-structure)
    - [Login / Sign up](#login--sign-up)
    - [Home](#home)
      - [User Display](#user-display)
      - [The playground](#the-playground)
      - [Admin Display](#admin-display)
      - [The admin control panel](#the-admin-control-panel)
    - [Add New Post](#add-new-post)
    - [Explore More Posts](#explore-more-posts)
    - [Search Friends](#search-friends)
  - [The Feed](#the-feed)
  - [Running the Program](#running-the-program)

## App Structure

### Login / Sign up

The "Login / Sign up" section allows new users to register for an account or existing users to log in. Here, users can create a unique profile that reflects their coding interests and expertise. The login process ensures secure access to the platform's features.

### Home

The "Home" section serves as the central hub for users once they log in. It provides a personalized feed of content, discussions, and updates from individuals and groups that the user follows. This section is designed to keep users engaged and informed about the latest happenings within the coding community.

#### User Display

For a regular user, the display of the Home page is split into two main areas. The first is [the feed](#the-feed), the second one is [the Playground](#the-playground).

#### The playground

The playground allows the user to track other users' results in the various games offered by Coding Society via the leaderboard. Additionally, it allows playing the various games to try and beat the highscore. Currently, the only game is Minesweeper.

#### Admin Display

For an admin, the display of the Home page is split into two main areas. The first is [the feed](#the-feed), the second one is [the admin control panel](#the-admin-control-panel).

#### The admin control panel

The admin's control panel allows broad control of the app's interface and database via a dashboard:

- Adding tags for users to tag their posts.
- Enabling / Disabling features and screens.
- Complete logging activity of the app with different filters for the admin's comfort.

### Add New Post

The "Add New Post" section enables users to create and share their own posts. Users can write about coding concepts, share tutorials, present coding projects, or seek assistance from the community. This feature encourages knowledge exchange and collaboration among users.

### Explore More Posts

The "Explore More Posts" section allows users to discover a wide range of posts from various categories. The algorithms recommend posts that have not been responded to by the user yet, and posts that the user's friends liked. This section encourages users to explore diverse coding subjects beyond their usual scope.

### Search Friends

The "Search Friends" section facilitates user connections. Users can search for other members based on usernames. Building a network of friends and like-minded individuals enhances collaboration and fosters a sense of community.

## The Feed

The "Feed" is a dynamic stream of posts written by the social media's users whom the user follows. This personalized feed ensures that users stay up-to-date with the latest conversations and developments in the coding world.

## Running the Program

To set up and run the Coding Society program on your local machine, follow these steps:

1. Download the necessary npm modules by executing the following command in your terminal:

```sh
npm install
```

2. Once the download is complete, initiate the program by running the following command:

```sh
npm start
```

This command will automatically start both the client and server servers. Please note that the program is configured to run on port 3000 for the client and port 3080 for the server. Make sure that these ports are available and not in use by other applications.
