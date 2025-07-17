import React from 'react';
import { AuthProvider } from './AuthProvider';
import { UserProvider } from './UserProvider';
import { PostProvider } from './PostProvider';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <PostProvider>
        {children}
      </PostProvider>
    </UserProvider>
  </AuthProvider>
);

export default Providers;
