import React from 'react';
import {  Spin } from 'antd';

export const Loader: React.FC = () => (
<div className="flex items-center justify-center h-screen w-screen">
  <Spin size="large" />
</div>
);

