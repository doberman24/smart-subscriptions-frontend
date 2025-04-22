import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import styles from './Diagramm.module.css';


const Diagramm = ({diagrammData, typeDiagram}) => {

  const COLORS = ['#4f46e5', '#10b981','#f59e0b', '#ef4444', '#6366f1', '#14b8a6', '#e0e3ee'];

  return (
    <PieChart width={430} height={370}>
      <Pie 
        data={diagrammData} 
        dataKey={typeDiagram === 'category' ? 'total' : 'amount'} 
        nameKey={typeDiagram === 'category' ? 'category' : 'title'} 
        cx='50%' 
        cy='50%' 
        outerRadius={120} 
        innerRadius={0}
        padding={5}
        animationDuration={150}
        animationBegin={0}
        margin={{top: 40, right: 50, left: 0, bottom: 20}}
      >
        {diagrammData.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={COLORS[index % COLORS.length]} 
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
      </Pie>
      <Tooltip 
        isAnimationActive={false}
        content={(tooltip) => {
          if (tooltip.payload && tooltip.payload[0]) {
            return (
              <div className={styles.tooltip}>
                <h6>{tooltip.payload[0].name}</h6>
                <p>{tooltip.payload[0].value}₽</p>
              </div>
            );
          }
          return null;
        }}
      />
      <Legend layout="horizontal" align="center" verticalAlign="bottom"
        content={({ payload }) => (
          <div className={styles.legendBlock}>
            {payload.map((entry, index) => (
              <div 
                key={`item-${index}`} 
                className={styles.legendItem} 
              >
                <span 
                  className={styles.legendMarker} 
                  style={{backgroundColor: entry.color}}
                />
                  {entry.value}
              </div>
            ))}
          </div>
        )}
        
      />
    </PieChart>
  )
}

export default Diagramm