import { useSpring, animated } from "react-spring";
import { useEffect } from "react";

function Animation() {
  const [props, api] = useSpring(() => ({
    from: { y: 30, opacity: 1 },
  }));

  useEffect(() => {
    api.start({
      y: 20,
      opacity: 1,
      loop: { reverse: true },
      delay: 200,
    });
  }, []);

  return <animated.h3 style={props}>start rebike ▶︎</animated.h3>;
}

export default Animation;
