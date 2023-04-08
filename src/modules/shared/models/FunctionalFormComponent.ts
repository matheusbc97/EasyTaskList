import {ForwardRefRenderFunction} from 'react';
import {FormHandles} from './FormHandles';

export interface FunctionalFormComponent<T>
  extends ForwardRefRenderFunction<FormHandles, T> {}
