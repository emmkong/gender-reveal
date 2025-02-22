import { useState } from "react";
import { Deck, Slide, Heading, DefaultTemplate, SlideLayout } from "spectacle";
import GenderRevealGame from "./GenderRevealGame";

function App() {
  const [result, setResult] = useState(null);

  const handleNext = (result) => {
    setResult(result);
  };

  return (
    <Deck template={<DefaultTemplate />}>
      <SlideLayout.Center>
        <Heading>准备好了吗？</Heading>
      </SlideLayout.Center>
      <SlideLayout.Center>
        <Heading>让我们揭晓这个小宝贝的神秘身份!</Heading>
      </SlideLayout.Center>
      <Slide>
        <GenderRevealGame onNext={handleNext} />
      </Slide>
      <SlideLayout.HorizontalImage
        src={result === "🎀" ? "./girl.png" : "./boy.png"}
      />
    </Deck>
  );
}
export default App;
