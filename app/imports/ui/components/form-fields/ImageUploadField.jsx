import React from 'react';
import { connectField } from 'uniforms';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import classnames from 'classnames';

/* eslint react/prop-types: 0 */

const ImageUploadField = ({ label, id, disabled, error, required, className, showInlineError, errorMessage }) => {

  registerPlugin(FilePondPluginFileEncode, FilePondPluginImagePreview, FilePondPluginFileValidateSize);

  return (
    <div className={classnames({ disabled, error, required }, className, 'field')}>
      <label htmlFor={id}>{label}</label>
      <FilePond
        id={id}
        allowMultiple={false}
        name="profilePicture"/>
      {!!(error && showInlineError) && <div className="ui red basic pointing label">{errorMessage}</div>}
    </div>
  );
};

export default connectField(ImageUploadField);
