// //import { Roles } from '@/types/globals';
// import { Roles } from '@/types/globals';
// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';

// export const checkRole = async (role: Roles): Promise<boolean> => {
//   const { sessionClaims } = await auth();

//   if (!sessionClaims) return false; // No session means not logged in

//   return sessionClaims.metadata?.role === role; // Match role
// };

// // ✅ Return User's Role
// export const getUserRole = async (): Promise<Roles | undefined> => {
//   const { sessionClaims } = await auth();
//   return sessionClaims?.metadata?.role as Roles;
// };

// // 🔥 Automatically Protect Pages
// export const protectByRole = async (allowedRoles: Roles[], redirectPath = '/sign-in') => {
//   const userRole = await getUserRole();

//   if (!userRole || !allowedRoles.includes(userRole)) {
//     redirect(redirectPath); // Redirect if user has no access
//   }
// };
