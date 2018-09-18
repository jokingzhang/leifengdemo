'use strict';

import React, { Component } from 'react';
import { Card } from 'antd';
import girlImage from './images/girl.jpg';

const { Meta } = Card;

export default () => (
    <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="girl" src={girlImage} />}
    >
        <Meta
            title="Europe Street beat"
            description="www.instagram.com"
        />
    </Card>
);