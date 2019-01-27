import { Machine, actions } from 'xstate';

const { assign } = actions;

export default PomodoroFSM = Machine({
  id: 'countdown',
  initial: 'idle',
  context: {
    startTime: null,
    endTime: null,
  },
  states: {
    idle: {
      on: {
        ACTIVATE: {
          target: 'working',
          actions: 'countdown',
        }
      }
    },
    working: {
      on: {
        CANCLE: { target: 'idle' },
        DONE: { target: 'extending' },
      },
    },
    extending: {
      on: {
        CANCLE: { target: 'idle' },
        SUBMIT: { target: 'syncing' },
      }
    },
    syncing: {
      on: {
        DONE: { target: 'resting', actions: 'countdown'},
        ERROR: { target: 'extending' },
        CANCLE: { target: 'idle' },
      }
    },
    resting: {
      on: {
        CANCLE: { target: 'idle', },
        DONE: { target: 'idle' }
      }
    }
  },
}, {
  actions: {
    countdown: assign((ctx, event) => {
      return {
        startTime: event.startTime,
        endTime: event.endTime
      }
    })
  }
});
