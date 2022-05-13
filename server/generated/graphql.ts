import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Daily = {
  __typename?: 'Daily';
  _id: Scalars['Float'];
  hexChars: Array<Scalars['String']>;
  wordPool: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  daily?: Maybe<Daily>;
  findDaily?: Maybe<Daily>;
};


export type QueryFindDailyArgs = {
  number: Scalars['Int'];
};

export type GetDailyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDailyQuery = { __typename?: 'Query', daily?: { __typename?: 'Daily', hexChars: Array<string>, wordPool: Array<string>, _id: number } | null };

export type FindDailyQueryVariables = Exact<{
  number: Scalars['Int'];
}>;


export type FindDailyQuery = { __typename?: 'Query', findDaily?: { __typename?: 'Daily', hexChars: Array<string>, wordPool: Array<string>, _id: number } | null };


export const GetDailyDocument = gql`
    query getDaily {
  daily {
    hexChars
    wordPool
    _id
  }
}
    `;

export function useGetDailyQuery(options?: Omit<Urql.UseQueryArgs<GetDailyQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDailyQuery>({ query: GetDailyDocument, ...options });
};
export const FindDailyDocument = gql`
    query findDaily($number: Int!) {
  findDaily(number: $number) {
    hexChars
    wordPool
    _id
  }
}
    `;

export function useFindDailyQuery(options: Omit<Urql.UseQueryArgs<FindDailyQueryVariables>, 'query'>) {
  return Urql.useQuery<FindDailyQuery>({ query: FindDailyDocument, ...options });
};