import {AppThemeName} from '../models';

export const TEST_IDS = {
  CREATE_NEW_USER_BUTTON: 'CreateNewUserButton',
  CHOOSE_NAME_ADVANCE_BUTTON: 'ChooseNameAdvanceButton',
  CONFIRM_NEW_PASSWORD_INPUT: 'confirmNewPasswordInput',
  EMAIL_INPUT: 'EMAIL_INPUT',
  CHOOSE_THEME_ADVANCE_BUTTON: 'ChooseThemeAdvanceButton',
  SAVE_USER_CONFIGURATIONS_BUTTON: 'SaveUserConfigurationSaveButton',
  HEADER_USER_NAME_TEXT: 'HeaderUserNameText',
  WELCOME_SCREEN_WRAPPER: 'WelcomeScreenWrapper',
  NEW_PASSWORD_INPUT: 'NewPasswordInput',
  TEXT_BASE: 'text-base',
  THEME_BOX: (key: AppThemeName) => `ThemeBox-${key}`,
  FONT_AWESOME_ICON_5: 'FontAwesomeIcon5',
  NAVIGATE_BUTTON_TITLE: 'NavigateButton-title',
  TEXT_BUTTON_ICON: 'TextButtonIcon',
  OUTLINE_BUTTON_TEXT: 'OutlineButton-text',
  ERROR_PAGE_CONTAINER: 'ErrorPageContainer',
  IMAGE_AVATAR: 'ImageAvatar',
  BUTTON_BASE: 'ButtonBase',
  RELOAD_APP_BUTTON: 'ReloadAppButton',
  CATEGORY_COLOR_BOX_TRANSPARENT_VIEW: 'CategoryColorBoxTransparentView',
  CATEGORY_COLOR_BOX_LINEAR_GRADIENT: 'CategoryColorBoxLinearGradient',
  LOADING_INDICATOR_BASE: 'loading-indicator-base',
  ACTIVITY_INDICATOR_BASE: 'activity-indicator-base',
  ERROR_MESSAGE: 'ErrorMessage',
  FLAT_LIST_WITH_FETCH_INDICATOR_FLAT_LIST:
    'FlatListWithFetchIndicatorFlatList',
  FLAT_LIST_WITH_FETCH_INDICATOR_REFRESH_CONTROL:
    'FlatListWithFetchIndicatorRefreshControl',
  PRIMARY_HEADER_CONTAINER: 'PrimaryHeaderContainer',
  SECONDARY_HEADER_CONTAINER: 'SecondaryHeaderContainer',
  PRIMARY_HEADER_BACK_BUTTON: 'PrimaryHeaderBackButton',
  SECONDARY_HEADER_BACK_BUTTON: 'SecondaryHeaderBackButton',
  SECTION_CONTAINER: 'SectionContainer',
  SECTION_CONTENT_CONTAINER: 'SectionContentContainer',
  SEPARATOR: 'Separator',
  SHADOW: 'Shadow',
  TOAST: 'Toast',
  THEME_BOX_VIEW_PRIMARY_COLOR: 'ThemeBoxViewPrimaryColor',
  THEME_BOX_VIEW_SECONDARY_COLOR: 'ThemeBoxViewSecondaryColor',
  VERTICAL_SEPARATOR: 'VerticalSeparator',
  ANIMATED_BACKGROUND_CONTENT: 'AnimatedBackgroundContent',
  FORM_CONTAINER: 'FormContainer',
  SCREEN_WRAPPER: 'ScreenWrapper',
  TASK_STATUS: 'TaskStatus',
  TEXT_INPUT_BASE: 'TextInputBase',
  TEXT_INPUT_LABEL: 'TextInputLabel',
  TEXT_INPUT_ICON: 'TextInputIcon',
  TEST_INPUT_CONTAINER_VIEW: 'TestInputContainerView',
  ENHANCED_INPUT_CONTAINER: 'EnhancedInputContainer',
  ENHANCED_INPUT_ERROR: 'EnhancedInputError',
  AVATAR_GRID_AVATAR: (index: number) => `AvatarGridAvatar${index}`,
  CHOOSE_CATEGORY_COLOR_MODAL_CANCEL_BUTTON:
    'ChooseCategoryColorModalCancelButton',
  CATEGORY_COLOR_BOX_BUTTON: (index: number) =>
    `CategoryColorBoxButton-${index}`,
  CHOOSE_CATEGORY_ICON_MODAL_CONTAINER: 'ChooseCategoryIconModalContainer',
  CHOOSE_CATEGORY_ICON_MODAL_CANCEL_BUTTON:
    'ChooseCategoryIconModalCancelButton',
  CHOOSE_CATEGORY_ICON_MODAL_ICON_BUTTON: (index: number) =>
    `ChooseCategoryIconModalIconButton-${index}`,
  CHOOSE_CATEGORY_COLOR_MODAL_CONTAINER: 'ChooseCategoryColorModalContainer',
};
