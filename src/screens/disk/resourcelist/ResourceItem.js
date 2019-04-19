import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'reactstrap';
import Octicon, { File, FileDirectory } from '@githubprimer/octicons-react';
import PropTypes from 'prop-types';

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

ResourceItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number
  }).isRequired
};

export default ResourceItem;
