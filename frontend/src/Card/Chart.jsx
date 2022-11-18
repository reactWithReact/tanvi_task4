
import React, { useState, useEffect } from "react"; 
import Chart from "react-apexcharts"; 
import VerticalChart from "./Chart2.jsx"; 
import './card.css'
 
var data = [ 
  { 
    quarters: "Q4", 
  }, 
  { 
    quarters: "Q3", 
  }, 
  { 
    quarters: "Q2", 
  }, 
  { 
    quarters: "Q1", 
  }, 
]; 
 var color={};
const HorizontalChart = (props) => { 
   
  const [bar_click, setbar_click] = useState(false); 
  const [unit_click, setunit_click] = useState(false); 
 
  const [d, setD] = useState(data); 
  const [chartdata, setchartdata] = useState([]); 
 
  return ( 
    <div className="flex"> 
      <Chart 
        type="bar" 
        options={{ 
          title: { 
            text:"Business Unit", 
            align:'center',
            offsetY:20,
            floating:false,
            style:{ 
            color:'white', 
           fontWeight:'200'
            }, 
          }, 
          tooltip: {
            enabled: true,
            style:{
            color:'black'
            }
          },
          theme: { mode: "dark" }, 
 
          chart: { 
            background: 'black',
            id: "apexchart-example", 
            events: { 
              click(event, chartContext, config) { 
                const index = chartdata.indexOf( 
                  config.config.xaxis.categories[config.dataPointIndex] 
                ); 
                props.setFilter_data(config.config.xaxis.categories[config.dataPointIndex] );
                {console.log( config.config.xaxis.categories[config.dataPointIndex])}
                setunit_click(!unit_click); 
 
                var array = []; 
 
                Object.keys(props.chart).map((key, index) => { 
                  if ( 
                    key == config.config.xaxis.categories[config.dataPointIndex] 
                  ) { 
                   { console.log(props.chart[key]) }
                    Object.keys(props.chart[key]).map((k, i) => { 
                      array.push(props.chart[key][k]); 
                    }); 
                  } 
                }); 
 
                if (index > -1) { 
                  chartdata.splice(index, 1); 
 
                  data = [ 
                    { 
                      quarters: "Q1", 
                    }, 
                    { 
                      quarters: "Q2", 
                    }, 
                    { 
                      quarters: "Q3", 
                    }, 
                    { 
                      quarters: "Q4", 
                    }, 
                  ]; 
                  setD(data); 
                } else { 
                  chartdata.push( 
                    config.config.xaxis.categories[config.dataPointIndex] 
                  ); 
                  console.log(chartdata); 
                } 
 
                if (chartdata.length > 0) { 
                  setbar_click(true); 
                  
                  chartdata.map((unit, j) => { 
                     
                    data.map((d, i) => { 
                      if(unit=="Corporate"){ 
                        color[`q${j+1}`]="#F8A820" 
                      }else if(unit=="Manufacturing"){ 
                        color[`q${j+1}`]="#07B071" 
                      }else if(unit=="Research & Development"){ 
                        color[`q${j+1}`]="#80dfff" 
                      }else{ 
                        color[`q${j+1}`]="#d2ff4d" 
                      } 
                      d[`q${j+1}`]= array[i] 
 
                       
                    }); 
                     
                  });
 
                } else { 
                  data = [ 
                    { 
                      quarters: "Q1", 
                    }, 
                    { 
                      quarters: "Q2", 
                    }, 
                    { 
                      quarters: "Q3", 
                    }, 
                    { 
                      quarters: "Q4", 
                    }, 
                  ]; 
                  setD(data); 
                  setbar_click(false); 
                  props.setFilter_data("")
                } 
              }, 
            }, 
          }, 
          colors: ["#F8A820", "#07B071", "#80dfff", "#d2ff4d"], 
          plotOptions: { 
            bar: { 
              distributed: true, 
              horizontal: true, 
              barHeight: "45%", 
              dataLabels: { 
                position: "bottom", 
              }, 
            }, 
          },
offsetX: 0, 
          dropShadow: { 
            enabled: true, 
          }, 
          dataLabels: { 
            enabled: true, 
            textAnchor: 'start', 
            style: { 
              colors: ['#fff'] 
            } 
        }, 
          xaxis: { 
            categories: props.firstUnit ,
            labels: { 
            style:{
              colors: ['grey'] 
            } 
            }
          }, 
          yaxis: { 
            ticks: {
              font: {
                  size: 10,
                  family:'vazir'
              }
          },
            labels: { 
              show: true 
            ,
            style:{
              scaleFontSize:5,
              colors: ['grey'] 
            } 
            }
          }, 
          states: { 
            normal: { 
              filter: { 
                type: "desaturate", 
              }, 
            }, 
            active: { 
              allowMultipleDataPointsSelection: true, 
              filter: { 
                type: "darken", 
                value: 1, 
              }, 
            }, 
          }, 
 
          legend: { 
            show: false, 
          }, 
        }} 
        series={[ 
          { 
            name: "", 
            data: props.values, 
          }, 
        ]} 
        width={450} 
        height={447} 
      /> 
 
      {bar_click && ( 
        <VerticalChart 
          unit_click={unit_click} 
          chart={props.chart} 
          keys={["q1", "q2", "q3", "q4"]} 
          colors={color} 
          data={d} 
          chartdata={chartdata} 
        /> 
      )} 
    </div> 
  ); 
}; 
 
export default HorizontalChart;

