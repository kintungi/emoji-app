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
dayjs.extend(relativeTime);
import { LoadingSpinner } from "~/components/Loading";
import { useState } from "react";
import { toast } from "sonner";
import Layout from "~/components/Layout";
import PostView from "~/components/PostView";

const CreatePostWizard = () => {
  const { user, isLoaded } = useUser();
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      /*This line below is used to update 
      the content automatically without reloading*/
      /*Because the line returns a promise and we 
      have not used await, we get an error
      to solve that we add void to tell ts that
      we expect nothing*/
      void ctx.post.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post, please try again later!");
      }
    },
  });

  const [input, setInput] = useState("");
  // console.log(user);

  if (!user) return null;

  return (
    <div className="full flex items-center gap-4 align-middle">
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
        className=" grow bg-transparent text-white outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") mutate({ content: input });
          }
        }}
      />
      <button
        disabled={isPosting}
        onClick={() => {
          mutate({ content: input });
          // toast.success("Post submitted");
        }}
        className="rounded-lg bg-slate-700 py-2 px-6 text-white"
      >
        {!isPosting ? <span>Post</span> : <LoadingSpinner />}
      </button>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postLoading } = api.post.getAll.useQuery();

  if (postLoading) return <LoadingSpinner size={60} />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullpost) => {
        return (
          <PostView {...fullpost} key={fullpost.post.id} />
          // <div className="border-b border-slate-400 p-8" key={post.id}>
          //   {post.content}
          // </div>
        );
      })}
    </div>
  );
};
const Home: NextPage = () => {
  const { isSignedIn, isLoaded: userLoaded } = useUser();
  // console.log(user);
  // const { data } = api.example.getAll.useQuery();

  // fetch data asap
  api.post.getAll.useQuery();
  if (!userLoaded) return <div></div>;

  // if (postLoaded) return <LoadingSpinner />;
  //return empty div if data is not loaded
  // if (!data) return <div>Something went wrong</div>;

  // console.log(data);

  return (
    <>
      <Head>
        <title>Chirp</title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
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
        <Feed />
      </Layout>
    </>
  );
};

export default Home;
