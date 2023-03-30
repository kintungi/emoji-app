/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Head from "next/head";
dayjs.extend(relativeTime);

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex h-screen w-full justify-center">
        <div>Single Post Page</div>
      </main>
    </>
  );
};

export default SinglePostPage;
