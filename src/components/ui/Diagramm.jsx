import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";


const Diagramm = ({diagrammData}) => {

  const COLORS = ['#a1a1f5', '#ff3d85', '#5552e8', '#ff8ab5', '#b5b5cb'];

  return (
    <PieChart width={400} height={420}>
      <Pie 
        data={diagrammData} 
        dataKey='amount' 
        nameKey='title' 
        cx='50%' 
        cy='50%' 
        outerRadius={150} 
      >
        {diagrammData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="vertical" align="center" verticalAlign="bottom"
        wrapperStyle={{
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      />
    </PieChart>
  )
}

export default Diagramm