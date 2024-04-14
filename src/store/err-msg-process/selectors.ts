import { State } from '../../types/state';
import { NameSpace } from '../../components/const/const';

export const getErrorMessage = (state: State): string | null =>
  state[NameSpace.ErrorMessage].errorMessage;
