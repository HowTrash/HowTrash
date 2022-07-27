import React, { PureComponent } from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
class TrashChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    
const data = [
  {
    name: '종이', "쓰레기 수" : 20,
  },
  {
    name: '플라스틱', "쓰레기 수" : 10,
  },
  {
    name: '캔', "쓰레기 수" : 5,
  },
  {
    name: '비닐', "쓰레기 수" : 8,
  },
  {
    name: '유리', "쓰레기 수" : 10,
  },
  {
    name: 'Page F', "쓰레기 수" : 15,
  },
  {
    name: 'Page G', "쓰레기 수" : 8,
  },
];
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey= "쓰레기 수" fill="#759F98" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default TrashChart;