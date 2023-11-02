import { useState, useEffect, useTransition, useMemo } from "react";

function useReadingProgress() {
  const [completion, setCompletion] = useState(0);
  const [_, setTransition] = useTransition();
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
    document.addEventListener("scroll", updateScrollCompletion);

    return () => {
      document.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []);
  return useMemo(() => completion, [completion]);
}

export default function Progress() {
  const completion = useReadingProgress();
  return (
    <div className="rounded h-2 w-full sticky top-0 left-0">
      <div
        className="bg-skin-accent rounded h-full transition-width"
        style={{ width: `${completion}%` }}
      ></div>
    </div>
  );
}
