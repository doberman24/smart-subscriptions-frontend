import { FaAngleDown } from "react-icons/fa6"
import styles from './Dropdown.module.css'
import { useEffect, useRef, useState } from "react";

const Dropdown = ({list, defaultSelect = '', addDefault = false}) => {
  const [dataList, setDataList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [inputData, setInputData] = useState(defaultSelect);
  const dropdownElement = useRef(null);

  const handleChange = (e) => {
    setInputData(e.target.value);
  }

  const selectItem = (item) => {
    setInputData(item);
    setShowList(false);
  }

  useEffect(() => {
    addDefault ? setDataList([defaultSelect, ...list]) : setDataList([...list]);
    const handleClickOut = (e) => {
      if (dropdownElement.current && !dropdownElement.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener('click', handleClickOut);
    return () => document.removeEventListener('click', handleClickOut);
  }, []);

  return (
    <div className={styles.dropdownBlock} ref={dropdownElement}>
      <div className={styles.inputDropdown} 
        style={{borderColor: showList && '#6366f1', boxShadow: showList && '0 0 0 3px rgba(99, 102, 241, 0.2)'}} 
        onFocus={() => setShowList(true)}
      >
        <input 
          type="text" 
          value={inputData} 
          onChange={handleChange} 
        />
        <FaAngleDown style={{cursor: 'pointer'}} onClick={() => setShowList(value => !value)} />
      </div>
      <ul className={`${styles.dropdownList} ${showList ? styles.showList : ''}`}>
        {dataList.map((item, index) => (
          <li key={index} onClick={() => selectItem(item)}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown