import './App.css';
import React, { useState, useEffect } from 'react';
import List from './components/List';
import Details from './components/Details';

export default function App() {
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const json = await fetch(
          'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
        );
        const parsedItems = await json.json();
        setItems(parsedItems);
        setLoading(false)
      } catch (error) {
        console.log(error)        
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  const selected = (id) => {
    const index = items.findIndex((e) => e.id === id);
    setInfo(items[index]);
    setItems((prev) => {
      const newItems = prev.map((e) => {
        e.selected = false;
        return e;
      });
      newItems[index].selected = true;
      return newItems;
    });
  };

  return (
    <React.Fragment>
      {isLoading ? <div style={{fontSize: 25 }}>Loading...</div> : <List items={items} clickHandler={selected} />}
      <Details info={info} />
    </React.Fragment>
  );
}
