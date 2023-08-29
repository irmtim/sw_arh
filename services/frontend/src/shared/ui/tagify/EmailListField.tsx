import Tags from "@yaireo/tagify/dist/react.tagify";
import { useField } from "formik";

type Props = {
  name: string
}

const EmailListField = ({name}: Props) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  const onChange = (e: any/*CustomEvent<ChangeEventData<any>>*/) => {
    const arr = e.detail.tagify.value.map((c: any) => c.value)

    setValue(arr)
  }

  const tagifySettings = {
    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    dropdown: {
      enabled: 0
    },
    callbacks: {
      add: onChange,
      remove: onChange,
      blur: onChange,
      edit: onChange,
      invalid: onChange,
      click: onChange,
      focus: onChange,
      "edit:updated": onChange,
      "edit:start": onChange
    }
  }

  return (
    <Tags settings={tagifySettings}
      defaultValue={value}
      className="form-control"
      onChange={onChange}
    />
  );
};

export {EmailListField}