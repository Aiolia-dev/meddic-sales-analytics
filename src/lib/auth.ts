// Mock user data for demonstration
export const mockUser = {
    email: 'demo@meddic-analytics.com',
    password: 'Demo123!',
    name: 'John Doe',
    role: 'Sales Director'
};

// Mock authentication function
export const authenticate = (email: string, password: string) => {
    if (email === mockUser.email && password === mockUser.password) {
        return {
            success: true,
            user: mockUser
        };
    }
    return {
        success: false,
        error: 'Invalid credentials'
    };
};
