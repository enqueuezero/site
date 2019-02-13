---
title: Getting Started with React | Hands-On Cloud Native Application
sidebar: auto
---

# Getting Started with React

This article gives a hands-on tutorial on setting up a React application.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces.
It lets you compose complex UIs from small and isolated pieces of code called “components”.
It was originally created by Jordan Walke, a software engineer at Facebook.
Within just a few years, it has achieved great adoptions among many companies and organizations.

## Why use React?

### Declarative

Writing interactive UIs is harder than many people thought, which involves a lot of inner states and transitions. Have you ever considered implementing a loading spinner? When should the component show the spinner? What if the spinner load forever? Should it apply with a blurring background?  Imperative code is suitable for implementing algorithms, but never for managing a large amount of internal states. To address it, we need declarative code.

For example, below JavaScript function `Timer` has an internal state `seconds`. The component returns a DOM with ever changing `seconds`, though the caller of the function `Timer` need not to know the existence of `secodns`. When `setInterval` triggers a value changing in the next moment, React will efficiently update and render it to the browser DOM. 

```javascript
function Timer() {
  const { seconds, setSeconds } = useState(0);
  setInterval(() => setSeconds(seconds + 1), 1000);
  return <div>Seconds: {seconds}</div>;
}
```

We just used 3 lines of code implementing state declaration, state changing, and state rendering. It's super powerful when the component has more internal states. The declarative style make the code predicable and easier to debug.

### Components hold states only in its internal.

### Virtual DOM is fast.

DOM manipulations can be slow if implemented inappropriately. For example, you have a list containing hundreds of items. Rebuilding the entire list to the DOM could be very inefficient. To address this problem, we can build the DOM for those changed items only. Virtual DOM is such technique for this kind of problem.

In React, every DOM on the page has a corresponding virtual DOM object. The idea is, manipulating DOM is slow but manipulating virtual DOM in memory is fast. By comparing the virtual DOM with previous version, we can quickly spot a minimal set of changes and apply them to the page.

In summary, React updates DOM in below ways:

* Your React code updates virtual DOM.
* React compares the virtual DOM to previous version and figure out what actual DOM need to be changed.
* React patches these changes to the page.
* Changes are reflected to the browser screen.

### One-way data binding.

## Essential Knowledge

### Virtual DOM

DOM stands for Document Object Model and is an abstraction of a structured text. HTML code is the structured tree object and Elements of corresponding HTML code become nodes in the DOM. To sum up, DOM is an in-memory representation of HTML code.

Nowadays, there are usually hundreds of thousands of DOM in a single page, not to mention that each one could attach events, styles, etc. A typical `jQuery`-like framework would handle the issue by finding nodes by selectors first, and then update if needed.

```javascript
<div id="message">Hello World</div>
<script>
$("#message").html("Hands-On Cloud Native Application").
</script>
```

However, the finding operations on a huge amount of DOM nodes are slow. Besides, managing these tangled manipulation code could be a mess.

Virtual DOM became one of the most popular solutions. To be fair, React did not invent it but integrated it into its core. The Virtual DOM is an abstraction of the HTML DOM. So, considering HTML DOM being an abstraction of HTML code, why bother applying two layers of abstractions to get changes to the page?  The short answer is abstractions bring more values, and these values help us overcome performance issue and reduce management cost.

### JSX

### Component

### Props

### States

### Events

### Hooks

### Functional Programming

## Play Around With React

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

* `README.md` holds the description of the project.
* `node_modules` holds all of the dependencies of the React application.
* `package.json` includes the metadata of the project. The dependencies described in `package.json` can be installed by `yarn install`.
* `.gitignore` claims those should not be included into version control, such as `node_modules`. The reason we don't check in some files are usually that they can be generated by other commands.
* Files in directory `public` are those going to be distributed to user browsers.
* Files in directory `src` are React components, which will be built into `dist` directory.

### Start React App

Runs the app in development mode.

```bash
$ yarn start
```

Open <http://localhost:3000> to view it in the browser.

### Test React App

Run below command in another terminal session.

```bash
$ yarn test
```

You should see all test passed.

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

Install `react-router-dom`.

```bash
$ yarn add react-router-dom
```

Import the router.

<<< @/hands-on-cloud-native/src/react/app-setup-router.js{2-16}

### Setup 404 Page

Create a `NotFound` component.

<<< @//hands-on-cloud-native/src/react/app-setup-router-404.js{2,10-14,18,20,21}

By browsing to the page <http://127.0.0.1:3000/any>, or replacing `any` to any path, you should see "Not Found" on the page.
By browsing to the page <http://127.0.0.1:3000>, you should see "Hello World" on the page!

### Setup App Page

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

## References

facebook/create-react-app, github.com, <https://github.com/facebook/create-react-app>

React (JavaScript Library), en.wikipedia.org, <https://en.wikipedia.org/wiki/React_(JavaScript_library)>

Pomodoro Technique, en.wikipedia.org, <https://en.wikipedia.org/wiki/Pomodoro_Technique>

React: The Virtual DOM, <https://www.codecademy.com/articles/react-virtual-dom>

The difference between Virtual DOM and DOM, <https://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/>