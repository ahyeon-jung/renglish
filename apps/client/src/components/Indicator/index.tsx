import IndicatorContainer from "./IndicatorContainer";
import IndicatorItem from "./IndicatorItem";

function Indicator({ children }: React.PropsWithChildren) {
  return <IndicatorContainer>{children}</IndicatorContainer>;
}

Indicator.Item = IndicatorItem;

export default Indicator;
