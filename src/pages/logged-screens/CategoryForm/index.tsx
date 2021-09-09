import React, {useRef, useState, useMemo} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Text,
  UnformInput as TextInput,
  AnimatedBackground,
  Center,
  FormContainer,
} from '@/shared/components';
import {selectAppTheme} from '@/store/configs';
import {useTranslation} from '@/shared/hooks';
import categoryIconNames from '@/assets/categoryIconNames';
import {useValidateField} from '@/shared/hooks';

import CategoryColorBox from './components/CategoryColorBox';
import ChooseCategoryColorModal from './components/ChooseCategoryColorModal';
import ChooseCategoryIconModal from './components/ChooseCategoryIconModal';
import {
  Header,
  TitleContainer,
  Title,
  Footer,
  BackButton,
  SaveButton,
  SelectColorOrIconButton,
  ColorAndIconContainer,
  SelectIconContainer,
} from './styles';

import {FormObject, Props} from './types';
import useHandleSubmit from './hooks/useHandleSubmit';

const CategoryForm: React.FC<Props> = ({navigation, route}) => {
  const {translation} = useTranslation();
  const category = route.params?.category;

  const formRef = useRef<FormHandles>(null);

  const [
    categoryColorModalIsVisible,
    setCategoryColorModalIsVisible,
  ] = useState(false);

  const [categoryIconModalIsVisible, setCategoryIconModalIsVisible] = useState(
    false,
  );

  const appTheme = useSelector(selectAppTheme);

  const validateField = useValidateField(formRef);

  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);
  const [iconIndex, setIconIndex] = useState(-1);

  const handleFormSubmit = useHandleSubmit({formRef, category});

  const onSubmit = (form: FormObject) => {
    handleFormSubmit({form, iconIndex, selectedColorIndex});
  };

  const initialData = useMemo<undefined | FormObject>(() => {
    if (!category) {
      return undefined;
    }

    const _initialData: FormObject = {
      name: category.name,
    };

    setIconIndex(category.iconIndex);
    setSelectedColorIndex(category.colorIndex);

    return _initialData;
  }, [category]);

  return (
    <>
      <AnimatedBackground>
        <Center>
          <FormContainer>
            <Header>
              <MaterialIcon
                name="arrow-back"
                size={30}
                color={appTheme.primaryColor}
              />
              <TitleContainer>
                <Title type="title-big" color={appTheme.primaryColor}>
                  {translation('CREATE_CATEGORY')}
                </Title>
              </TitleContainer>
            </Header>
            <Form onSubmit={onSubmit} ref={formRef} initialData={initialData}>
              <TextInput
                name="name"
                label={translation('NAME')}
                validateField={validateField}
              />
              <ColorAndIconContainer>
                <SelectColorOrIconButton
                  onPress={() => setCategoryColorModalIsVisible(true)}>
                  <CategoryColorBox colorIndex={selectedColorIndex} />
                  <Text type="title" primaryColor style={{marginTop: 5}}>
                    {translation('SELECT_COLOR')}
                  </Text>
                </SelectColorOrIconButton>
                <SelectColorOrIconButton
                  onPress={() => setCategoryIconModalIsVisible(true)}>
                  <SelectIconContainer>
                    {iconIndex !== -1 && (
                      <FontAwesome5Icon
                        name={categoryIconNames[iconIndex]}
                        size={27}
                      />
                    )}
                  </SelectIconContainer>
                  <Text type="title" primaryColor style={{marginTop: 5}}>
                    {translation('SELECT_ICON')}
                  </Text>
                </SelectColorOrIconButton>
              </ColorAndIconContainer>
            </Form>
            <Footer>
              <BackButton
                text={translation('GO_BACK')}
                inverted
                onPress={() => navigation.pop()}
              />
              <SaveButton
                text={translation('SAVE')}
                onPress={() => formRef.current?.submitForm()}
              />
            </Footer>
          </FormContainer>
        </Center>
      </AnimatedBackground>

      <ChooseCategoryColorModal
        onColorPress={colorIndex => {
          setSelectedColorIndex(colorIndex);
          setCategoryColorModalIsVisible(false);
        }}
        isVisible={categoryColorModalIsVisible}
        onBackButtonPress={() => setCategoryColorModalIsVisible(false)}
      />

      <ChooseCategoryIconModal
        onBackButtonPress={() => setCategoryIconModalIsVisible(false)}
        isVisible={categoryIconModalIsVisible}
        onIconPress={iconIndex => {
          setIconIndex(iconIndex);
          setCategoryIconModalIsVisible(false);
        }}
      />
    </>
  );
};

export default CategoryForm;
