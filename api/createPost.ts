import { getCookies } from "@/utils/getCookie";

async function createPost(text: string) {
    const cookies = await getCookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}posts`, {
        method: "POST",
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

export default createPost;