import { FaAngleDown } from "react-icons/fa6"
import styles from './Dropdown.module.css'
import { useEffect, useRef, useState } from "react";

const Dropdown = ({categoryList}) => {
  const [category, setCategory] = useState(['Все']);
  const [showList, setShowList] = useState(false);
  const dropdownElement = useRef(null);
  
  const handleChange = (e) => {
    setCategory(e.target.value);
  }

  const selectCategory = (item) => {
    setCategory(item);
    setShowList(false);
  }


  useEffect(() => {
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
        style={{borderColor: showList && '#ff3d85', boxShadow: showList && '0 4px 8px #ff3d854d'}} 
        onFocus={() => setShowList(true)}
      >
        <input type="text" value={category} onChange={handleChange} />
        <FaAngleDown style={{cursor: 'pointer'}} onClick={() => setShowList(true)} />
      </div>
      <ul className={`${styles.dropdownList} ${showList ? styles.showList : ''}`}>
        {categoryList.map((item, index) => (
          <li key={index} onClick={() => selectCategory(item)}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown