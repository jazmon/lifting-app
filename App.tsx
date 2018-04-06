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
  SectionList,
  ListRenderItem,
  ListRenderItemInfo,
  SectionListData,
  TextInput,
} from 'react-native';
import * as dateFns from 'date-fns';
import styled, { css } from 'styled-components/native';
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
  id: string;
}
type WorkoutSetType = 'superset' | 'normal' | 'warmup';

interface WorkoutSet {
  type: WorkoutSetType;
  comment: null | string;
  repetitionCount: number;
  id: string;
  weight: number;
  completed: boolean;
}

const exerciseToSection = (
  exercise: Exercise,
): SectionListData<WorkoutSet> => ({
  ...exercise,
  data: exercise.sets as WorkoutSet[],
  title: exercise.name,
});

interface State {
  exercise: Exercise;
  weight: string;
  reps: string;
}

// const set: WorkoutSet = ;

interface ListItemProps {
  type: WorkoutSetType;
}

const ListItem = styled.View`
  flex-direction: row;
  background: #fafafa;
  display: flex;
  height: 48;
  margin-bottom: 3;
  margin-top: 3;
  margin-left: 12;
  margin-right: 12;

  align-content: center;

  justify-content: space-around;
  padding-top: 4;
  padding-bottom: 4;
  ${(props: ListItemProps) => {
    if (props.type === 'warmup') {
      return css`
        background: #4caf50;
      `;
    }
    return '';
  }};
`;

const Container = styled.View`
  flex: 1;
  background: #fff;
`;

interface SeparatorProps {
  color?: string;
}

const Separator = styled.View`
  height: ${StyleSheet.hairlineWidth};
  display: flex;
  flex-direction: row;
  margin-left: 4;
  margin-right: 4;
  /* background: ; */
  background: ${(props: SeparatorProps) =>
    props.color ? props.color : '#000'};
`;

// const Header = ({ title }: { title: string }) => (

// );

const initialState: State = {
  weight: '0',
  reps: '0',
  exercise: {
    name: 'Back squat',
    id: '1',
    restTime: Duration.fromMillis(300000),
    musclesWorked: ['legs'],
    sets: [
      {
        type: 'warmup' as WorkoutSetType,
        comment: null,
        repetitionCount: 5,
        weight: 20,
        id: '1',
        completed: false,
      },
      {
        type: 'warmup' as WorkoutSetType,
        comment: null,
        repetitionCount: 5,
        weight: 40,
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
  },
};

export default class App extends React.Component<Props, State> {
  state = initialState;

  completeSet = () => {};

  renderRow = ({ index, item }: ListRenderItemInfo<WorkoutSet>) => {
    return (
      <ListItem elevation={1} key={item.id} type={item.type}>
        <Text>Set {item.id}</Text>
        <Text>{item.repetitionCount} Reps</Text>
        <Text>{item.weight} kg</Text>
      </ListItem>
    );
  };

  renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<WorkoutSet>;
  }) => {
    const duration = section.restTime.shiftTo('minutes', 'seconds');

    const SectionView = styled.View`
      margin-left: 12;
      margin-right: 12;
    `;
    return (
      <SectionView>
        <Text>{section.title}</Text>
        <Text>
          Rest: {duration.minutes} min {duration.seconds} seconds
        </Text>
      </SectionView>
    );
  };

  render() {
    const { exercise } = this.state;

    const CompleteSetContainer = styled.View`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
    `;
    // console.log('duration', exercise.restTime.toString());

    return (
      <Container>
        <SectionList
          sections={[exerciseToSection(exercise)]}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderRow}
          keyExtractor={(item: WorkoutSet) => item.id}
          // ItemSeparatorComponent={() => <Separator color="#b4b4b4" />}
          // SectionSeparatorComponent={() => <Separator />}
        />
        <CompleteSetContainer>
          <Text>Weight</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={weight => this.setState({ weight })}
            value={this.state.weight}
            keyboardType="numeric"
            placeholder="20"
          />
          <Text>Reps</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={reps => this.setState({ reps })}
            value={this.state.reps}
            keyboardType="numeric"
            placeholder="6"
          />
          <Button title="Done" onPress={this.completeSet} />
        </CompleteSetContainer>
      </Container>
    );
  }
}
