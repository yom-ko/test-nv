import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'reactstrap';
import Octicon, { File, FileDirectory } from '@githubprimer/octicons-react';

import { formatBytes } from 'utils/helpers';

export const ResourceItem = ({ item }) => {
  const { name, type, path, size } = item;

  if (type === 'dir') {
    return (
      <ListGroupItem style={{ cursor: 'pointer' }}>
        <Link to={{ pathname: `/${path}`, state: { listingPath: path } }}>
          <Octicon icon={FileDirectory} size="medium" verticalAlign="bottom" />
          {' '}
          <span>{name}</span>
        </Link>
      </ListGroupItem>
    );
  }
  return (
    <ListGroupItem>
      <Octicon icon={File} size="medium" verticalAlign="bottom" />
      {' '}
      <span>{name}</span>
      {' '}
      <span style={{ float: 'right' }}>{size ? formatBytes(size) : ''}</span>
    </ListGroupItem>
  );
};

export default ResourceItem;
