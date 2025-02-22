/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation CreateArtwork($title: String!, $imageUrls: [String!]!, $category: String!, $description: String) {\n    createArtwork(title: $title, imageUrls: $imageUrls, category: $category, description: $description) {\n      title\n      createdAt\n      imageUrls\n      category\n      description\n      createdAt\n    }\n  }\n':
    types.CreateArtworkDocument,
  '\n  query GetArtworks {\n    getArtworks {\n      id\n      title\n      description\n      category\n      createdAt\n      imageUrls\n    }\n  }\n':
    types.GetArtworksDocument,
  '\n  query GetArtworkById($id: ID!) {\n    getArtworkById(id: $id) {\n      id\n      title\n      description\n      category\n      imageUrls\n      createdAt\n    }\n  }\n':
    types.GetArtworkByIdDocument,
  '\n  fragment PostItem on Post {\n    id\n    title\n    content\n    published\n    author {\n      id\n      name\n    }\n  }\n':
    types.PostItemFragmentDoc,
  '\n  mutation PublishDraft($id: ID!) {\n    publishDraft(id: $id) {\n      ...PostItem\n    }\n  }\n':
    types.PublishDraftDocument,
  '\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id) {\n      ...PostItem\n    }\n  }\n':
    types.DeletePostDocument,
  '\n  query GetPostById($id: ID!) {\n    getPostById(id: $id) {\n      ...PostItem\n    }\n  }\n':
    types.GetPostByIdDocument,
  '\n  query GetDrafts {\n    getDrafts {\n      ...PostItem\n    }\n  }\n': types.GetDraftsDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateArtwork($title: String!, $imageUrls: [String!]!, $category: String!, $description: String) {\n    createArtwork(title: $title, imageUrls: $imageUrls, category: $category, description: $description) {\n      title\n      createdAt\n      imageUrls\n      category\n      description\n      createdAt\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateArtwork($title: String!, $imageUrls: [String!]!, $category: String!, $description: String) {\n    createArtwork(title: $title, imageUrls: $imageUrls, category: $category, description: $description) {\n      title\n      createdAt\n      imageUrls\n      category\n      description\n      createdAt\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetArtworks {\n    getArtworks {\n      id\n      title\n      description\n      category\n      createdAt\n      imageUrls\n    }\n  }\n'
): (typeof documents)['\n  query GetArtworks {\n    getArtworks {\n      id\n      title\n      description\n      category\n      createdAt\n      imageUrls\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetArtworkById($id: ID!) {\n    getArtworkById(id: $id) {\n      id\n      title\n      description\n      category\n      imageUrls\n      createdAt\n    }\n  }\n'
): (typeof documents)['\n  query GetArtworkById($id: ID!) {\n    getArtworkById(id: $id) {\n      id\n      title\n      description\n      category\n      imageUrls\n      createdAt\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PostItem on Post {\n    id\n    title\n    content\n    published\n    author {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  fragment PostItem on Post {\n    id\n    title\n    content\n    published\n    author {\n      id\n      name\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PublishDraft($id: ID!) {\n    publishDraft(id: $id) {\n      ...PostItem\n    }\n  }\n'
): (typeof documents)['\n  mutation PublishDraft($id: ID!) {\n    publishDraft(id: $id) {\n      ...PostItem\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id) {\n      ...PostItem\n    }\n  }\n'
): (typeof documents)['\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id) {\n      ...PostItem\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetPostById($id: ID!) {\n    getPostById(id: $id) {\n      ...PostItem\n    }\n  }\n'
): (typeof documents)['\n  query GetPostById($id: ID!) {\n    getPostById(id: $id) {\n      ...PostItem\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetDrafts {\n    getDrafts {\n      ...PostItem\n    }\n  }\n'
): (typeof documents)['\n  query GetDrafts {\n    getDrafts {\n      ...PostItem\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never
