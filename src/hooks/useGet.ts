import { useInfiniteQuery } from "@tanstack/react-query";

export const useGet = () => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${pageParam}&_limit=10`
      );
      const posts = await response.json();
      return {
        data: posts,
        previousId: pageParam - 1,
        nextId: pageParam + 1,
      };
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId,
    getNextPageParam: (lastPage) => lastPage.nextId,
  });

  return {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
