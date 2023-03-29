/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Head from "next/head";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  console.log(user);

  if (!user) return null;

  return (
    <div className="full flex items-center gap-4">
      <Image
        src={user.profileImageUrl}
        alt="Profile image"
        width={96}
        height={96}
        className="mt-8 h-14 w-14 rounded-full"
      />
      <input
        type="text"
        placeholder="Type some emojis"
        className="grow bg-transparent text-white outline-none"
      />
    </div>
  );
};

type PostWithUser = RouterOutputs["post"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="flex gap-4 border-b border-slate-400 p-4" key={post.id}>
      <Image
        src={author.profilePicture}
        alt="author image"
        className="h-14 w-14 rounded-full"
        width={96}
        height={96}
      />
      <div className="flex flex-col">
        <div className="flex gap-[6px] text-[14px] text-slate-300">
          <span className="font-bold">{`@${author.username} `}</span>
          {/* prettier-ignore */}
          <span className="text-slate-500">{` • ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const { user, isSignedIn } = useUser();
  // console.log(user);
  // const { data } = api.example.getAll.useQuery();
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) return <div>...Loading</div>;

  if (!data) return <div>Something went wrong</div>;

  // console.log(data);

  return (
    <>
      <Head>
        <title>Chirp</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full justify-center">
        <div className="h-full w-full border-x border-slate-400  md:max-w-2xl">
          <div className="flex w-full border-b border-slate-400   p-4">
            {!isSignedIn && (
              <div className="flex justify-center ">
                <SignInButton mode="modal">
                  <button className=" rounded-lg bg-blue-700 py-2 px-6 text-white">
                    Sign in
                  </button>
                </SignInButton>
              </div>
            )}
            {isSignedIn && (
              <div className="flex w-full flex-col justify-center ">
                <SignOutButton>
                  <button className="w-min whitespace-nowrap rounded-lg bg-blue-700 py-2 px-6 text-white">
                    Sign out
                  </button>
                </SignOutButton>
                <CreatePostWizard />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {[...data, ...data]?.map((fullpost) => {
              return (
                <PostView {...fullpost} key={fullpost.post.id} />
                // <div className="border-b border-slate-400 p-8" key={post.id}>
                //   {post.content}
                // </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
