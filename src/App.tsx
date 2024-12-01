import React from "react";
import { useInView } from "react-intersection-observer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGet } from "./hooks/useGet";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { ref, inView } = useInView();
  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage } =
    useGet();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <>
          {data?.pages?.map((page) =>
            page.data.map((post: any) => (
              <div
                key={post.id}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))
          )}
          <div>
            <h1
              ref={ref}
              // onClick={() => fetchNextPage()}
              // disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : ""}
            </h1>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
      <hr />
    </div>
  );
}
