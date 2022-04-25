import React from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import classnames from 'classnames';

/* eslint react/prop-types: 0 */

const ImageUploadField = ({ label, id, disabled, error, required, className, showInlineError, errorMessage, name, onChange, value, ...props }) => {

  // Register plugins used to encode, preview, as well as check file size/type
  registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
  );

  return (
    <div className={classnames({ disabled, error, required }, className, 'field')} {...filterDOMProps(props)}>
      <label htmlFor={id}>{label}</label>
      <FilePond
        id={id}
        name={name}
        allowMultiple={false}
        allowFileEncode={true}
        allowReplace={true}
        allowFileSizeValidation={true}
        maxFileSize="2MB"
        acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
        labelIdle='<span class="filepond--label-action">Browse</span> or Drag & Drop an image'
        onupdatefiles={(file) => {
          onChange(file[0].getFileEncodeBase64String());
        }}
      />
      {!!(error && showInlineError) && <div className="ui red basic pointing label">{errorMessage}</div>}
    </div>
  );
};

export default connectField(ImageUploadField);
