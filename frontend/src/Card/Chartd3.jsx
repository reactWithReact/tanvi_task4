import React, { useState, useEffect, useRef } from "react";
import "./card.css"
import VerticalChart from "./Chart2.jsx";
import {
  select,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
  max,
  easeLinear,
} from "d3";



var StackedData = [
  { 
    quarters: "Q4", 
    s1:0
  }, 
  { 
    quarters: "Q3", 
    s2:0
  }, 
  { 
    quarters: "Q2", 
    s3:0
  }, 
  { 
    quarters: "Q1", 
    s4:0
  }, 
  ];
  let colorOfStackedChart={};

const Chartd3 = ({ values, firstUnit, charts, setFilter_data }) => {

    const [clickBar, setClickBar] = useState(false);
    const [clickedUnit, setClickedUnit] = useState(false);

    const [d, setD] = useState(StackedData);
  const [bars, setbars] = useState([]);


    const data=[{},{},{},{}];
    const colors= ["#F8A820", "#07B071", "#80dfff", "#d2ff4d"]

  const margin = { top: 20, right: 10, bottom: 20, left: 10 };
  const width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


  const svgRef = useRef();
  const extent = [0, max(values)];

  useEffect(() => {
    data.map((d,i)=>{
        d.unit=firstUnit[i];
        d.value=values[i];
        d.color=colors[i];
    })
    
    

    const svg = select(svgRef.current).attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
    const xScale = scaleLinear().domain(extent).range([20, width]);

    const yScale = scaleBand()
      .domain(firstUnit.map((b) => b))
      .range([0,height]);




    const xAxis = axisBottom(xScale);

    svg.select(".x-axis").style("transform", "translateY(370px)").style("font", "16px times").call(xAxis)
    ;

    const yAxis = axisRight(yScale);
    svg.select(".y-axis")
    .style("transform", "translate(20px,10px)")
    .style("font", "16px times").call(yAxis);

    svg.select(".y-axis")
    .selectAll("g")
    .style("display","none")


    var div =select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    ;

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "allbar")
      .append("rect")
      .on("mouseover", function (d, i) {
          console.log(d.toElement.__data__.unit)
        select(this)
             .attr('opacity', "0.65")
             .attr('cursor',"pointer")
             ;
            
             div
               .style("opacity", 1)
               .style("top",`${60+yScale(d.toElement.__data__.unit)}px`)
               
             div.html(d.toElement.__data__.unit+"<br>"+"<div></div>"+d.toElement.__data__.value )
            
             div.select("div")
             .style("background-color",d.toElement.__data__.color)

             
             
    })
    .on("mouseout",function(d){
        select(this)
        .attr('fill', d=>d.color)
        .attr("opacity","1")
        div.transition()
               .duration('200')
            .style("opacity",0)
        ;
       
    })
      .attr("class","bar")
      .transition()
      .ease(easeLinear)
      .duration(500)
      .attr("x",-150)
      .attr("y", b=>yScale(b.unit))
      .attr("width",b=> xScale(b.value)-17)
      .attr("fill", b=>b.color)
      .attr("height","40px")
      .style("transform", "translate(170px,36px)")



      var allbar = svg.selectAll(".allbar");

      var bar= svg.selectAll(".bar")
      
    


      allbar.append("text")
        .attr("class", "label")
        .text(function(d) { return d.unit; })
        .attr("x",40)
        .attr("y", b=>yScale(b.unit))
        .style("transform", "translateY(65px)")
        .style("font", "20px times")
        .style("font-weight","900")

        allbar.append("line")
        .attr("class","line").
        style("stroke", "white")
        .style("stroke-width", 1)
        .attr("x1", 20)
        .attr("y1",(b,i)=> height/4*i+10)
        .attr("x2",width)
        .attr("y2",(b,i)=> height/4*i+10)
        
        
        bar.on("click",
        function (d,i){
            select(this)

           
            const index = bars.indexOf(
                d.target.__data__.unit
              );
              setFilter_data( d.target.__data__.unit)
            
            setClickedUnit(!clickedUnit);


            var array = [];

            // Object.keys(charts).map((key, index) => {
            //     if (
            //       key == d.target.__data__.unit
            //     ) {
                 
            //       Object.keys(charts[key]).map((k, i) => {
            //         array.push(charts[key][k]);
            //       });
            //     }
            //   });
              

              if (index > -1) {
                bars.splice(index, 1);

                StackedData = [
                  { 
                    quarters: "Q4", 
                    s1:0
                  }, 
                  { 
                    quarters: "Q3", 
                    s2:0
                  }, 
                  { 
                    quarters: "Q2", 
                    s3:0
                  }, 
                  { 
                    quarters: "Q1", 
                    s4:0
                  }, 
                ];
                setD(StackedData);
              } else {
                bars.push(
                    d.target.__data__.unit
                );
              }
              StackedData.map((d, i) => { 
                d[`s${i+1}`]=0 
              })

              if (bars.length > 0) {
                setClickBar(true);
                
                bars.map((unit, j) => {
                  
            Object.keys(charts).map((key, index) => {
              if (
                key == unit
              ) {
               
                Object.keys(charts[key]).map((k, i) => {
                  array.push(charts[key][k]);
                });
              }
            });

                  StackedData.map((d, i) => {
                    if(unit=="Corporate"){
                      colorOfStackedChart[`q${j+1}`]="#F8A820"
                    }else if(unit=="Manufacturing"){
                      colorOfStackedChart[`q${j+1}`]="#07B071"
                    }else if(unit=="Research & Development"){
                      colorOfStackedChart[`q${j+1}`]="#80dfff"
                    }else{
                      colorOfStackedChart[`q${j+1}`]="#d2ff4d"
                    }
                    d[`q${j+1}`]= array[i]
                    d[`s${i+1}`]+= array[i]

                    
                  });
                  array=[]
                });

               {console.log(data)}
              } else {
                StackedData = [
                  { 
                    quarters: "Q4", 
                    s1:0
                  }, 
                  { 
                    quarters: "Q3", 
                    s2:0
                  }, 
                  { 
                    quarters: "Q2", 
                    s3:0
                  }, 
                  { 
                    quarters: "Q1", 
                    s4:0
                  }, 
                ];
                setD(StackedData);
                setFilter_data("")
                setClickBar(false);
              }
        })  
  }, [values]);

  return (
    <>
      <svg ref={svgRef}
        
        style={{
          height: "25.5rem",
          color: "white",
          backgroundColor:"black",
          
        }}
      >
       
        <g className="x-axis" />
        <g className="y-axis" />
       
      </svg>

      {clickBar && (
        <VerticalChart
          clickedUnit={clickedUnit}
          chart={charts}
          keys={["q1", "q2", "q3", "q4"]}
          colors={colorOfStackedChart}
          data={d}
          bars={bars}
        />
      )}
    </>
  );
};

export default Chartd3;
