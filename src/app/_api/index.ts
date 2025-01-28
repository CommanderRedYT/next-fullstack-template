import type { RequestBody, RequestParams } from '@backend/types';

import api from '@/utils/api';

export type FetchHelloWorldQuery = RequestParams<'/api/hello'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const pFetchHelloWorld = async (query: FetchHelloWorldQuery) => {
    const { data, error, response } = await api.GET('/api/hello', {
        params: {
            query,
        },
    });

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type FetchHelloWorldResponse =
    | Awaited<ReturnType<typeof pFetchHelloWorld>>
    | undefined;

export const fetchHelloWorld: (
    query: FetchHelloWorldQuery,
) => Promise<FetchHelloWorldResponse> = pFetchHelloWorld;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const pFetchUsers = async () => {
    const { data, error, response } = await api.GET('/api/users/list');

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type FetchUsersResponse = Awaited<ReturnType<typeof pFetchUsers>>;

export const fetchUsers: () => Promise<FetchUsersResponse> = pFetchUsers;

export type FetchAddUserBody = RequestBody<'/api/users/add'>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const pFetchAddUser = async (body: FetchAddUserBody) => {
    const { data, error, response } = await api.POST('/api/users/add', {
        body,
    });

    if (error) {
        return { ...error, response };
    }

    return data;
};

export type FetchAddUserResponse = Awaited<ReturnType<typeof pFetchAddUser>>;

export const fetchAddUser: (
    body: FetchAddUserBody,
) => Promise<FetchAddUserResponse> = pFetchAddUser;
