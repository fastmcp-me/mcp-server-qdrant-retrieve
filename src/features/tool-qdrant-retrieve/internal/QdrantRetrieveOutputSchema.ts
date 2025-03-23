import { z } from "zod";

/**
 * MCP tool output format for Qdrant Retrieve JSON responses
 */
export type QdrantRetrieveOutput = {
  /** Array of retrieved documents with similarity scores */
  results: Array<{
    /** The query that produced this result */
    query: string;
    /** Collection name that this result came from */
    collectionName: string;
    /** Document text content */
    text: string;
    /** Similarity score between 0 and 1 */
    score: number;
  }>;
};

/**
 * Schema for validating Qdrant Retrieve tool JSON output
 */
export const QdrantRetrieveOutputSchema = z.object({
  results: z.array(
    z.object({
      query: z.string(),
      collectionName: z.string(),
      text: z.string(),
      score: z.number().min(0).max(1),
    })
  ),
});
