import React, {useCallback, useRef, useState, useMemo} from 'react';

import {
  Text,
  UnformInput as TextInput,
  ScreenWrapper,
  AnimatedBackground,
} from '@shared/components';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {selectAppTheme} from '@store/configs';

import {StackNavigationProp} from '@react-navigation/stack';
import {AuthenticatedStackParams} from '@navigation/types';

import CategoryColorBox from './CategoryColorBox';
import ChooseCategoryColorModal from './ChooseCategoryColorModal';
import ChooseCategoryIconModal from './ChooseCategoryIconModal';
import {
  Container,
  Content,
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
import categoryIconNames from '@assets/categoryIconNames';
import {validateAll} from '@shared/utils/validations';
import {showToast} from '@shared/components/Toast';
import {useValidateField} from '@shared/hooks';
import {Category} from '@shared/models';
import {createCategory, updateCategory} from '@store/categories';
import {RouteProp} from '@react-navigation/native';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'CategoryForm'>;
  route: RouteProp<AuthenticatedStackParams, 'CategoryForm'>;
}

interface FormData {
  name: string;
}

const CategoryForm: React.FC<Props> = ({navigation, route}) => {
  const category = route.params?.category;

  const formRef = useRef<FormHandles>(null);

  const [
    categoryColorModalIsVisible,
    setCategoryColorModalIsVisible,
  ] = useState(false);

  const [categoryIconModalIsVisible, setCategoryIconModalIsVisible] = useState(
    false,
  );

  const dispatch = useDispatch();

  const appTheme = useSelector(selectAppTheme);

  const validateFied = useValidateField(formRef);

  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);
  const [iconIndex, setIconIndex] = useState(-1);

  const initialData = useMemo<undefined | FormData>(() => {
    if (!category) {
      return undefined;
    }

    const _initialData: FormData = {
      name: category.name,
    };

    setIconIndex(category.iconIndex);
    setSelectedColorIndex(category.colorIndex);

    return _initialData;
  }, [category]);

  const handleFormSubmit = useCallback(
    (form: FormData) => {
      const [formErrors, isValid] = validateAll(form);

      if (!isValid) {
        formRef.current?.setErrors(formErrors);
        return;
      }

      if (selectedColorIndex === -1) {
        dispatch(
          showToast({
            text: 'Cor Obrigatória',
          }),
        );
        return;
      }

      if (iconIndex === -1) {
        dispatch(
          showToast({
            text: 'Ícone Obrigatório',
          }),
        );
        return;
      }

      if (!category) {
        const newCategory: Omit<Category, 'id'> = {
          colorIndex: selectedColorIndex,
          name: form.name,
          iconIndex: iconIndex,
        };

        dispatch(createCategory(newCategory)).then((action) => {
          if (action.payload) {
            navigation.pop();
          }
        });

        return;
      }

      const updatedCategory: Category = {
        id: category.id,
        colorIndex: selectedColorIndex,
        name: form.name,
        iconIndex: iconIndex,
      };

      dispatch(updateCategory(updatedCategory)).then((action) => {
        if (action.payload) {
          navigation.pop();
        }
      });
    },
    [dispatch, selectedColorIndex, iconIndex, navigation, category],
  );

  return (
    <ScreenWrapper>
      <AnimatedBackground>
        <Container>
          <Content>
            <Header>
              <MaterialIcon
                name="arrow-back"
                size={30}
                color={appTheme.primaryColor}
              />
              <TitleContainer>
                <Title type="title-big" color={appTheme.primaryColor}>
                  {'Criar Categoria'}
                </Title>
              </TitleContainer>
            </Header>
            <Form
              onSubmit={handleFormSubmit}
              ref={formRef}
              initialData={initialData}>
              <TextInput
                name="name"
                label="Nome"
                validateField={validateFied}
              />
              <ColorAndIconContainer>
                <SelectColorOrIconButton
                  onPress={() => setCategoryColorModalIsVisible(true)}>
                  <CategoryColorBox colorIndex={selectedColorIndex} />
                  <Text type="title" primaryColor style={{marginTop: 5}}>
                    Selecionar Cor
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
                    Selecionar Ícone
                  </Text>
                </SelectColorOrIconButton>
              </ColorAndIconContainer>
            </Form>
            <Footer>
              <BackButton
                text="Voltar"
                inverted
                onPress={() => navigation.pop()}
              />
              <SaveButton
                text="Salvar"
                onPress={() => formRef.current?.submitForm()}
              />
            </Footer>
          </Content>
        </Container>
      </AnimatedBackground>

      <ChooseCategoryColorModal
        onColorPress={(colorIndex) => {
          setSelectedColorIndex(colorIndex);
          setCategoryColorModalIsVisible(false);
        }}
        isVisible={categoryColorModalIsVisible}
        onBackButtonPress={() => setCategoryColorModalIsVisible(false)}
      />

      <ChooseCategoryIconModal
        onBackButtonPress={() => setCategoryIconModalIsVisible(false)}
        isVisible={categoryIconModalIsVisible}
        onIconPress={(iconIndex) => {
          setIconIndex(iconIndex);
          setCategoryIconModalIsVisible(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default CategoryForm;
