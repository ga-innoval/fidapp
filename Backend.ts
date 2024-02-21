import axios from "axios";

const baseURL = "http://ec2-34-225-19-110.compute-1.amazonaws.com/";

export const token = {
  refresh:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1Nzk2NzUxMiwiaWF0IjoxNjcxNjUzOTEyLCJqdGkiOiI1ZDRkZWZkM2ZmM2I0OTllOGE4ZTI5NTFkNzcxMGMzZCIsInVzZXJfaWQiOjE3fQ.B0dnG9vZyP9Va8Z0QWezljbJTJkmz3f2mh8rxnckZSk",
  access:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3OTY3NTEyLCJpYXQiOjE2NzE2NTM5MTIsImp0aSI6IjBjN2M4NGU3OTU4ZDQ0NDdiMjg4N2U3Mjc1NDFhZmNmIiwidXNlcl9pZCI6MTd9.j0Jz-iIUcjNm86Y9LhxJO4vQXvEsVEjuXYT7WUiJ__M",
};

export const backend = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token.access}`,
  },
});
