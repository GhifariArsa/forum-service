export type CreateDiscussionParams = {
  title: string;
  content: string;
  userId: number;
};

export type CreateUpvoteParams = {
  userId: number;
  discussionId: number;
  commentId: number;
};
