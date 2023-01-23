import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import ErrorPage from './pages/ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
    this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          restartApp={() => {
            this.setState({hasError: false});
          }}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
