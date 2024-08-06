"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode, Suspense } from "react";
import { z } from "zod";
import { generateId } from "ai";
import CommitList from "@/components/blocks/components/commit-list";
import { SkeletonDemo } from "@/components/blocks/skeletons/test";
import RepoInfo from "@/components/blocks/components/repo-info";
import UserInfo from "@/components/blocks/components/users-info";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function continueConversation(
  input: string
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  const result = await streamUI({
    model: openai("gpt-4o-mini"),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      repocommits: {
        description: "Get commits repository for github",
        parameters: z.object({
          username: z.string().describe("The Name of user"),
          repository: z.string().describe("Th Name of repository of user"),
        }),
        generate: async ({ username, repository }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing commits for the ${username} in the repository ${repository} `,
            },
          ]);

          return (
            <Suspense fallback={<SkeletonDemo />}>
              <CommitList username={username} repository={repository} />
            </Suspense>
          );
        },
      },
      repoinfo: {
        description: "Get general information for repository of github",
        parameters: z.object({
          username: z.string().describe("The Name of user"),
          repository: z.string().describe("Th Name of repository of user"),
        }),
        generate: async ({ username, repository }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing general information of the repository ${repository} for the user ${username} `,
            },
          ]);

          return (
            <Suspense fallback={<SkeletonDemo />}>
              <RepoInfo username={username} repository={repository} />
            </Suspense>
          );
        },
      },
      usergithub: {
        description: "Get information for user of github",
        parameters: z.object({
          username: z.string().describe("The Name of user"),
        }),
        generate: async ({ username }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing information for the user ${username} `,
            },
          ]);

          return (
            <Suspense fallback={<SkeletonDemo />}>
              <UserInfo username={username}  />
            </Suspense>
          );
        },
      },
    },
  });

  return {
    id: generateId(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
