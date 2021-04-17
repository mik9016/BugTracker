# Buggy 🐛🐛🐛

Buggy is an app to manage projects.<br/> 
It allows you to create projects, tickets and teams around the projects.
Manage and see how the project is moving forward.<br/> 
Was inspired by Jira 🔥🔥

## How to run the app

1. Either fork or download the app and open the folder in the cli.
2. Install all dependencies using the `npm i` command.
3. Create Firebase.js file.
4. Login/Register to Firebase
5. Create new project, new web app and copy Firebase SDK snippet.
6. Paste into Firebase.js and replace code below with new credentials and initialize app 

<code> 

    const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  
    };
    
</code>

7. Start the web server using the `npm start` command. The app will be served at http://localhost:3000/
8. Go to http://localhost:3000/ in your browser and use the app.

## Ok, but how to use it?

1. First, you need to login. If you just want to try out the app go to www.buggybuggy.com to see the demo.
2. Login using test credentials:

   email: usertester@gmail.com <br/>
   password: GoTestBuggy4Now

    or just register and create your account.
3. Start using the app!
4. Create Projects, add issues and project members and move forward with the projects!

## Features

- Register
- Login
- Create Project
- Update Project
- Delete Project
- See created Projects
- See projects you are involved in
- Create Issues
- Update Issues
- Delete Issues
- Invite other users to the project
- Delete other users from the project
- Update roles of the users
- Upload the avatar Photo
- Sort Tickets by status
- Read Number of sorted Tickets
- Sort Tickets by letter

## Technologies used

- React JS
- Firebase Authentication
- Firebase Realtime Database
- Firebase Storage
- Sass

## How does the App looks like?

![Buggy](./src/assets/BuggyHome.png)


