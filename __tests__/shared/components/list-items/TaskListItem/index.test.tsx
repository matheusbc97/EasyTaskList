import {TaskListItem} from '@/modules/shared/components';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {Task} from '@/modules/shared/models';
import {fireEvent, render} from '@testing-library/react-native';

jest.mock('@/shared/hooks/data/useAppTheme');

const fakeTask: Task = {
  id: '1',
  category: {
    colorIndex: 0,
    iconIndex: 0,
    id: '1',
    name: 'category-name',
  },
  date: '2020-01-01T00:00:00.000Z',
  done: false,
  title: 'task-title',
  description: 'task-description',
};

describe('TaskListItem Component', () => {
  it('Should render a TaskListItem', () => {
    render(<TaskListItem onPress={() => {}} task={fakeTask} />);
  });

  it('Should fire onPress', async () => {
    const onPress = jest.fn();

    const {findByTestId} = render(
      <TaskListItem onPress={onPress} task={fakeTask} />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);

    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should show TaskStatus', async () => {
    const onPress = jest.fn();

    const fakeTaskDone: Task = {
      ...fakeTask,
      done: true,
    };

    const {findByTestId} = render(
      <TaskListItem onPress={onPress} task={fakeTaskDone} />,
    );

    const element = await findByTestId(TEST_IDS.TASK_STATUS);

    expect(element).toBeVisible();
  });

  it('Should not show TaskStatus', async () => {
    const onPress = jest.fn();

    const fakeTaskDone: Task = {
      ...fakeTask,
      done: false,
    };

    const {queryByTestId} = render(
      <TaskListItem onPress={onPress} task={fakeTaskDone} />,
    );

    const element = queryByTestId(TEST_IDS.TASK_STATUS);

    expect(element).toBe(null);
  });
});
