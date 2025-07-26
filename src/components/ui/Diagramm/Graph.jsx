import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styles from './Diagramm.module.css'

const Graph = ({spendingOverTime}) => {

  const formatSpending = spendingOverTime.map(item => ({
    ...item,
    date: new Date(item.datePayment).toLocaleDateString('RU-ru',{
      day: 'numeric',
      month: 'short',
    })
  }));

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={formatSpending} margin={{top: 40, right: 50, left: 0, bottom: 20}}>
        <XAxis 
          dataKey='date' 
          tick={{fill: '#9ca3af', fontSize: '12px', fontFamily: 'Inter'}}
          axisLine={{stroke: '#e5e7eb', strokeWidth: '1px'}}
          tickLine={{stroke: '#e5e7eb', strokeWidth: '1px'}}
        />
        <YAxis 
          tick={{fill: '#9ca3af', fontSize: '12px', fontFamily: 'Inter'}}
          axisLine={{stroke: '#e5e7eb', strokeWidth: '1px'}}
          tickLine={{stroke: '#e5e7eb', strokeWidth: '1px'}}
        />
        <CartesianGrid stroke='#f3f4f6' vertical={false} />
        <Tooltip
          isAnimationActive={false}
          content={({active, payload, label}) => {
            if (active && payload?.length) {
              return (
                <div className={styles.tooltip}>
                  <h6>{label}</h6>
                  <p>{payload[0].value}₽</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line 
          type='monotone' 
          dataKey='amountPayment' 
          stroke='#4f46e5'
          strokeLinecap='round' 
          strokeWidth={2}
          dot={{r: 6, stroke: 'none', fill: '#4f46e5'}}
          activeDot={{r: 7, stroke: 'none', fill: '#4f46e5'}}
          animationDuration={150}
        />
      </LineChart>
    </ResponsiveContainer>
  )
};

export default Graph;