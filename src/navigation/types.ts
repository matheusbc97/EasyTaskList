import {Category, Task} from '@shared/models';

export type UnauthenticatedStackParams = {
  Login: undefined;
  RegisterForm: undefined;
  Welcome: undefined;
  ChooseUserConfigurations: undefined;
  ForgotPasswordForm: undefined;
};

export type AuthenticatedStackParams = {
  BottomNavigation: undefined;
  TaskForm:
    | undefined
    | {
        chosenCategory?: Category;
        task?: Task;
      };
  CategorySearch: undefined;
  CategoryForm: {
    category?: Category;
  };
  CategoryDetails: {
    category: Category;
  };
  ChangeNameForm: undefined;
  ChangeThemeForm: undefined;
  ChangeAvatar: undefined;
  ChangePasswordForm: undefined;
};

export type BottomNavigatorStackParams = {
  Home: undefined;
  TaskList: undefined;
  More: undefined;
  CategoryList: undefined;
  Calendar: undefined;
};

export type TasksTopBarNavigatorStackParams = {
  AllTasks: undefined;
  TasksInProgress: undefined;
  TasksCompleted: undefined;
};
