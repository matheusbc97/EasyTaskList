import React, {useCallback, useRef, useState} from 'react';

import {
  Text,
  UnformInput as TextInput,
  ScreenWrapper,
  AnimatedBackground,
} from '@shared/components';
import {Form, FormHandles} from '@unform/core';
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
import {createCategory} from '@store/categories';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'TaskForm'>;
}

interface FormData {
  name: string;
}

const CategoryForm: React.FC<Props> = ({navigation}) => {
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
      }

      if (iconIndex === -1) {
        dispatch(
          showToast({
            text: 'Ícone Obrigatório',
          }),
        );
      }

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
    },
    [dispatch, selectedColorIndex, iconIndex, navigation],
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
              //initialData={initialData}
            >
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
