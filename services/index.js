import {request, gql} from 'graphql-request';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const graphqlAPI = process.env.NEXT_PUBLIC_BLOGME_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query Assets {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        feuturedImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }

    `
    const result = await request(graphqlAPI, query)
    return result.postsConnection.edges;
};

export const getPostsDetails = async (slug) => {
    const query = gql`
        query GetPostsDetails($slug: String!) {
            post(where: {slug: $slug}) {
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                excerpt
                feuturedImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
        }

    `
    const result = await request(graphqlAPI, query, {slug})
    return result.post;
};

export const getRecentPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails(){
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                feuturedImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!,$categories: [String!]){
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ) {
                title
                feuturedImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query, {categories, slug} );

    return result.posts;
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.categories;
}
