"use client";

import { Button } from "@neomorphic-react/ui/button";
import { toast } from "@neomorphic-react/ui/toast";

function publish() {
  return new Promise<{ url: string }>((resolve) =>
    setTimeout(() => resolve({ url: "northwind.blog/spring-menu" }), 1500)
  );
}

export default function ToastPromise() {
  return (
    <Button
      onClick={() =>
        toast.promise(publish(), {
          loading: "Publishing your post…",
          success: (post) => ({
            title: "Post published",
            description: post.url,
          }),
          error: "Couldn't publish the post",
        })
      }
      variant="primary"
    >
      Publish
    </Button>
  );
}
