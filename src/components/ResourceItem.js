import React from 'react';
import { ListGroupItem } from 'reactstrap';
import Octicon, { File, FileDirectory } from '@githubprimer/octicons-react';

import { formatBytes } from 'utils/helpers';

export const ResourceItem = ({ item, handleItemClick }) => {
  const { name, type, size } = item;

  if (type === 'dir') {
    return (
      <ListGroupItem style={{ cursor: 'pointer' }} onClick={handleItemClick}>
        <Octicon icon={FileDirectory} size="medium" verticalAlign="bottom" />
        {' '}
        <span>{name}</span>
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
