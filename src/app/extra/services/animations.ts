import { animateChild, query, style, transition, trigger, group, animate, state } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Debut <=> Fin', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
      ]),
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]);

export const descendAnimation =
  trigger('descend', [
    state('true', style({ top: '0', opacity: 1, height: 'calc(100vh - 60px)', paddingBottom:'60px' })),
    state('false', style({ top: '-120%', opacity: 0, height: 0, paddingBottom:'0px' })),
    transition('false <=> true', [animate('.4s ease')])
  ]);

export const apparaitAnimation =
  trigger('apparait', [
    transition(':enter', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
    transition(':leave', [animate('100ms', style({ opacity: 0 }))])
  ]);
export const ouvreAnimation = trigger('ouvre', [
  transition(':enter', [style({ opacity: 0, left: '-100%' }), animate('300ms', style({ opacity: 1, left: '0' }))]),
  transition(':leave', [animate('300ms', style({ opacity: 0, left: '-100%' }))])
]);