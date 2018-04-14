import React from 'react';
import {Column, Row} from 'reactors-flex';
import {Text} from 'reactors';

export const printAppName = (dir) => {
  const [name, base] = dir.split(/\//).reverse();
  return (
    <Row>
      <Text style={{fontStyle: 'italic', color: '#999', fontSize: '95%'}}>{base}/</Text>
      <Text style={{fontWeight: 'bold', fontSize: '120%'}}>{name}</Text>
    </Row>
  );
};
