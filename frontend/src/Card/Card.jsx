import React, { useState ,useRef,useEffect} from "react";
import Chart from "./Chartd3"
import 'react-circular-progressbar/dist/styles.css';
import "./Card.css";
import {FaLongArrowAltUp, FaLongArrowAltDown} from 'react-icons/fa'
const Card = (props) => {
  const sorted = Object.keys(props.data).sort().reduce( 
    (obj, key) => {  
      obj[key] = props.data[key];  
      return obj; 
    },  
    {} 
  ); 


  const sortedchart = Object.keys(props.chart).sort().reduce( 
    (obj, key) => {  
      obj[key] = props.chart[key];  
      return obj; 
    },  
    {} 
  );
var arr=[] 
  Object.keys(sortedchart).map((k,i)=>{ 
console.log(sortedchart[k]) 
    if(sortedchart[k][`Q4`]<sortedchart[k][`Q3`]){ 
      arr.push(0) 
    }else{ 
      arr.push(1) 
    } 
  })

{console.log(arr)}

  const [firstUnit, setfirstUnit] = useState([]); 
  const [values, setValues] = useState([]); 
  const OnClick = () => { 
    Object.keys(sorted).map((key, index) => { 
      {console.log(key)}
      firstUnit.push(key); 
      values.push(sorted[key]); 
    }); 
  }; 
  const Close=()=>{
    setfirstUnit([]);
    setValues([]);
  }
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {
        expanded ? (
          <>
          <div className="expanded" >
          <p className="close" onClick={() => { setExpanded(false) ; Close()}}>x</p>
            <Chart values={values} firstUnit={firstUnit} charts={props.chart} setFilter_data={props.setFilter_data} 
             />
            
          </div>
          </>
        ) :
          <div onClick={() => { setExpanded(true) ;OnClick()  }} >
            <div className="boxx" >
            {  Object.keys(sorted).map((key, index) => {
                        return (
                          <div className="keys">
                <p style={{ color: "white", fontWeight: "500", fontSize: "25px" }}>{key}:{props.data[key]}</p>
                { 
                  arr[index]==0?<FaLongArrowAltDown />:<FaLongArrowAltUp style={{color:"white", marginLeft:"20px"}}/> 
                }
                </div>
                );
              })}
            </div>
          </div>
      }
    </>
  );
};

export default Card;