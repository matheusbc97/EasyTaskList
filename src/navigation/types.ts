import {Category} from '@shared/models';

export type UnauthenticatedStackParams = {
  Login: undefined;
  RegisterForm: undefined;
  Welcome: undefined;
  ChooseUserConfigurations: undefined;
};

export type AuthenticatedStackParams = {
  BottomNavigation: undefined;
  TaskForm: undefined;
  CategorySearch: {
    onChosenCategory(category: Category): void;
  };
};

export type BottomNavigatorStackParams = {
  Home: undefined;
  TaskList: undefined;
  More: undefined;
  Statistics: undefined;
  Calendar: undefined;
};

export type TasksTopBarNavigatorStackParams = {
  AllTasks: undefined;
  TasksInProgress: undefined;
  TasksCompleted: undefined;
};
