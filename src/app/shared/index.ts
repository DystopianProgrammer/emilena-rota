import { trigger, transition, animate, style, state } from '@angular/core';

export const animations = [
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1
            })
        ),
        transition('void => *', [
            style({
                opacity: 0
            }),
            animate('0.2s ease-in')
        ]),
        transition('* => void', [
            animate('0.5s ease-out', style({
                opacity: 0
            }))
        ])
    ])
];

