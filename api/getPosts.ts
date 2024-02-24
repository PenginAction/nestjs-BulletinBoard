import { getCookies } from "@/utils/getCookie";

async function getPosts(page_id: number, page_size: number) {
  const cookies = await getCookies();
//   console.log(cookies?.value);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}posts?page_id=${page_id}&page_size=${page_size}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.value}`,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    console.error("Network response was not ok");
    return [];
  }

  const posts: Post[] = await res.json();
  if (!Array.isArray(posts)) {
    console.error("Data is not an array");
    return [];
  }
  return posts;
}

export default getPosts;
