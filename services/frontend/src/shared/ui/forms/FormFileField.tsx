import clsx from "clsx";
import { useField } from "formik";
import { ChangeEvent, FC, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  fileField: string
  fileNameField: string
}

const FormFileField: FC<Props> = (props) => {
  const {className, fileField, fileNameField, ...restProps} = props
  
  const [field, metaFile, helpersFile] = useField(fileField);
  const [field1, metaFileName, helpersFileName] = useField(fileNameField);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      helpersFile.setValue(e.target.files[0])
      helpersFileName.setValue(e.target.files[0].name)
    }
    else {
      helpersFile.setValue(undefined)
      helpersFileName.setValue(undefined)
    }
  }

  return (
    <input type="file" onChange={onChange} className={clsx("form-control", className)} />
  );
};

export {FormFileField}