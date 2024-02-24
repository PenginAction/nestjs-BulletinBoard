"use client";
import deletePost from "@/api/deletePost";
import getPosts from "@/api/getPosts";
import selectePost from "@/api/selectePost";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import PostForm from "./postForm";
import formatToJST from "@/utils/formatToJST";

const cookie = new Cookies();
const userId = cookie.get("id");

export default function PostList() {
  const [page_id, setPageId] = useState(1);
  const page_size = 5;
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLength, setPostsLength] = useState(0);
  const [selectedPostText, setSelectedPostText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const handleDeletePost = async (postId: string) => {
    await deletePost(postId);
    const updatedPosts = posts.filter((post) => post.id !== Number(postId));
    setPosts(updatedPosts);
  };

  const handleSelectPost = async (postId: number) => {
    const selectedPost = await selectePost(postId);
    setSelectedPostText(selectedPost.text);
    setSelectedPostId(selectedPost.id);
    setFormMode("edit");
  };

  const handleCancel = () => {
    setFormMode("create");
    setSelectedPostId(null);
    setSelectedPostText("");
  };
  const fetchPosts = async () => {
    const posts = await getPosts(page_id, page_size);
    setPosts(posts);
    setPostsLength(posts.length);
    setFormMode("create");
    setSelectedPostId(null);
    setSelectedPostText("");
  };
  useEffect(() => {
    fetchPosts();
  }, [page_id]);
  console.log(posts);
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <button
          className="mr-2 my-3"
          onClick={() => page_id > 1 && setPageId(page_id - 1)}
        >
          <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="bg-gray-100 rounded-full w-10 h-10 p-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            ></path>
          </svg>
        </button>
        <p className="text-2xl font-bold my-3">{page_id}</p>
        <button
          className="ml-2 my-3"
          onClick={() => postsLength >= page_size && setPageId(page_id + 1)}
        >
          <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="bg-gray-100 rounded-full w-10 h-10 p-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            ></path>
          </svg>
        </button>
      </div>

      {posts?.map((post) => (
        <div
          key={post.id}
          className={`flex justify-between p-4 bg-white rounded shadow h-100 mx-20 my-5 text-[1.5rem] ${
            post.user_id === Number(userId) ? "bg-red-50" : ""
          }`}
        >
          <div>
            <p className="text-gray-700">
              {post.user_str_id}{" "}
              <span className="text-xs leading-5 text-gray-500">
                {formatToJST(post.created_at)}
              </span>
            </p>
            <p className="text-gray-900">{post.text}</p>
          </div>
          {post.user_id === Number(userId) && (
            <div>
              <svg
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="bg-gray-100 rounded-full w-10 h-10 p-2 cursor-pointer"
                onClick={() => handleSelectPost(post.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                ></path>
              </svg>
              <svg
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="bg-gray-100 rounded-full w-10 h-10 p-2 cursor-pointer"
                onClick={() => handleDeletePost(post.id.toString())}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                ></path>
              </svg>
            </div>
          )}
        </div>
      ))}
      <PostForm
        key={selectedPostId}
        initialText={selectedPostText}
        mode={formMode}
        initialPostId={selectedPostId}
        setInitialText={setSelectedPostText}
        onSubmit={fetchPosts}
        onCancel={handleCancel}
      />
    </div>
  );
}
