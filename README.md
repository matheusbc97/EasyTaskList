# EasyTaskList
EasyTaskList is an app easy to use, created mainly to work as portfolio  
*Tradução - EasyTaskList é um aplicativo de lista de tarefas de fácil uso, feito principalmente para funcionar de portifólio*

## Framework
The framework that has been used is react native an powerfull mobile framework create by facebook team that builds android's and iPhone's aplications  
*Tradução - O framework que foi usado é o React Native, um poderoso framework móvel criado pela equipe do Facebook que constrói tanto aplicativos para Android e iPhone*

## Libraries Used (Bibliotecas Utilizadas)
- @react-navigation
- @reduxjs/toolkit
- react-native-paper
- styled-components
- react-native-vector-icons
- react-native-modal
- react-native-modal-datetime-picker
- @unform
- date-fns
- polished
- lodash
- firebase
- @react-native-community/hooks

## Backend
In this project was used firebase to work as backend.  
*Tradução - Neste projeto foi utilizado o firebase para funcionar como back-end.*

## Features
- [x] Crud of tasks
- [x] Register/Authentication
- [x] Categories of Tasks
- [x] Portuguese Translation
- [x] User Avatar
- [x] Themes
- [x] English Translation
- [ ] Automated testing
- [ ] Dark Mode
- [ ] Spanish Translation
- [ ] PWA
- [ ] Optimized for Tablets
- [ ] User picture

## Organization

### src/pages
Where all pages are.

### src/shared/components
Where all reusable components are.

#### src/shared/components/*/filled/*
The filled folder means that is not added nothing new to the component, but some or all props are filled. This is usefull for example, when you only have to change a prop but you have to do in more than one place, like when you have to change the label or the icon of a button that is used in more than one place.

### src/shared/components/buttons/
All buttons are in here, that makes easy to find a button when you need one.

### src/shared/components/containers/
All containers are in here, that is views with some common style, backgrounds, and every visual component that serves like a container.

### src/shared/components/fallbacks/
All fallbacks are in here, fallbacks are component to maintain the code declaritive. 
Example:
When you have to load something instead make something like that: 
```
function MyComponent() {
  const renderLoading = () => {
    return(
      <ActivityIndicator />
    )
  }
  
  const renderPage = () => {
    return(
      <>
        {/* Page Code... */}
      </>
    )
  }

  <View>
    {isLoading ? renderLoading() : renderPage()}
  </View>
}
```

 You make something like that: 
  
```
function LoadingFallback({children}) {
   if(isLoading){
     return(
        <ActivityIndicator />
     )
   }
   
   return children;
}

function MyComponent() {
  <View>
    <LoadingFallback isLoading={isLoading}>
      {/* Page Code... */}
    </LoadingFallback>
  </View>
}
```

### src/shared/components/inputs/
All inputs are in here, that makes easy to find a button when you need one.

### src/shared/components/list-items/
All list-items are in here, that makes easy to find a button when you need one.

### src/shared/components/modals/
All modals are in here, that makes easy to find a button when you need one.

### src/shared/hooks
Where all reusable hooks are.
