import { APP_URL, DataTable, useQueryResponse } from "shared";
import { dataTableColumns } from "./dataTableColumns";
import { useNavigate } from "react-router-dom";
import { ISwitch } from "entities/switch";

const Grid = () => {
  const response = useQueryResponse()

  const navigate = useNavigate()

  const click = (data: ISwitch) => navigate(APP_URL.SWITCHES_VIEW(data.id)) 
  
  return (
    <DataTable queryResponse={response} dataTableColumns={dataTableColumns()} onRowClick={click} hover={true}/>
  );
};

export {Grid}