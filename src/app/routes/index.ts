import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { petRoutes } from '../modules/pet/pet.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '',
        route: userRoutes
    },
    {
        path: '',
        route: AuthRoutes
    },
    {
        path: '/pets',
        route: petRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;