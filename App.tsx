/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import * as dateFns from 'date-fns';
import styled from 'styled-components/native';
import { Duration } from 'luxon';

type Props = {};

interface Workout {
  exercices: Exercise[];
  comment: null | string;
  date: Date;
}

interface Exercise {
  name: string;
  musclesWorked: string[];
  restTime: Duration;
  sets: WorkoutSet[];
}
type WorkoutSetType = 'superset' | 'normal' | 'warmup';

interface WorkoutSet {
  type: WorkoutSetType;
  comment: null | string;
  repetitionCount: number;
  id: string;
  weight: number;
}

interface State {
  exercise: Exercise;
}

// const set: WorkoutSet = ;

const ListItem = styled.View`
  flex-direction: row;
  background: #efefef;
  display: flex;
  align-content: center;

  justify-content: space-around;
  padding-top: 4;
  padding-bottom: 4;
`;

const Container = styled.View`
  flex: 1;
  background: #f5fcff;
`;

export default class App extends React.Component<Props, State> {
  state = {
    exercise: {
      name: 'Back squat',
      restTime: Duration.fromMillis(300000),
      musclesWorked: ['legs'],
      sets: [
        {
          type: 'normal' as WorkoutSetType,
          comment: null,
          repetitionCount: 5,
          weight: 120,
          id: '1',
        },
        {
          type: 'normal' as WorkoutSetType,
          comment: null,
          repetitionCount: 5,
          weight: 120,
          id: '2',
        },
        {
          type: 'normal' as WorkoutSetType,
          comment: null,
          repetitionCount: 5,
          weight: 120,
          id: '3',
        },
        {
          type: 'normal' as WorkoutSetType,
          comment: null,
          repetitionCount: 5,
          weight: 120,
          id: '4',
        },
        {
          type: 'normal' as WorkoutSetType,
          comment: null,
          repetitionCount: 5,
          weight: 120,
          id: '5',
        },
      ],
    },
  };

  completeSet = (id: string) => {};

  renderRow = ({ index, item }: ListRenderItemInfo<WorkoutSet>) => {
    return (
      <ListItem key={item.id}>
        <Text>Set {item.id}</Text>
        <Text>{item.repetitionCount} Reps</Text>
        <Text>{item.weight} kg</Text>
        <Button title="Done" onPress={() => this.completeSet(item.id)} />
      </ListItem>
    );
  };

  render() {
    const { exercise } = this.state;
    // console.log('duration', exercise.restTime.toString());
    const duration = exercise.restTime.shiftTo('minutes', 'seconds');

    return (
      <Container>
        <Text>{exercise.name}</Text>
        <Text>
          Rest: {duration.minutes} min {duration.seconds} seconds
        </Text>
        <FlatList data={exercise.sets} renderItem={this.renderRow} />
      </Container>
    );
  }
}
