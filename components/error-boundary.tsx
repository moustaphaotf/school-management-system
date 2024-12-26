"use client";

import React from "react";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
            <h1 className="mt-4 text-3xl font-bold">Une erreur est survenue</h1>
            <p className="mt-2 text-muted-foreground">
              {this.state.error?.message ||
                "Une erreur inattendue s'est produite"}
            </p>
            <div className="mt-6">
              <Button onClick={() => this.setState({ hasError: false })}>
                Réessayer
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
