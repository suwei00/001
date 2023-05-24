import { reactive } from "vue";

export function useTimeSelect(typeName: 'ty', nameValue = '1') {

  let nameValueCp = nameValue;
  let start_time = '';
  let end_time = '';
  const timeArr = nameValueCp.split('-');
  // console.error('timeArr', timeArr)
  if (timeArr.length === 2) {
    // nameValueCp = 'custom';
    start_time = timeArr[0];
    end_time = timeArr[1];
  }

  const timeForm = reactive({
    [typeName]: nameValueCp,
    start_time,
    end_time
  });

  let _obj: any = {};
  const timeChange = (obj: any) => {
    _obj = { ...obj };
    if (_obj.type === '') {
      timeForm['start_time'] = _obj.start_time;
      timeForm['end_time'] = _obj.end_time;
    } else {
      timeForm['start_time'] = '';
      timeForm['end_time'] = '';
    }
  }

  const rightBtnClick = () => {
    if (_obj.type !== '') {
      timeForm[typeName] = _obj.type || timeForm[typeName];
    } else {
      timeForm[typeName] = `${timeForm.start_time}-${timeForm.end_time}`;
    }

    // console.error('timeForm', timeForm)
  }

  return {
    timeForm,
    timeChange,
    rightBtnClick
  }
}