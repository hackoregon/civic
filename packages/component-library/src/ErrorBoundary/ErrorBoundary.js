import { Component } from "react";
import { oneOfType, node, object, string } from "prop-types";

class ErrorBoundary extends Component {
  static propTypes = {
    children: oneOfType([node, object]),
    customErrorComponent: oneOfType([node, string]),
    customMessage: string
  };

  static defaultProps = {
    children: null,
    customErrorComponent: null,
    customMessage: null
  };

  state = { hasError: false, error: null, info: null };

  componentDidCatch(error, info) {
    // info.componentStack has error call stack
    this.setState({ hasError: true, error, info });
  }

  render() {
    const { customMessage, customErrorComponent, children } = this.props;
    const { error, hasError, info } = this.state;

    if (hasError) {
      console.warn(customMessage, { error, info }); // eslint-disable-line
      return customErrorComponent || null;
    }
    return children;
  }
}

export default ErrorBoundary;
