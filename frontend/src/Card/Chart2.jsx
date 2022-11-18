import React from "react"; 
import { useEffect , useRef , useState} from "react"; 
import { 
  select, 
  axisBottom, 
  axisRight, 
  scaleLinear, 
  scaleBand, 
  stack, 
  max, 
  selectAll,
  stackOrderAscending, 
} from "d3"; 
 
const VerticalChart = ({ unit_click, chart, data, keys, colors, bars }) => { 
  const [quarters, setQuarters] = useState({}); 
 
  const wrapperRef = useRef(); 
  const svgRef = useRef(); 
 
  useEffect(() => { 
    Object.keys(chart).map((key, index) => { 
      if (key == unit_click) { 
        setQuarters(chart[key]); 
      }   
    }); 
 
    const svg = select(svgRef.current); 
 
    const stackGenerator = stack().keys(keys).order(stackOrderAscending); 
    const layers = stackGenerator(data); 
    const extent = [ 
      0, 
      max(layers, (layer) => max(layer, (sequence) => sequence[1]+6)), 
    ]; 
 
     
    const xScale = scaleBand() 
      .domain(data.map((d) => d.quarters)) 
      .range([0, 320]) 
      .padding(0.5); 
 
    const yScale = scaleLinear().domain(extent).range([350, 0]); 
 
    
    svg 
      .selectAll(".layer") 
      .data(layers) 
      .join("g") 
      .attr("class", "layer") 
      .attr("fill", (layer) => colors[layer.key]) 
      .selectAll("rect") 
      .attr("width", "25") 
      .data((layer) => layer) 
      .join("rect") 
      .attr("x", (sequence) => xScale(sequence.data.quarters)) 
      .attr("width", xScale.bandwidth()) 
      .attr("y", (sequence) => yScale(sequence[1])) 
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1])); 
 
      const barnumber = selectAll(".layer") 
 
      barnumber.selectAll(".label").remove() 
      barnumber 
     .data(data) 
     .append("text") 
     .attr("class", "label") 
     .text(function(i,k) { return i[`s${k+1}`] 
    }) 
    .attr("dx", "0.3em") 
    .attr("x",data=>xScale(data.quarters)) 
    .attr("y", (data,k) => yScale(1+data[`s${k+1}`])) 
    .style("font", "20px times") 
    .style("font-weight","900") 
    .attr("fill", "white")

    
    const xAxis = axisBottom(xScale); 
    svg.select(".x-axis").attr("transform", `translate(0, 350)`) .style("font", "14px times").attr("font-weight", "900").call(xAxis); 
 
    const yAxis = axisRight(yScale); 
    svg.select(".y-axis").call(yAxis); 
  }, [colors, data, keys, bars, unit_click]); 
 
  return ( 
    <React.Fragment> 
      <div ref={wrapperRef} style={{ marginLeft: "2rem" }}> 
        <svg 
          ref={svgRef} 
          style={{ 
            height: "28rem", 
            color: "white", 
            paddingTop:"2.2rem", 
            backgroundColor: "black", 
            paddingInline:"1rem" 
          }} 
        > 
          <g className="x-axis" /> 
          <g className="y-axis" /> 
        </svg> 
      </div> 
    </React.Fragment> 
  ); 
}; 
 
export default VerticalChart;

