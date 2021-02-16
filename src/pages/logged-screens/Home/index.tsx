import React, {useEffect, useMemo, useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';

import {
  ScreenWrapper,
  Avatar,
  Text,
  CategoryListItem,
  TaskListItem,
  OutlineButton,
} from '@shared/components';

import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '@store/account/user';
import {useFormatDate} from '@shared/hooks';
import {categoryListSelectors} from '@store/categories';

import styles from './styles';
import {
  tasksListSelectors,
  selectTasksFetchState,
  getTasks,
} from '@store/tasks';
import FlatListWithFetchControl from '@shared/components/FlatListWithFetchIndicator';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedStackParams} from '@navigation/types';
import TaskDetailsModal from '@shared/modals/TaskDetailsModal';
import {Task} from '@shared/models';

type TaskListNavigationProp = StackNavigationProp<
  AuthenticatedStackParams,
  'BottomNavigation'
>;

interface Props {
  navigation: TaskListNavigationProp;
}

const Home: React.FC<Props> = ({navigation}) => {
  const user = useSelector(selectUser);
  const lsCategories = useSelector(categoryListSelectors.selectAll);
  const formatDate = useFormatDate();

  const dispatch = useDispatch();

  const tasks = useSelector(tasksListSelectors.selectAll);
  const tasksFetchState = useSelector(selectTasksFetchState);

  const tasksNotDone = useMemo(() => tasks.filter((task) => !task.done), [
    tasks,
  ]);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const [taskSelected, setTaskSelected] = useState<Task | null>(null);

  const handleTaskDetailsModalEditButtonPress = useCallback(() => {
    if (taskSelected) {
      const selectedTask = {
        ...taskSelected,
      };

      setTaskSelected(null);
      navigation.navigate('TaskForm', {task: selectedTask});
    }
  }, [navigation, taskSelected]);

  /*const tasks = [
    {
      title: 'HOJE',
      data: [],
    },
    {
      title: 'Amanhã',
      data: [],
    },
    {
      title: '14/06',
      data: [],
    },
    {
      title: '15/06',
      data: [],
    },
  ];*/

  return (
    <ScreenWrapper>
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(item) => item.toString()}
        renderItem={({item}) => {
          if (item === 1) {
            return (
              <View style={styles.header}>
                <Avatar avatarNumber={user?.avatar} size={50} />
                <View style={styles.headerContent}>
                  <Text type="title-medium">Olá, {user?.name}</Text>
                  <Text>{formatDate(new Date(), 'dateOfMotnhAndYear')}</Text>
                </View>
              </View>
            );
          }

          if (item === 2) {
            return (
              <View>
                <Text type="title-medium" style={styles.title}>
                  Categorias
                </Text>
                <View style={styles.contentWrapper}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={lsCategories}
                    keyExtractor={(item) => item.id}
                    renderItem={({item: category}) => (
                      <CategoryListItem
                        category={category}
                        onPress={() =>
                          navigation.navigate('CategoryDetails', {category})
                        }
                      />
                    )}
                  />
                </View>
              </View>
            );
          }

          return (
            <View>
              <Text type="title-medium" style={styles.title}>
                Tarefas Não Feitas
              </Text>
              <View style={[styles.contentWrapper]}>
                <FlatListWithFetchControl
                  data={tasksNotDone}
                  isLoading={tasksFetchState.isLoading}
                  hasError={tasksFetchState.hasError}
                  emptyListText="Nenhuma Tarefa a fazer"
                  keyExtractor={(task) => task.id}
                  onRefresh={() => dispatch(getTasks())}
                  renderItem={({item: task}) => (
                    <TaskListItem
                      task={task}
                      onPress={() => setTaskSelected(task)}
                    />
                  )}
                />
                {/*<View style={{flexDirection: 'row', marginHorizontal: 10}}>
                  {tasks.map((item) => (
                    <Text
                      style={{
                        borderBottomWidth: 2,
                        marginHorizontal: 5,
                        borderColor: '#4ADDB5',
                        color: '#bdbdbd',
                      }}>
                      {item.title.toUpperCase()}
                    </Text>
                  ))}
                </View>
                <TwoDimensionalTaskList
                  tasks={tasks}
                  offset={30}
                  onItemPress={() => {}}
                    />*/}
              </View>
            </View>
          );
        }}
      />
      <View style={{paddingVertical: 5, paddingHorizontal: 20}}>
        <OutlineButton
          iconName="plus"
          text="Criar Nova Tarefa"
          onPress={() => navigation.navigate('TaskForm')}
        />
      </View>
      <TaskDetailsModal
        onEditButtonPress={handleTaskDetailsModalEditButtonPress}
        task={taskSelected}
        onBackButtonPress={() => setTaskSelected(null)}
      />
    </ScreenWrapper>
  );
};

export default Home;
