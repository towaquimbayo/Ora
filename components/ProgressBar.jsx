export default function ProgressBar({ progressNum }) {
  return (
    <div className="w-full rounded-md bg-neutral-200 dark:bg-[#e2e2e2]">
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0;
          }
          to {
            width: ${progressNum}%;
          }
        }

        .animate-progressbar {
          animation: progress 1s ease-in-out forwards;
        }
      `}</style>
      <div
        className={`min-h-2 text-center text-xs text-[#fff] font-medium leading-none rounded-md bg-[#3573e7]  ${
          progressNum > 0 && "animate-progressbar p-0.5"
        } transition-all duration-300 ease-in-out `}
        style={{ width: `${progressNum}%` }}
      >
        {progressNum > 0 && Math.round(progressNum) + "%"}
      </div>
    </div>
  );
}
