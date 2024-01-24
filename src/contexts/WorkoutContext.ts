import { Workout } from '@/data/types';
import { createContext } from 'react';



  


export const workouts = [{
    date: new Date(2023, 2, 23),
    complete: false,
    movements: [{
        name: "Bench Press",
        max: 240,
        sets: [
            {
                reps: 5,
                amrap: false,
                percent: .75,
                complete: false,
            }, {
                reps: 3,
                amrap: false,
                percent: .85,
                complete: false,
            }, {
                reps: 1,
                amrap: true,
                percent: .95,
                complete: false,
            }
        ]
    },]
}, {
      date: new Date(2023, 2, 23),
      complete: true,
      movements: [{
          name: "Deadlift",
          max: 400,
          sets: [
              {
                  reps: 5,
                  amrap: false,
                  percent: .75,
                  complete: true,
              }, {
                  reps: 5,
                  amrap: false,
                  percent: .85,
                  complete: true,
              }, {
                  reps: 5,
                  amrap: true,
                  percent: .95,
                  complete: true,
              }
          ]
      },]
  }]

export const WorkoutContext = createContext<Workout[]>(null);