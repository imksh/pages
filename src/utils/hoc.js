/**
 * Higher Order Components and Custom Hooks
 * For extending component functionality
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import Loading from "../Loading";

/**
 * withAuthProtection HOC
 * Wraps a component with authentication check
 */
export const withAuthProtection = (Component) => {
  return function ProtectedComponent(props) {
    const { user, isChecking } = useAuthStore();
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!isChecking && !user) {
        navigate("/login", { replace: true });
      }
    }, [user, isChecking, navigate]);

    if (isChecking) return <Loading />;
    if (!user) return null;

    return <Component {...props} />;
  };
};

/**
 * withTheme HOC
 * Provides theme context to component
 */
export const withTheme = (Component) => {
  return function ThemedComponent(props) {
    const theme = {
      primary: "#3B82F6",
      secondary: "#6366F1",
      success: "#10B981",
      error: "#EF4444",
    };

    return <Component {...props} theme={theme} />;
  };
};

/**
 * withErrorBoundary HOC
 * Wraps component with error boundary
 */
export const withErrorBoundary = (Component) => {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error("Error caught:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Something went wrong
              </h1>
              <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Try again
              </button>
            </div>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
};
