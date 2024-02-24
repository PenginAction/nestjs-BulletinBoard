import { getCookies } from "@/utils/getCookie";

async function selectePost(id: number) {
  try {
    const cookies = await getCookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}posts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.value}`,
        },
      }
    );
    if (!res.ok) {
      console.error("Response error", res);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    return undefined;
  }
}

export default selectePost;
