import { PageTitle, QueryRequestProvider, QueryResponseProvider } from "shared";
import { QUERIES, getAll } from "./api/requests";
import { Grid } from "./ui/Grid";

type Props = {

}

const SwitchesListPage = ({}: Props) => {
  return (
    <>
      <PageTitle>Коммутаторы</PageTitle>
      <QueryRequestProvider requestName={QUERIES.GET_ALL}>
        <QueryResponseProvider getRequest={getAll} requestName={QUERIES.GET_ALL}>
          <Grid/>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </>
  );
};

export default SwitchesListPage