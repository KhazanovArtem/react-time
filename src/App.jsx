import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import moment from 'moment/moment';



function DateTime(props) {
  return (
    <p className="date">{props.date}</p>
  )
}

function withDateTimePretty(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.date = props.date;
    }
    
    formatDate() {
      const curDate = moment() - moment(this.date);
      
      if (curDate < 60 * 60 * 1000) {
        return '12 минут назад';
      } else if (curDate >= 60 * 60 * 1000 && curDate <= 24 * 60 * 60 * 1000) {
        return '5 часов назад';
      } else {
        return moment(this.date).startOf('day').fromNow();
      }
    }
    
    render() {
      return <Comp date={this.formatDate()}/>
    }
  }
}


const DateTimePretty = withDateTimePretty(DateTime);


function Video(props) {
  return (
    <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
  }
  
  function VideoList(props) {
    return props.list.map(item => <Video key={nanoid()} url={item.url} date={item.date} />);
  }
  
  export default function App() {
    const [list, setList] = useState([
      {
        url: 'https://www.youtube.com/embed/NNS5Piu-EII?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2024-05-04 10:24:00'
      },
      {
        url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2024-05-02 10:24:00'
      },
      {
        url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2024-05-04 11:15:00'
      },
      {
        url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2020-01-03 12:10:00'
      },
      {
        url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2022-01-01 16:17:00'
      },
      {
        url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
        date: '2017-12-02 05:24:00'
      },
    ]);

    return (
        <VideoList list={list} />
    );
}