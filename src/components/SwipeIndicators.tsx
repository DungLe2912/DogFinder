import { animated } from "@react-spring/web";
import type { Interpolation } from "@react-spring/web";

interface SwipeIndicatorsProps {
  likeOpacity: Interpolation<number, number>;
  nopeOpacity: Interpolation<number, number>;
  superLikeOpacity: Interpolation<number, number>;
}

const SwipeIndicators = ({
  likeOpacity,
  nopeOpacity,
  superLikeOpacity,
}: SwipeIndicatorsProps) => {
  return (
    <>
      <animated.div
        className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-2xl rotate-[-20deg] border-4 border-red-500"
        style={{ opacity: nopeOpacity }}
      >
        NOPE
      </animated.div>

      <animated.div
        className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-2xl rotate-20 border-4 border-green-500"
        style={{ opacity: likeOpacity }}
      >
        LIKE
      </animated.div>

      <animated.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-2xl border-4 border-blue-500"
        style={{ opacity: superLikeOpacity }}
      >
        SUPER LIKE
      </animated.div>
    </>
  );
};

export default SwipeIndicators;
