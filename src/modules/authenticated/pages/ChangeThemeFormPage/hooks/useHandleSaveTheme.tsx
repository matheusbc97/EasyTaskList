import {showToast} from '@/modules/shared/components/Toast';
import {AppTheme} from '@/modules/shared/models';
import {updateUser} from '@/store/account/user';
import {setAppTheme} from '@/store/configs';
import {useNavigation} from '@react-navigation/native';

const useHandleSaveTheme = () => {
  const navigation = useNavigation();

  const handleSaveTheme = async (theme: AppTheme) => {
    await updateUser({
      theme: theme.name,
    });
    setAppTheme(theme);

    showToast({
      text: 'Tema alterado com sucesso',
      type: 'success',
    });

    navigation.navigate('BottomNavigation');
  };

  return handleSaveTheme;
};

export default useHandleSaveTheme;
