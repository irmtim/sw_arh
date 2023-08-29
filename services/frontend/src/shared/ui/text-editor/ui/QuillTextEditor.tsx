import { FieldHookConfig, useField } from "formik";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

type Props = {
  data: string
  onChange?: (data: string) => void
  className?: string
  readOnly?: boolean
}

const QuillTextEditor = ({data, onChange, className = '', readOnly = false}: Props) => {

  const modules = readOnly 
    ? {
      toolbar: false
    }
    : {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }

  
  return (
    <>
      <ReactQuill 
        value={data} 
        theme="snow" 
        readOnly={readOnly}
        // modules={modules}
        onChange={(e) => onChange && onChange(e)} className={className}/>
    </>
  );
};

export {QuillTextEditor}