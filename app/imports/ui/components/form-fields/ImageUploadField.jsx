import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import classnames from 'classnames';

/* eslint react/prop-types: 0 */

const ImageUploadField = ({ label, id, disabled, error, required, className, showInlineError, errorMessage, name, value, ...props }) => {

  registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
  );

  /* const [files, setFiles] = useState([]); */

  // const processUpload = (files) => {
  //   const aFile = files[0];
  //   const someValue = aFile.getFileEncodeBase64String();
  //   console.log(someValue);
  //   return aFile;
  // };

  return (
    <div className={classnames({ disabled, error, required }, className, 'field')} {...filterDOMProps(props)}>
      <label htmlFor={id}>{label}</label>
      <FilePond
        id={id}
        files={[]}
        name={name}
        allowMultiple={false}
        onupdatefiles={file => {
          // eslint-disable-next-line no-param-reassign
          value = file[0].getFileEncodeBase64String();
          console.log(value);
        }}
        allowFileEncode={true}
        value={value}
      />
      {!!(error && showInlineError) && <div className="ui red basic pointing label">{errorMessage}</div>}
    </div>
  );
};

export default connectField(ImageUploadField);
