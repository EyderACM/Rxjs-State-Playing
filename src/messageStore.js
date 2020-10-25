import { Subject } from "rxjs";

const subject = new Subject();

const initialState = {
  data: [],
  dataCount: 0
};

let state = initialState;

const chatStore = () => {
  const cleanupState = () => {
    setTimeout(() => {
      state.data.pop();
      subject.next({ ...state, newDataCount: state.newDataCount-- });
    }, 2500 * state.newDataCount);
  };

  return {
    init: () => {
      state = { ...state, newDataCount: 0 };
      subject.next(state);
    },
    subscribe: (setState) => subject.subscribe(setState),
    sendNotification: (message) => {
      state = {
        ...state,
        data: [...state.data, message],
        newDataCount: state.newDataCount + 1
      };
      subject.next(state);
      cleanupState();
    }
  };
};

export default chatStore();
