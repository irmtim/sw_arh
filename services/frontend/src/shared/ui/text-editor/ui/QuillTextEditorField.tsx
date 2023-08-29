import { FieldHookConfig, useField } from "formik";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { QuillTextEditor } from "./QuillTextEditor";

type Props = FieldHookConfig<string> & {
  className?: string
  readOnly?: boolean
}

const QuillTextEditorField = ({name, className = '', readOnly = false}: Props) => {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  
  return (
    <>
      <QuillTextEditor
        data={value} 
        readOnly={readOnly}
        onChange={(e) => setValue(e)} className={className}/>
    </>
  );
};

export {QuillTextEditorField}