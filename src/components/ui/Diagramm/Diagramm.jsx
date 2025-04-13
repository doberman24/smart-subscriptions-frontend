import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import styles from './Diagramm.module.css';


const Diagramm = ({diagrammData, typeDiagram}) => {

  const COLORS = ['#a1a1f5', '#ff3d85', '#5552e8', '#ff8ab5', '#b5b5cb'];

  return (
    <PieChart width={430} height={380}>
      <Pie 
        data={diagrammData} 
        dataKey={typeDiagram === 'category' ? 'total' : 'amount'} 
        nameKey={typeDiagram === 'category' ? 'category' : 'title'} 
        cx='50%' 
        cy='50%' 
        outerRadius={130} 
        innerRadius={0}
        padding={5}
        animationDuration={150}
        animationBegin={0}
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
        content={(tooltip) => {
          if (tooltip.payload && tooltip.payload[0]) {
            return (
              <div className={styles.tooltip}>
                <p>{tooltip.payload[0].name}</p>
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