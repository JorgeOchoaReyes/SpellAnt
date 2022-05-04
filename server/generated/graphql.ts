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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Daily = {
  __typename?: 'Daily';
  _id: Scalars['String'];
  date: Scalars['String'];
  hexChars: Array<Scalars['String']>;
  wordPool: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  daily?: Maybe<Daily>;
  getOtherDaily?: Maybe<Daily>;
};


export type QueryGetOtherDailyArgs = {
  date: Scalars['DateTime'];
};

export type GetDailyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDailyQuery = { __typename?: 'Query', daily?: { __typename?: 'Daily', date: string, hexChars: Array<string>, wordPool: Array<string> } | null };


export const GetDailyDocument = gql`
    query getDaily {
  daily {
    date
    hexChars
    wordPool
  }
}
    `;

export function useGetDailyQuery(options?: Omit<Urql.UseQueryArgs<GetDailyQueryVariables>, 'query'>) {
  return Urql.useQuery<GetDailyQuery>({ query: GetDailyDocument, ...options });
};