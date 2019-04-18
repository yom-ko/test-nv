import React from 'react';
import { ListGroup } from 'reactstrap';

import ResourceItem from 'screens/disk/resourcelist/ResourceItem';

export const ResourceList = ({ items }) => {
  const listItems = items.map(item => {
    const { name } = item;

    return <ResourceItem item={item} key={name} />;
  });

  return <ListGroup>{listItems}</ListGroup>;
};

export default ResourceList;
