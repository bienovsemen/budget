import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Area,
  AreaChart,
  Cell
} from 'recharts'
import Spinner from '../spinner'

import './charts.css'

const CategoriesInfoTable = ({ categories, categoryChoosed }) => {
  let data1 = []
  categories.forEach(o => {
    const { title, categoryTotal } = o
    data1.push({ title, categoryTotal })
  })

  // chart2
  let data2 = []
  let data3 = []
  categories.forEach(o => {
    for (let index = 0; index < o.items.length; index++) {
      if (o.items[index].type === 'inc') {
        data2.push({ name: o.title, value: o.categoryTotal })
      } else {
        data3.push({ name: o.title, value: o.categoryTotal })
      }
    }
  })
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  const piechart = data => (
    <PieChart width={300} height={300}>
      <Pie data={data} cx={150} cy={150} fill="#8884d8" dataKey="value">
        {data2.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
  // chart all categories
  const renderBarChart = (
    <BarChart width={600} height={300} data={data1}>
      <XAxis dataKey="title" stroke="#8884d8" />
      <YAxis />
      <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar
        type="monotone"
        dataKey="categoryTotal"
        fill="#8884d8"
        barSize={30}
      />
    </BarChart>
  )
  // chart single category
  let data0 = []
  categories.forEach(o => {
    if (o.id === categoryChoosed) {
      o.items.forEach(o => {
        data0.push({
          name: o.title,
          uv: o.amount,
          pv: o.amount + 1000,
          amt: o.amount - 700
        })
      })
    }
  })

  const areachart = (
    <AreaChart
      width={600}
      height={400}
      data={data0}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        dataKey="pv"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
      <Area
        type="monotone"
        dataKey="amt"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
    </AreaChart>
  )

  return (
    <div className="categories-info-table">
      {categories ? (
        <div>
          <div className="chart-item">
            <h4 className="chart-title">Single category</h4>
            {areachart}
          </div>
          <div className="chart-item">
            <Row>
              <Col span={12}>
                <h4 className="chart-title">Incomes</h4>
                {piechart(data2)}
              </Col>
              <Col span={12}>
                <h4 className="chart-title">Expenses</h4>
                {piechart(data3)}
              </Col>
            </Row>
          </div>
          <div className="chart-item">
            <h4 className="chart-title">All categories</h4>
            {renderBarChart}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

const mapStateToProps = ({
  categoriesList: { categories, categoryChoosed }
}) => {
  return {
    categories,
    categoryChoosed
  }
}

export default connect(mapStateToProps)(CategoriesInfoTable)
