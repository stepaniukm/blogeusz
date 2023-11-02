import { useState, useEffect, useTransition, useMemo } from "react";

function useReadingProgress() {
  const [completion, setCompletion] = useState(0);
  const [isPending, setTransition] = useTransition();
  useEffect(() => {
    function updateScrollCompletion() {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setTransition(() => {
          setCompletion(
            Number((currentProgress / scrollHeight).toFixed(2)) * 100
          );
        });
      }
    }
    // add scroll event listener
    document.addEventListener("scroll", updateScrollCompletion);

    // remove scroll event listener on umount
    return () => {
      document.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []);
  return useMemo(
    () => [completion, isPending] as const,
    [completion, isPending]
  );
}

export default function Progress() {
  const [completion, isPending] = useReadingProgress();
  return (
    <div className="bg-gray-200 rounded h-2 w-full sticky top-0 left-0">
      <div
        className="bg-skin-accent rounded h-full transition-width"
        style={{ width: `${completion}%` }}
      >
        {isPending}
      </div>
    </div>
  );
}
