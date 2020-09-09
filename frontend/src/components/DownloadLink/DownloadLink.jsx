import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import download from 'downloadjs';
import { AuthContext } from '../../contexts/AuthContext';

const DownloadLink = ({ url, filename }) => {
  const { authContext } = useContext(AuthContext);

  const downloadFile = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': authContext.token
      }
    })
      .then(res => res.blob())
      .then(blob => {
        download(blob, filename);
      })
      .catch((e) => console.log(e));
  }

  return (
    <Link to="#" onClick={() => downloadFile()}>{filename}</Link>
  )
}

export default DownloadLink;