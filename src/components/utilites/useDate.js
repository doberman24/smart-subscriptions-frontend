export const useDate = () => {
   
  const getSplitDate = (fullDate) => {
    return {
      nowDate: fullDate.getDate(),
      nowNumMonth: fullDate.getMonth(),
      nowMonth: fullDate.toLocaleString('ru-RU', {month: 'long'}),
      nowYear: fullDate.getFullYear(),
    }
  }

  const getFormatData = (sortSubscriptions) => {
    return sortSubscriptions.map(data => ({
      ...data, 
      nextPaymentDate: getSplitDate(new Date(data.nextPaymentDate)),
      paidHistory: data.paidHistory.map(paid => ({
        ...paid,
        datePayment: getSplitDate(new Date(paid.datePayment)),
      }))
    }));
  }

  return {getSplitDate, getFormatData}
}