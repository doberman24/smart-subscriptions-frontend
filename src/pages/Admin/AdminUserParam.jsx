import { useState } from 'react';
import styles from './Admin.module.css';
import { groupsParams, valueParams } from '@/constants/adminConstants';
import Dropdown from '@/components/ui/Dropdown/Dropdown';

const AdminUserParam = ({label, selectUserValue, onChangeInput, onChangeDropdown}) => {
  const formatLine = () => {
    if (groupsParams.notChangeFields.includes(label)) {
      return (
        <p className={label === 'login' ? styles.selectValue : ''}>{selectUserValue ? selectUserValue : '- пусто -'}</p>
      )
    }

    if (groupsParams.inputFields.includes(label) || groupsParams.timeFields.includes(label)) {
      let type = 'text';
      let value = selectUserValue
      if (groupsParams.timeFields.includes(label)) {
        type = selectUserValue ? 'date' : 'text';
        value =  selectUserValue ? selectUserValue.split('T')[0] : '';
      }
      return (
        <input 
          name={label} 
          type={type} 
          value={value} 
          onChange={(e) => onChangeInput(e, label)}
          placeholder='- пусто -'
        />
      );
    }

    if (groupsParams.dropdownFields.includes(label)) {
      let param = 'label';
      let list = valueParams.booleanParams;
      let value = valueParams.booleanParams.find(item => item.label === selectUserValue);

      if (label === 'role' || label === 'reminderDaysBefore' || label === 'timeZone' || label === 'preferredHour') {
        param = 'value';
        list = valueParams[label];
        value = valueParams[label].find(item => item[param] === selectUserValue);
      }

      return (
        <div className={styles.dropdownLabel}>
          <Dropdown
            list={list}
            value={value}
            onChange={(item) => onChangeDropdown(item[param], label)}
            placeholder='- пусто -'
          />
        </div>
      )
    }

  }

  // console.log(formatLine());

  return  formatLine();
};

export default AdminUserParam;