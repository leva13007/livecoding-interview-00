import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.log("getDerivedStateFromError", error);
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children
  }
}