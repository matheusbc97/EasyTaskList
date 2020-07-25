import {Action} from 'redux';

type ActionThunk = (...args: any) => any;

declare module 'redux' {
  export interface Dispatch<A extends Action = AnyAction> {
    <T extends ActionThunk>(action: T): ReturnType<T>;
  }
}
