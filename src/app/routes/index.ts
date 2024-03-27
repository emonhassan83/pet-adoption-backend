import express from 'express';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: "userRoutes"
    },
    {
        path: '/auth',
        route: "AuthRoutes"
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;