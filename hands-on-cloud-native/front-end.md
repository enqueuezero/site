---
title: Build the Front End | Hands-On Cloud Native Application
---

## Build the Front End

This article gives a hands-on tutorial on implementing a Pomodoro app.

We are going to implement below components.

* CancelButton
* Countdown
* Pomodoro
* History

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

Reusing a component provided by the community is a big thing; it enables you to focus on the business value you want to add.

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

Deploying a React single-page web app to Kubernetes, <https://www.jeffgeerling.com/blog/2018/deploying-react-single-page-web-app-kubernetes>