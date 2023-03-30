import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
          <Link href={`/@${author.username}`}>
            <span className="font-bold">{`@${author.username} `}</span>
          </Link>
          {/* prettier-ignore */}
          <span className="text-slate-500">{` • `}</span>
          <Link href={`/post/${post.id}`}>
            <span className="text-slate-500">{` ${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
};

export default PostView;
