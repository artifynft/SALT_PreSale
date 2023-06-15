import React, { Component } from "react";

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can handle the error here, e.g., log or report it to an error tracking service
    console.error("Error aa geya hay:", error);
    console.error("Error Info mill gayee hay:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return (
        <div>
          <h2>Something went wrong</h2>
          <p>{this.state.error.toString()}</p>
          {/* Additional error handling UI */}
        </div>
      );
    }

    // Render the wrapped components if no error occurred
    return this.props.children;
  }
}

export default ErrorHandler;
