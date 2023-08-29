import { FC } from "react";
import { Loader } from "./Loader";
import { useLoader } from "../lib/LoaderContext";

type Props = {

}

const get = () : Promise<string> => {
  return Promise.resolve("Hello world")
}

const TestWrapper = () => (
  <Loader request={get}>
    {({data}) => (
      <>
        <TestComponent/>
        <span>and data too: {data}</span>
      </>
    )}
    
  </Loader>
)

const TestComponent: FC<Props> = () => {

  const {data} = useLoader<string>()

  return (
    <>
      <h1>{data}</h1>
    </>
  );
};

export {TestWrapper}