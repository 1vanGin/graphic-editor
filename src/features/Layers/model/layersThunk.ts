// layersThunks.ts
import { createAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store/store';
import { ILayer } from '../ui/types';

export const setProjectLayersThunk = createAction<ILayer[]>('layers/setProjectLayersThunk');

export const setProjectLayers = (projectId: string): AppThunk => (dispatch, getState) => {
    const state = getState();
    const project = state.projects.projects.filter(project => project.id === projectId);
    const layers = project[0]?.layers;
    if (!layers) return;
    dispatch(setProjectLayersThunk(Object.values(layers).sort((a, b) => a.sortOrder - b.sortOrder)));
};
