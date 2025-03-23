import { z } from "zod";

/**
 * Input parameters for the Qdrant Retrieve MCP tool
 */
export type QdrantRetrieveInput = {
  /** Collection names in Qdrant to search across */
  collectionNames: string[];
  /** Number of similar documents to retrieve */
  topK: number;
  /** Array of query texts to search for */
  query: string[];
};

/**
 * Schema for validating Qdrant Retrieve tool input parameters
 */
export const QdrantRetrieveInputSchema = z.object({
  collectionNames: z.array(
    z.string()
      .min(1, "Collection name cannot be empty")
      .max(100, "Collection name must be at most 100 characters")
  )
    .min(1, "At least one collection name is required")
    .max(10, "Maximum of 10 collections allowed")
    .describe("Names of the Qdrant collections to search across"),
  topK: z.number()
    .int("Number of results must be an integer")
    .min(1, "At least 1 result is required")
    .max(100, "Maximum of 100 results allowed")
    .default(3)
    .describe("Number of top similar documents to retrieve"),
  query: z.array(
    z.string()
      .min(1, "Each query must not be empty")
      .max(1000, "Each query must be at most 1000 characters")
      .describe("Query text to search for")
  )
    .min(1, "At least one query is required")
    .max(10, "Maximum of 10 queries allowed")
    .describe("Array of query texts to search for"),
});
