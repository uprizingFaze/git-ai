"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode, Suspense } from "react";
import { z } from "zod";
import { generateId } from "ai";
import { SkeletonDemo } from "@/components/blocks/skeletons/test";

import CommitList from "@/components/blocks/components/commit-list";
import RepoBranch from "@/components/blocks/components/branches";
import RepoContributors from "@/components/blocks/components/contributors";
import RepoIssues from "@/components/blocks/components/issues";
import RepoPullClosed from "@/components/blocks/components/pulls-closed";
import RepoPull from "@/components/blocks/components/pulls";
import RepoInfo from "@/components/blocks/components/repo-info";
import UserInfo from "@/components/blocks/components/users-info";
import CommitActivity from "@/components/blocks/components/test";

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
    system: `\
This is a chatbot that can display information about GitHub repositories and users.
You need two parameters: a user and a repository. If the user doesn't provide them, 
you should ask for the missing one or both if they request information about repositories or users.
You can provide information on commits of a repository, repository details, activity in a 
repository, branches of a repository, open PRs of a repository, closed PRs of a repository,
user information, issues of a repository, and contributors of a repository.
    `,
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
      pulls: {
        description: "Get information for pr of the repository of github",
        parameters: z.object({
          username: z.string().describe("The Name of user"),
          repository: z.string().describe("Th Name of repository of user"),
        }),
        generate: async ({ username, repository }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing general information of the pr for repository ${repository} for the user ${username} `,
            },
          ]);

          return (
            <Suspense fallback={<SkeletonDemo />}>
              <RepoPull username={username} repository={repository} />
            </Suspense>
          );
        },
      },
      pullsclosed: {
        description: "Get information for pr closed of the repository of github",
        parameters: z.object({
          username: z.string().describe("The Name of user"),
          repository: z.string().describe("Th Name of repository of user"),
        }),
        generate: async ({ username, repository }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing general information of the pr closed for repository ${repository} for the user ${username} `,
            },
          ]);

          return (
            <Suspense fallback={<SkeletonDemo />}>
              <RepoPullClosed username={username} repository={repository} />
            </Suspense>
          );
        },
      },
      commitact: {
        description: "Get information the Activity for commits of the repository of github",
        parameters: z.object({
          username: z.string().describe("The Name of user"),
          repository: z.string().describe("Th Name of repository of user"),
        }),
        generate: async ({ username, repository }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing general information of the Activities commits for repository ${repository} for the user ${username} `,
            },
          ]);

          return (
            <Suspense fallback={<SkeletonDemo />}>
              <CommitActivity username={username} repository={repository} />
            </Suspense>
          );
        },
      },
      branches: {
        description: "Get information of branches for repository of github",
        parameters: z.object({
          username: z.string().describe("The Name of user"),
          repository: z.string().describe("Th Name of repository of user"),
        }),
        generate: async ({ username, repository }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing general information branches of the repository ${repository} for the user ${username} `,
            },
          ]);

          return (
            <Suspense fallback={<SkeletonDemo />}>
              <RepoBranch username={username} repository={repository} />
            </Suspense>
          );
        },
      },
      repoissues: {
        description: "Get information of issues for repository of github",
        parameters: z.object({
          username: z.string().describe("The Name of user"),
          repository: z.string().describe("Th Name of repository of user"),
        }),
        generate: async ({ username, repository }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing information issues of the repository ${repository} for the user ${username} `,
            },
          ]);

          return (
            <Suspense fallback={<SkeletonDemo />}>
              <RepoIssues username={username} repository={repository} />
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
              <UserInfo username={username} />
            </Suspense>
          );
        },
      },

      contributors: {
        description:
          "Get information for contributors in the repository of github",
        parameters: z.object({
          username: z.string().describe("The Name of user"),
          repository: z.string().describe("Th Name of repository of user"),
        }),
        generate: async ({ username, repository }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: "assistant",
              content: `Showing general information contributors of the repository ${repository} for the user ${username} `,
            },
          ]);

          return (
            <Suspense fallback={<SkeletonDemo />}>
              <RepoContributors username={username} repository={repository} />
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
