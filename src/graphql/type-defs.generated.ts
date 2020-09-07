import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};


export type Query = {
  __typename?: 'Query';
  posts: Array<Maybe<Post>>;
  places: Array<Maybe<Place>>;
};


export type QueryPostsArgs = {
  sortBy?: Maybe<PostSortField>;
  sortOrder?: Maybe<SortOrder>;
};


export type QueryPlacesArgs = {
  searchText?: Maybe<Scalars['String']>;
  searchRadius?: Maybe<SearchRadiusInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: Post;
};


export type MutationAddPostArgs = {
  input: PostInput;
};

export enum PostSortField {
  Time = 'time'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Post = Node & {
  __typename?: 'Post';
  id: Scalars['ID'];
  time: Scalars['Date'];
  place: Place;
  content: Scalars['String'];
  type: PostType;
  GPSVerified: Scalars['Boolean'];
};

export type SearchRadiusInput = {
  unit?: Maybe<DistanceUnit>;
  amount?: Maybe<Scalars['Int']>;
  coordinates: Array<CoordinatesInput>;
};

export type CoordinatesInput = {
  Latitude: Scalars['Float'];
  Longitude: Scalars['Float'];
};

export type Place = Node & Coordinates & {
  __typename?: 'Place';
  id: Scalars['ID'];
  Latitude?: Maybe<Scalars['Float']>;
  Longitude?: Maybe<Scalars['Float']>;
  where: Scalars['String'];
  type: PlaceUserInputType;
};

export type PostInput = {
  type: PostType;
  GPSVerified: Scalars['Boolean'];
  Latitude?: Maybe<Scalars['Float']>;
  Longitude?: Maybe<Scalars['Float']>;
  time: Scalars['Date'];
  content: Scalars['String'];
  whereHow: PlaceUserInputType;
  where: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export enum PostType {
  AdHoc = 'AD_HOC',
  PostFacto = 'POST_FACTO'
}

export enum DistanceUnit {
  Miles = 'MILES',
  Kilometers = 'KILOMETERS'
}

export type Coordinates = {
  Latitude?: Maybe<Scalars['Float']>;
  Longitude?: Maybe<Scalars['Float']>;
};

export enum PlaceUserInputType {
  MapboxSearchResult = 'MAPBOX_SEARCH_RESULT',
  MapboxCoordinates = 'MAPBOX_COORDINATES',
  Raw = 'RAW'
}

export type PostsQueryVariables = Exact<{
  sortOrder?: Maybe<SortOrder>;
  sortBy?: Maybe<PostSortField>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'content' | 'type' | 'GPSVerified'>
    & { place: (
      { __typename?: 'Place' }
      & Pick<Place, 'id' | 'where' | 'type' | 'Latitude' | 'Longitude'>
    ) }
  )>> }
);



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  PostSortField: PostSortField;
  SortOrder: SortOrder;
  Post: ResolverTypeWrapper<Post>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  SearchRadiusInput: SearchRadiusInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CoordinatesInput: CoordinatesInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Place: ResolverTypeWrapper<Place>;
  PostInput: PostInput;
  Node: ResolversTypes['Post'] | ResolversTypes['Place'];
  PostType: PostType;
  DistanceUnit: DistanceUnit;
  Coordinates: ResolversTypes['Place'];
  PlaceUserInputType: PlaceUserInputType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  Query: {};
  String: Scalars['String'];
  Mutation: {};
  Post: Post;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  SearchRadiusInput: SearchRadiusInput;
  Int: Scalars['Int'];
  CoordinatesInput: CoordinatesInput;
  Float: Scalars['Float'];
  Place: Place;
  PostInput: PostInput;
  Node: ResolversParentTypes['Post'] | ResolversParentTypes['Place'];
  Coordinates: ResolversParentTypes['Place'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  posts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType, RequireFields<QueryPostsArgs, never>>;
  places?: Resolver<Array<Maybe<ResolversTypes['Place']>>, ParentType, ContextType, RequireFields<QueryPlacesArgs, never>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationAddPostArgs, 'input'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  place?: Resolver<ResolversTypes['Place'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PostType'], ParentType, ContextType>;
  GPSVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PlaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  Latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  Longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  where?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PlaceUserInputType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Post' | 'Place', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  __resolveType: TypeResolveFn<'Place', ParentType, ContextType>;
  Latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  Longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
