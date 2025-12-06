import HackerHeader from "../HackerHeader";
import HackerRank from "../Stats/Hackerrank";

export default function LinuxCard() {
  return (
    <div className="relative w-full">
      <div className="mb-8 md:mb-12">
        <HackerHeader
          text="02 01 03 // SOME STATISTICS"
          lineSide="left"
          variant="light"
        />
      </div>
      <HackerRank username="toby_chen13371" />
    </div>
  );
}
