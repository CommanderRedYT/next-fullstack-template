import type { MyModel } from '@prisma/client';
import type { PartialDeep } from 'type-fest';

import deepmerge from 'deepmerge';
import { createStore } from 'zustand';

import type { FetchAddUserResponse, FetchHelloWorldResponse } from '@/app/_api';
import { fetchAddUser, fetchHelloWorld, fetchUsers } from '@/app/_api';

export interface ApiState {
    myVariable: string;
    users: MyModel[] | null;
}

export interface ApiActions {
    fetchHello: (name: string) => Promise<FetchHelloWorldResponse>;
    getUsers: () => Promise<MyModel[] | null>;
    addUser: (name: string, email: string) => Promise<FetchAddUserResponse>;
}

export type ApiStore = ApiState & ApiActions;

export const defaultApiState: ApiState = {
    myVariable: 'Hello, world!',
    users: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createApiStore = (initialState?: PartialDeep<ApiState>) =>
    createStore<ApiStore>(set => ({
        ...(deepmerge(defaultApiState, initialState || {}) as ApiState),
        fetchHello: async name => {
            const response = await fetchHelloWorld({ name });

            if (response?.success) {
                set({
                    myVariable: response.data.message,
                });
            }

            return response;
        },
        getUsers: async () => {
            const users = await fetchUsers();

            if (users?.success) {
                set({
                    users: users.data,
                });

                return users.data;
            }

            return null;
        },
        addUser: async (name, email) => fetchAddUser({ name, email }),
    }));
