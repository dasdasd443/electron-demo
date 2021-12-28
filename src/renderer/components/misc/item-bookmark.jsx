import React from 'react';

// eslint-disable-next-line react/prop-types
const ItemBookMark = ({ bgColor, size, right, top }) => {
  return (
    <p
      style={{
        width: 0,
        height: 0,
        borderTop: `${size}px solid transparent`,
        borderBottom: `${size}px solid transparent`,
        transform: 'rotateZ(-45deg)',
        borderLeft: `${size}px solid ${bgColor}`,
        position: 'absolute',
        right: `${right}px`,
        top: `${top}px`,
      }}
    />
  );
};

export default ItemBookMark;
