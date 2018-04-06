import { Duration } from 'luxon';
import { WorkoutSetType, Exercise } from './types';

const exercise: Exercise = {
  name: 'Back squat',
  id: '0',
  restTime: Duration.fromMillis(300000),
  musclesWorked: ['legs'],
  sets: [
    {
      type: 'warmup' as WorkoutSetType,
      comment: null,
      repetitionCount: 5,
      weight: 20,
      id: '0',
      completed: false,
    },
    {
      type: 'warmup' as WorkoutSetType,
      comment: null,
      repetitionCount: 5,
      weight: 40,
      id: '1',
      completed: false,
    },
    {
      type: 'warmup' as WorkoutSetType,
      comment: null,
      repetitionCount: 5,
      weight: 60,
      completed: false,
      id: '2',
    },
    {
      type: 'normal' as WorkoutSetType,
      comment: null,
      repetitionCount: 5,
      weight: 120,
      completed: false,
      id: '3',
    },
    {
      type: 'normal' as WorkoutSetType,
      comment: null,
      repetitionCount: 5,
      weight: 120,
      completed: false,
      id: '4',
    },
    {
      type: 'normal' as WorkoutSetType,
      comment: null,
      repetitionCount: 5,
      weight: 120,
      completed: false,
      id: '5',
    },
    {
      type: 'normal' as WorkoutSetType,
      comment: null,
      repetitionCount: 5,
      weight: 120,
      completed: false,
      id: '6',
    },
    {
      type: 'normal' as WorkoutSetType,
      comment: null,
      repetitionCount: 5,
      weight: 120,
      completed: false,
      id: '7',
    },
  ],
};
export default exercise;
