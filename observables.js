import * as Rx from "rxjs";

export const observable = Rx.Observable.create(function(observer) {
  observer.next(3);
  observer.next(2);
  observer.next(1);
});

export const observable2 = Rx.Observable.create(function(observer) {
  observer.next(6);
  observer.next(5);
  observer.next(4);
});
