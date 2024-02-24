import { getCookies } from "@/utils/getCookie";

async function updatePost(text: string, id: number) {
    const cookies = await getCookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}posts/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.value}`,
        },
        body: JSON.stringify({
        text: text,
        }),
    });
    if (!res.ok) {
        console.error("Network response was not ok");
        return;
    }
    const post = await res.json();
    return post;
}

export default updatePost;