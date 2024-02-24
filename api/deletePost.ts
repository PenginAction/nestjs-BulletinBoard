import { getCookies } from "@/utils/getCookie";

async function deletePost(id: string) {
    const cookies = await getCookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}posts/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.value}`,
        },
    });
}

export default deletePost;