import React from 'react';
import { ListGroup } from 'reactstrap';

import ResourceItem from 'components/ResourceItem';

export const ResourceList = ({ items, handleItemClick }) => {
  const listItems = items.map(item => {
    const { name, path } = item;

    return <ResourceItem item={item} key={name} handleItemClick={() => handleItemClick(path)} />;
  });

  return <ListGroup>{listItems}</ListGroup>;
};

export default ResourceList;
