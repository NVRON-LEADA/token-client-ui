// src/constants/roles.tsx

// Define the roles your app supports
export type Role = 'admin' | 'staff' | 'doctor' | 'receptionist';

// Map each role to allowed routes or permissions
export const roleMap: Record<Role, string[]> = {
  admin: ['dashboard', 'settings', 'users', 'reports'],
  staff: ['dashboard', 'appointments'],
  doctor: ['dashboard', 'patients'],
  receptionist: ['dashboard', 'checkin'],
};
