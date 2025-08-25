import { Cell, Legend, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";
import styles from './Diagramm.module.css';
import { categoryOptions, activeOptions } from "@/constants/options";

const Diagramm = ({diagrammData, typeDiagram}) => {
    
  
  const stringColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };
    
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie 
          data={diagrammData} 
          dataKey='amount' 
          nameKey='category' 
          cx='50%' 
          cy='50%' 
          outerRadius="100%" 
          innerRadius={0}
          padding={5}
          animationDuration={150}
          animationBegin={0}
          margin={{top: 40, right: 50, left: 0, bottom: 20}}
        >
          {diagrammData.map((entry, index) => {
            // const element = typeDiagram === 'category' ? categoryOptions.find(item => item.label === entry.category) : activeOptions.find(item => item.label === entry.category);
            return (
            <Cell 
              key={`cell-${index}`} 
              fill={stringColor(entry.category)} 
              stroke="#fff"
              strokeWidth={2}
            />
          )})}
        </Pie>
        <Tooltip 
          isAnimationActive={false}
          content={(tooltip) => {
            if (tooltip.payload && tooltip.payload[0]) {
            const category = (
              categoryOptions.find(item => item.label === tooltip.payload[0].name) || 
              activeOptions.find(item => item.label === tooltip.payload[0].name)
            );
              return (
                <div className={styles.tooltip}>
                  <h6>{category?.value || tooltip.payload[0].name}</h6>
                  <p>{`${tooltip.payload[0].value} ${typeDiagram === 'category' ? '₽' : ''}`}</p>
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
                    style={{backgroundColor: stringColor(entry.value)}}
                  />
                  <span
                    className={styles.legendTitle}
                  >
                    {(
                      categoryOptions.find(item => item.label === entry.value)?.value || 
                      activeOptions.find(item => item.label === entry.value)?.value ||
                      entry.value 
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
          
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Diagramm