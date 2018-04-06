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
  StatusBar,
  SectionListData,
  TextInput,
  ToolbarAndroid,
} from 'react-native';
import * as dateFns from 'date-fns';
import styled, { css } from 'styled-components/native';
import { Duration } from 'luxon';
import { Partial, Workout, WorkoutSet, WorkoutSetType, Exercise } from 'types';
import dummyData from './dummyData';

type Props = {};

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
  timer: null | number;
}

interface ListItemProps {
  type: WorkoutSetType;
  completed: boolean;
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
  border-radius: 2;

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
  ${(props: ListItemProps) => {
    if (props.completed) {
      return css`
        background: #bdbdbd;
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
  background: ${(props: SeparatorProps) =>
    props.color ? props.color : '#000'};
`;

const initialState: State = {
  weight: '20',
  reps: '5',
  exercise: dummyData,
  timer: null,
};
const CompleteSetContainer = styled.View`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-content: center;
  border-top-color: #b4b4b4;
  border-top-width: ${StyleSheet.hairlineWidth};

  /* background: red; */
  margin-left: 12;
  margin-right: 12;
  margin-bottom: 6;
  padding-top: 6;
`;
const TextInputLabel = styled.Text`
  align-content: center;
  flex: 1;
  justify-content: center;
  margin-left: 4;
  margin-right: 4;
`;
const SectionView = styled.View`
  margin-left: 12;
  margin-right: 12;
`;

const StyledTextInput = styled.TextInput`
  /* width: 64; */
  margin-left: 4;
  margin-right: 4;
  flex: 1;
  /* height: 40; */
  /* border: 1px solid gray; */
`;
export default class App extends React.Component<Props, State> {
  state = initialState;

  // componentDidMount() {
  //   this.timer = setInterval(this.tick, 100)
  // }

  timer: number | null = null;

  tick = () => {
    const elapsed = (new Date().getMilliseconds() - this.state.timer) as number;
  };

  completeSet = () => {
    const sets = [...this.state.exercise.sets];
    this.setState(prevState => {
      // const sets = [...prevState.exercise.sets];
      const set = sets.findIndex((set: WorkoutSet) => set.completed === false);
      console.log('set', set);

      if (set === -1) return null;
      sets[set].completed = true;

      const nextSet = sets.length < set ? sets[set + 1] : null;

      console.log('nextSet', nextSet);

      if (nextSet !== null) {
        return {
          exercise: {
            ...prevState.exercise,
            sets: sets,
          },
          weight: nextSet.weight.toString(),
          reps: nextSet.repetitionCount.toString(),
        } as State;
      }
      return {
        exercise: {
          ...prevState.exercise,
          sets: sets,
        },
      };
    });
  };

  renderRow = ({ index, item }: ListRenderItemInfo<WorkoutSet>) => {
    return (
      <ListItem
        // @ts-ignore
        elevation={1}
        key={item.id}
        type={item.type}
        completed={item.completed}
      >
        <Text>
          {item.type === 'warmup' ? 'Warmup ' : ''}Set {item.id}
        </Text>
        <Text>{item.repetitionCount} Reps</Text>
        <Text>{item.weight} kg</Text>
      </ListItem>
    );
  };

  updateCurrentSet = (set: Partial<WorkoutSet>) => {
    this.setState(prevState => {
      const sets = [...prevState.exercise.sets];
      const currentSeIndex = sets.findIndex(
        (set: WorkoutSet) => set.completed === false,
      );

      if (currentSeIndex === -1) return null;
      if (set.weight !== undefined) {
        sets[currentSeIndex].weight = set.weight;
      }
      if (set.repetitionCount !== undefined) {
        sets[currentSeIndex].repetitionCount = set.repetitionCount;
      }
      return {
        exercise: {
          ...prevState.exercise,
          sets: sets,
        },
      };
    });
  };

  renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<WorkoutSet>;
  }) => {
    const duration = section.restTime.shiftTo('minutes', 'seconds');

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

    const currentSet = exercise.sets.find(set => set.completed === false);

    // const weight = currentSet ? currentSet.weight : 0;
    // const reps = currentSet ? currentSet.repetitionCount : 0;

    // console.log('duration', exercise.restTime.toString());

    return (
      <Container>
        <StatusBar backgroundColor="#7B1FA2" />
        <ToolbarAndroid
          title="Lifting app"
          style={{ height: 64, backgroundColor: '#9C27B0' }}
          titleColor="#fff"
        />
        <SectionList
          sections={[exerciseToSection(exercise)]}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderRow}
          keyExtractor={(item: WorkoutSet) => item.id}
          // ItemSeparatorComponent={() => <Separator color="#b4b4b4" />}
          // SectionSeparatorComponent={() => <Separator />}
        />
        <CompleteSetContainer>
          <TextInputLabel>Weight</TextInputLabel>
          <StyledTextInput
            onChangeText={weight => this.setState({ weight })}
            onBlur={() => {
              if (this.state.weight === '') {
                return;
              }
              this.updateCurrentSet({
                weight: parseInt(this.state.weight, 10),
              });
            }}
            onSelectionChange={() => {
              if (this.state.weight === '') {
                return;
              }
              this.updateCurrentSet({
                weight: parseInt(this.state.weight, 10),
              });
            }}
            value={this.state.weight}
            keyboardType="numeric"
            placeholder="20"
          />
          <TextInputLabel>Reps</TextInputLabel>
          <StyledTextInput
            onChangeText={reps => this.setState({ reps })}
            onSelectionChange={() => {
              if (this.state.reps === '') {
                return;
              }
              this.updateCurrentSet({
                repetitionCount: parseInt(this.state.reps, 10),
              });
            }}
            onBlur={() => {
              if (this.state.reps === '') {
                return;
              }
              this.updateCurrentSet({
                repetitionCount: parseInt(this.state.reps, 10),
              });
            }}
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
