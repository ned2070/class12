import { WEB_SITE } from "./config";
import { CommentForm } from "./CommentForm";

console.log(WEB_SITE);

export default async function Comments({ postSlug }: { postSlug: string }) {
  console.log("This runs on the server");
  let comments = [];

  try {
    const commentsResult = await fetch(`${WEB_SITE}/api/comments/${postSlug}`, {
      next: { revalidate: 0 },
    });
    const response = await commentsResult.json();
    console.log(response);
    comments = response.comments.rows;
    console.log(response.comments);
  } catch (err) {
    console.log(err);
  }

  console.log(comments);
  return (
    <div>
      <CommentForm postSlug={postSlug} />
      <h2>| Comments |</h2>
      <ul>
        {/* @ts-ignore */}
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              {comment.username} says...
              <br />
              {comment.content}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
