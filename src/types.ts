import { Duration } from 'luxon';

export type WorkoutSetType = 'superset' | 'normal' | 'warmup';

export interface WorkoutSet {
  type: WorkoutSetType;
  comment: null | string;
  repetitionCount: number;
  id: string;
  weight: number;
  completed: boolean;
}
export interface Exercise {
  name: string;
  musclesWorked: string[];
  restTime: Duration;
  sets: WorkoutSet[];
  id: string;
}
export interface Workout {
  exercices: Exercise[];
  comment: null | string;
  date: Date;
}

export type Maybe<T> = T | null;
// Keep types the same, but make each property to be read-only.
export type Readonly<T> = { readonly [P in keyof T]: T[P] };
export type Partial<T> = { [P in keyof T]?: T[P] };
export type Nullable<T> = { [P in keyof T]: T[P] | null };

// Same property names, but make the value a promise instead of a concrete one
export type Deferred<T> = { [P in keyof T]: Promise<T[P]> };

// Wrap proxies around properties of T
export type Proxify<T> = {
  [P in keyof T]: { get(): T[P]; set(v: T[P]): void }
};
