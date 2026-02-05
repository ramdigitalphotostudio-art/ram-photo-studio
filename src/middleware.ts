import { defineMiddleware } from 'astro:middleware';
import { getAuthenticatedUser } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
    const { url, cookies, redirect } = context;

    // Check if the request is for an admin route
    const isAdminRoute = url.pathname.startsWith('/admin');
    const isLoginPage = url.pathname === '/admin/login';

    // If it's an admin route (but not the login page), check authentication
    if (isAdminRoute && !isLoginPage) {
        const user = await getAuthenticatedUser(cookies);

        // If not authenticated, redirect to login
        if (!user) {
            return redirect('/admin/login');
        }

        // User is authenticated, attach user to locals for use in pages
        context.locals.user = user;
    }

    // If user is authenticated and tries to access login page, redirect to admin dashboard
    if (isLoginPage) {
        const user = await getAuthenticatedUser(cookies);
        if (user) {
            return redirect('/admin');
        }
    }

    return next();
});
