import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { prisma } from "~/server/db";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";
<<<<<<< HEAD
=======
import Layout from "~/components/Layout";
import { LoadingSpinner } from "~/components/Loading";
import PostView from "~/components/PostView";
>>>>>>> 1c3fd360019f67a6310223a2cc5ef63c3bb80ca9

export const generateSSGHelper = () => {
  return createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });
};
