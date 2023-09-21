import { useQuery } from "@tanstack/react-query";
import request, { Variables } from "graphql-request";
import { graphql } from "./gql";
import Constants from 'expo-constants';

export const useGraphQLQuery = (queryKey: unknown[], query: ReturnType<typeof graphql>, vars?: Variables) => useQuery({
  queryKey: queryKey,
  queryFn: async () =>
    request(
      `${Constants.manifest.supabaseUrl}/graphql/v1`,
      query,
      vars,
      {
        "content-type": "application/json",
        "apikey": Constants.manifest.supabaseAnonKey,
      }
    ),
})

/**
 * Example usage:
 */
// @ts-ignore
const gamesQuery = graphql(/* GraphQL */ `
  query gamesQuery($first: Int!) {
    gamesCollection(first: $first) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`)

/**
 *   const { data } = useGraphQLQuery(
    ["games"],
    gamesQuery,
    { first: 10 },
  );
 */

// {data?.gamesCollection.edges.map((edge) => edge.node.name).join(", ")}

