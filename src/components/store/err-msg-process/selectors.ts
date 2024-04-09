import { State } from '../../types/types';
import { NameSpace } from '../../const/const';

export const getErrorMessage = (state: State): string | null =>
  state[NameSpace.ErrorMessage].errorMessage;
