---
title: Build Front-End Application by React
sidebar: auto
---

# Build Front-End Application by React

This article gives a hands-on tutorial on implementing a Pomodoro + GTD app.

## What is React?

React is a open source JavaScript library for building user interfaces.
It was originally created by Jordan Walke, a software engineer at Facebook.
Within just a few years, it has achieved great adoptions among many companies and organizations.

## Why use React?

* One-way data binding with props makes the application easy to maintain.
* Components hold states only in its internal.
* Virtual DOM is fast.

## Essential Knowledge

### What is Component?

### What is Virtual DOM?

### What is JSX?

## Setup

### Create a New App

`create-react-app` is the official way to setup the boilerplate template for a new React application.

Let's create a new project with the name of `tomat-coffee`.

```bash
$ yarn create react-app tomato-coffee
$ cd tomato-coffee
$ yarn start
```

Once finished, you should now see the directory as below.

```
tomato-coffee
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

### Start React App

Runs the app in development mode.

```bash
$ yarn start
```

Open <http://localhost:3000> to view it in the browser.

### Make the First Change

Leave the `yarn start` process running and let's modify the file `src/App.js` in your favorite editor.

```js{7}
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Hello World</p>
      </div>
    );
  }
}

export default App;
```

You should see the page automatically reloaded in your browser with only text "Hello World".

## Handle Routes

### Install Dependency

Install `react-router-dom`.

```bash
$ yarn add react-router-dom
```

### Setup Routes

Import the router.

<<< @/hands-on-cloud-native/src/react/app-setup-router.js{2-16}

### Setup 404 Page

Create a `NotFound` component.

<<< @//hands-on-cloud-native/src/react/app-setup-router-404.js{2,10-14,18,20,21}

By browsing to the page <http://127.0.0.1:3000/any>, or replacing `any` to any path, you should see "Not Found" on the page.
By browsing to the page <http://127.0.0.1:3000>, you should see "Hello World" on the page!

### Clean Up

So far, we have two pages. Let's move them into a sub-directory for better organization. Create directory `src/pages` before saving below two files `src/pages/not-found.js` and `src/pages/home.js`.

```js
// src/pages/not-found.js
import React from 'react';

export default () => (
  <div className="App">
    <p>Not Found</p>
  </div>
)
```

```js
// src/pages/home.js
import React from 'react';

export default () => (
  <div className="App">
    <p>Hello World</p>
  </div>
);
```

Finally, let's import the two components into `src/App.js`.

<<< @//hands-on-cloud-native/src/react/app-setup-router-cleanup.js{4,5}

## Build the App

We are going to implement below components.

* CancelButton
* Countdown
* Pomodoro
* TodoTextInput
* TodoHeader
* TodoList
* Todo

After implementing these components, we'll assemble them into a page.

### Install Dependency

```bash
$ yarn add moment react-countdown-now xstate
```

### Create CancelButton Component

Add file `src/components/CancelButton.css`.

<<< @/hands-on-cloud-native/src/react/app-cancel-button.css

Add file `src/components/CancelButton.js`.

<<< @/hands-on-cloud-native/src/react/app-cancel-button.js

If you want to use `CancelButton` in the other components, they can write something like below:

```js
<CancelButton onCancel={this.handleCancel} />
```

The point of `CancelButton` here is we hide the style and the details of the internal implementation.
The other components don't need to know it's handling a `click` event, but rather a `cancel` event.
A layer of abstraction is established, and hence it's much more maintainable at higher layers.

### Use Countdown Component

Similarly, we can use the `Countdown` component installed by `react-countdown-now` library like below:

```js
<Countdown date={Date.now() + 10000} />
```

In this way, we don't need to implement anything since it's ready to use.

### Implement a Finite State Machine

Since the React component encapsulates the states, it's a big deal to manage states in a component.
Using a finite state machine can make it simpler and maintainable.
Library `xstate` is a good library for this.

Let's take a finite state machine of Pomodoro technique as an example. There are six steps when performing Pomodoro technique.

1. Decide on the task to be done.
2. Set the pomodoro timer (traditionally to 25 minutes).
3. Work on the task.
4. End work when the timer rings and put a checkmark on a piece of paper.
5. If you have fewer than four checkmarks, take a short break (3–5 minutes), then go to step 2.
6. After four pomodoros, take a longer break (15–30 minutes), reset your checkmark count to zero, then go to step 1.

We need to map these steps into a run of states for the timer. They could be as below:

* `idle`. It's when you're deciding on the task to be done.
* `working`. It's when you set the pomodoro timer and start working.
* `extending`. It's when you over working.
* `syncing`. It's when you have end the work and put the checkmark.
* `resting`. It's when you're taking a break.

Correspondingly, we can model these states into a finite state machine in a diagram like below.

<mermaid>
graph LR
    idle-- ACTIVATE -->working;
    working-- DONE -->extending;
    working-- CANCEL -->idle;
    extending-- CANCEL -->idle;
    extending-- SUBMIT -->syncing;
    syncing-- CANCEL -->idle;
    syncing-- DONE -->resting;
    resting-- CANCEL -->idle;
    resting-- DONE -->idle;
</mermaid>

Other than these states, we also need to maintain a context for these states:

* `startTime` of a pomodoro.
* `endTime` of a pomodoro.

Below is a module implemented such Finish State Machine.

<<< @/hands-on-cloud-native/src/react/app-pomodoro-fsm.js

### Setup App Route

```js
import React from 'react';
// TODO: import components
export default class Dashboard extends React.Component {
  render () {
    return (
      <div className="Dashboard">
        <Header user={{ username: 'test' }}/>
        <div style={{display: "flex"}}>
          <div className="sidebar">
            <Countdown />
            <Todo />
          </div>
          <div className="container">
            <History />
          </div>
        </div>
      </div>
    )
  }
}
```

## References

facebook/create-react-app, github.com, <https://github.com/facebook/create-react-app>

React (JavaScript Library), en.wikipedia.org, <https://en.wikipedia.org/wiki/React_(JavaScript_library)>

Pomodoro Technique, en.wikipedia.org, <https://en.wikipedia.org/wiki/Pomodoro_Technique>
