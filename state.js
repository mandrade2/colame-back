import Immutable from 'immutable';
import { Observable } from 'rxjs/Observable';
import { observable, observable2 } from './observables';

const initialState = {
  pos: 5,
};

const state = Observable.merge(observable, observable2).scan(
  (stated, changeFn) => changeFn(stated),
  Immutable.fromJS(initialState),
);

export default state;
