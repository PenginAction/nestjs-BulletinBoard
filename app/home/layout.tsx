import type { Metadata } from "next";
import NavBar from "../components/nav-bar";
import PostList from "../components/postList";
// import PostForm from "../components/postForm";

export const metadata: Metadata = {
  title: "Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-screen bg-green-200">
        <NavBar />
        {/* <PageBar /> */}
        <PostList />
        {/* <PostForm /> */}
        {children}
      </body>
    </html>
  );
}
