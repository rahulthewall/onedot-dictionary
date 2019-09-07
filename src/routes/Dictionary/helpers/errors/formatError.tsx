import React from 'react';
import { Tag } from 'antd';

const formatError = (error: string) => {
  switch (error) {
    case 'none':
      return (
        <Tag color="green">
          <span>{error}</span>
        </Tag>
      );
    case 'duplicates':
      return (
        <Tag color="orange">
          <span>{error}</span>
        </Tag>
      );
    case 'forks':
    case 'cycles':
    case 'chains':
      return (
        <Tag color="red">
          <span>{error}</span>
        </Tag>
      );
    case 'default':
      return null;
  }
};

export { formatError };
