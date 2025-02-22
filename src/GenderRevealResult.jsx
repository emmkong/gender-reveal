import { SlideLayout } from "spectacle";
import PropTypes from "prop-types";

const GenderRevealResult = ({ result }) => {
  return (
    <SlideLayout.HorizontalImage
      src={result === "🎀" ? "./girl.png" : "./boy.png"}
    />
  );
};

GenderRevealResult.propTypes = {
  result: PropTypes.string.isRequired,
};

export default GenderRevealResult;
