//import './ViewMeasures.css';
import React,
{
  useEffect,
  useState
} from 'react';
import Measure from './Measure';
import axios from 'axios';

const ViewMeasures = (props) => {

  const [measures, setMeasures] = useState([]);
  useEffect(() => {
    axios.get('/api/vote/view-measures')
      .then((response) => {
        console.log("Printing out information: " + response.data[0].name);
        let currentMeasures = [];
        for (let i = response.data.length - 1; i >= 0; --i) {
          currentMeasures.push(response.data[i]);
        }
        setMeasures(currentMeasures);
      });
  }, []);

  return (
    <div className="viewMeasures">
      <div className="measures">
        {measures.map((measure, i) => {
          return <Measure
            {...props}
            key={i}
            userId={props.userId}
            data={measure}
            title={measure.name}
            desc={measure.description}
            yeses={measure.votes.yes}
            nos={measure.votes.no}
          />
        })}
      </div>
    </div>
  )
}

export default ViewMeasures;