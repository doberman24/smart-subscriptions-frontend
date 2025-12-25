import { FaAngleDown } from "react-icons/fa6"
import styles from './Dropdown.module.css'
import { useEffect, useMemo, useRef, useState } from "react";

const DropdownNew = ({list, value = {}, onChange, addDefault = false, placeholder = ''}) => {
  const [showList, setShowList] = useState(false);
  const [inputData, setInputData] = useState(value.value || '');
  const dropdownElement = useRef(null);

  const dataList = useMemo(() => {
    return [...list];
  }, [list]); 

  useEffect(() => {
    if (value.value !== undefined) setInputData(value.value || '');
  }, [value])

  const selectItem = (item) => {
    setInputData(item.value);
    setShowList(false);
    onChange?.(item);
  }

  useEffect(() => {
    const handleClickOut = (e) => {
      if (dropdownElement.current && !dropdownElement.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener('click', handleClickOut);
    return () => document.removeEventListener('click', handleClickOut);
  }, [list, value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' || e.key === 'Escape') {
      setShowList(false);
    }
  }

  return (
    <div className={styles.dropdownBlock} ref={dropdownElement}>
      <div className={styles.inputDropdown} 
        style={{borderColor: showList && '#6366f1', boxShadow: showList && '0 0 0 3px rgba(99, 102, 241, 0.2)'}} 
        onFocus={() => setShowList(true)}
        onKeyDown={handleKeyDown}
      >
        <input 
          type="text" 
          value={inputData} 
          placeholder={placeholder}
          onFocus={() => setShowList(true)}
          onKeyDown={handleKeyDown}
          onClick={() => setShowList(true)}
          readOnly
        />
        <FaAngleDown 
          tabIndex={-1} 
          style={{cursor: 'pointer', outline: 'none'}}
          onMouseDown={() => setShowList(value => !value)} 
          onKeyDown={handleKeyDown} 
        />
      </div>
      <ul className={`${styles.dropdownList} ${showList ? styles.showList : ''}`}>
        {dataList.map((item, index) => (
          <li key={index} onClick={() => selectItem(item)}>{item.value}</li>
        ))}
      </ul>
    </div>
  )
}

export default DropdownNew;