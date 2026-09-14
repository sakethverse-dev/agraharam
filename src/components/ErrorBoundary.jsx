import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error securely without exposing sensitive internal details
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAF7F2',
          color: '#26050B',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            background: '#FFFFFF',
            padding: '40px 32px',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            maxWidth: '480px',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🌾</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.6rem',
              marginBottom: '10px',
              color: '#26050B'
            }}>
              Something went wrong
            </h2>
            <p style={{ color: '#5C5852', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6' }}>
              We encountered a temporary issue while loading the application. Please refresh the page to continue.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                background: '#26050B',
                color: '#F8EEDB',
                border: '1px solid #D4AF37',
                padding: '12px 28px',
                borderRadius: '30px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease'
              }}
            >
              Refresh Page ↻
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
