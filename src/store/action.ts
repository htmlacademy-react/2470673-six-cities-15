import { createAction } from '@reduxjs/toolkit';
import { AppRoutes } from '../components/const/const';
export const redirectToRoute = createAction<AppRoutes>('redirectToRoute');
