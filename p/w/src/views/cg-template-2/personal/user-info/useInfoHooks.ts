import { ref, reactive, computed } from 'vue';
import { floor } from 'lodash';
// import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRequest } from 'vue-request';
import { useCountDown } from '@vant/use';
import { isEmail } from '@/utils/validate';
import Toast from '@/components/cg-template-2/toast';
import { useLoading } from '@/hooks/useLoading';
// import { useDebounceFn } from '@vueuse/core';


import { userInfoStateStore } from '@/store-pinia/userInfo';

import { memberZalo, mailOnline, setBildEmail, getRebateScale, getPhoneCode, setBindPhone } from '@/http/blue-apis';

import { useOption } from '@/hooks/useOption';

// const router = useRouter();

const useIn8 = require(`@/language/${globalConfig.LANG}`);

const userInfoStore = userInfoStateStore();
const { userInfo } = storeToRefs(userInfoStore);

export const useShowCountdown = (ctime: number) => {
  const countDown = useCountDown({
    time: ctime,
    onFinish: () => {
      counting.value = false;
      countDown.reset();
    }
  });

  const counting = ref(false);
  const allseconds = computed(() => Math.floor(countDown.current.value.total / 1000));
  const start = () => {
    countDown.start();
    counting.value = true;
  };

  return {
    startCount: start,
    allseconds,
    counting
  };
};

// zalo
export const useZalo = () => {
  const zalo = ref('');
  const inputref = ref<any>(null);
  const isValid = ref(false);

  const valid = () => {
    if (inputref && inputref.value) {
      isValid.value = inputref.value.validate();
    }
  };

  const updateZalo = async () => {
    const res = await memberZalo({ zalo: zalo.value });
    // Toast('Cài Đặt Thành Công');
    userInfoStore.getUserInfo();
    Toast('Liên Kết Thành Công');
    return true;
  };

  return {
    inputref,
    zalo,
    valid,
    isValid,
    updateZalo
  };
};

// email
export const useEmail = () => {

  const isEmailValid = ref(false);
  const isCodeValid = ref(false);
  const checkEmail = (rule: any, value: any, callback: any) => {
    const v = /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
    isEmailValid.value = v;
    if (!v) {
      callback(new Error('Vui lòng nhập chính xác địa chỉ Email'));
    } else {
      callback();
    }
  };

  const checkCode = (rule: any, value: any, callback: any) => {
    const v = /^\d{4}$/.test(value);
    isCodeValid.value = v;
    if (!v) {
      callback(new Error('Vui lòng nhập 4 số mã xác nhận'));
    } else {
      callback();
    }
  }

  const { formref, formdata, rules, validForm, resetForm } = useForm([
    {
      key: 'email',
      label: 'Tài Khoản Email',
      value: '',
      rule: [
        // {
        //   required: true,
        //   trigger: 'blur',
        //   message: 'Vui lòng nhập tài khoản Email của bạn'
        // },
        {
          // pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          validator: checkEmail,
          trigger: 'change'
        }
      ]
    },
    {
      key: 'code',
      label: 'Mã Xác Nhận Từ Email',
      value: '',
      rule: [
        // {
        //   required: true,
        //   trigger: 'blur',
        //   message: 'Vui lòng nhập mã xác nhận'
        // }
        {
          pattern: /^\d{4}$/,
          validator: checkCode,
          trigger: 'change'
        }
      ]
    }
  ]);

  const { startLoading, closeLoading } = useLoading();

  const { allseconds, counting, startCount } = useShowCountdown(200 * 1000);

  const params = computed(() => {
    return {
      mail: formdata.email,
      ty: userInfo.value.email ? '2' : '1'
    };
  });

  const { loading, run, data } = useRequest(() => mailOnline(params.value), {
    manual: true,
    onSuccess: (res: any) => {
      closeLoading();
      startCount();
      Toast('Gửi Mã Xác Minh Thành Công');
    },
    onError: () => {
      closeLoading();
    },
    onAfter() { closeLoading(); }
  });
  const emailBackSid = computed(() => data); // 绑定邮箱发送成功返回id

  const submitParams = computed(() => ({
    email: formdata.email,
    code: formdata.code
  }));

  const submitForm = async () => {
    if (isEmail(formdata.email || '') && validForm()) {
      let sid: any = '';
      let ts: any = '';
      // console.log('00000000', emailBackSid, emailBackSid.value, emailBackSid.value.value)
      if (emailBackSid.value.value != '0' && emailBackSid.value.value) {
        sid = emailBackSid.value.value.split(':')[0];
        ts = emailBackSid.value.value.split(':')[1];
      } else {
        Toast('Vui Lòng Lấy Mã Xác Minh Trước');
        return;
      }
      if (!counting.value) {
        Toast('Vui Lòng Lấy Mã Xác Minh Trước');
        return;
      }
      await setBildEmail({
        ...submitParams.value,
        sid,
        ts
      })
      userInfoStore.getUserInfo();
      Toast('Liên Kết Thành Công');
      return true;
    }
    return false;
  };

  const getEmailCode = () => {
    formref.value &&
      formref.value.validateField('email', (msg: any) => {
        if (msg === null || msg === undefined || msg === '') {
          if (loading.value) return;
          startLoading();
          run();
        }
      });
  };

  return {
    formref,
    formdata,
    rules,
    submitForm,
    getEmailCode,
    loading,
    allseconds,
    counting,
    isEmailValid,
    isCodeValid,
  };
};

// login password

// adress

// 选择生日

// 获取会员最高返水
export const useMemRebate = () => {
  const refundRatesData = reactive(useOption('refundRates', 'key').option.value);
  const commissionRatesData = reactive(useOption('commissionRates', 'key').option.value);

  const { run } = useRequest(getRebateScale, {
    onSuccess: (res: any) => {
      if (res) {
        refundRatesData.forEach(item => {
          if (item.key) {
            item.value = res[item.key] + '%'; //  floor(Number(res[item.key]), 2).toFixed(1) + '%';
          } else {
            item.value = '%';
          }
        });
        commissionRatesData.forEach(item => {
          if (item.key) {
            item.value = res[item.key]; // floor(Number(res[item.key]), 2).toFixed(2);
          } else {
            item.value = '';
          }
        });
      }
    }
  });

  return { refundRatesData, commissionRatesData };
};

// phone
export const useEditPhone = () => {

  const isPhoneValid = ref(false);
  const isCodeValid = ref(false);
  const checkPhone = (rule: any, value: any, callback: any) => {
    const v = /^(?!0)\d{9}$/.test(value);
    isPhoneValid.value = v;
    if (!v) {
      callback(new Error('Vui Lòng Nhập 9 Chữ Số, Không Bắt Đầu Bằng Số 0'));
    } else {
      callback();
    }
  };

  const checkCode = (rule: any, value: any, callback: any) => {
    const v = /^\d{4}$/.test(value);
    isCodeValid.value = v;
    if (!v) {
      callback(new Error('Vui lòng nhập 4 số mã xác nhận'));
    } else {
      callback();
    }
  }

  const { formref, formdata, rules, validForm, resetForm } = useForm([
    {
      key: 'phone',
      label: 'Số Điện Thoại',
      value: '',
      rule: [
        // {
        //   required: true,
        //   trigger: 'blur',
        //   message: 'Vui lòng nhập tài khoản Email của bạn'
        // },
        {
          // pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          validator: checkPhone,
          trigger: 'change'
        }
      ]
    },
    {
      key: 'code',
      label: 'Mã Xác Nhận Từ Email',
      value: '',
      rule: [
        // {
        //   required: true,
        //   trigger: 'blur',
        //   message: 'Vui lòng nhập mã xác nhận'
        // }
        {
          pattern: /^\d{4}$/,
          validator: checkCode,
          trigger: 'change'
        }
      ]
    }
  ]);

  const { startLoading, closeLoading } = useLoading();

  const { allseconds, counting, startCount } = useShowCountdown(300 * 1000);

  const params = computed(() => {
    return {
      tel: '0' + formdata.phone,
      ty: 5,
      flag: 'text'
    };
  });

  const phoneBackSid = ref('');
  const { loading, run, data } = useRequest(() => getPhoneCode(params.value), {
    manual: true,
    onSuccess: (res: any) => {
      phoneBackSid.value = res;
      closeLoading();
      Toast('Gửi Mã Xác Minh Thành Công');
      startCount();
    },
    onError: () => {
      closeLoading();
    },
    onAfter() { closeLoading(); }
  });

  const submitParams = computed(() => ({
    phone: '0' + formdata.phone,
    verify_code: formdata.code
  }));

  const submitForm = async () => {
    if (validForm()) {
      let sid: any = '';
      let ts: any = '';
      if (phoneBackSid.value != '0' && phoneBackSid.value) {
        sid = phoneBackSid.value.split(':')[0];
        ts = phoneBackSid.value.split(':')[1];
      } else {
        // Toast('');
        return;
      }
      await setBindPhone({
        ...submitParams.value,
        sid,
        ts
      })
      userInfoStore.getUserInfo();
      Toast('Liên Kết Thành Công');
      return true;
    }
    return false;
  };

  // const { loading: submitLoading, run: submitRun } = useRequest(() => submitForm(), {
  //   manual: true
  // });

  const getPhoneCodeClick = () => {
    formref.value &&
      formref.value.validateField('phone', (msg: any) => {
        if (msg === null || msg === undefined || msg === '') {
          if (loading.value) return;
          startLoading();
          run();
        }
      });
  };

  return {
    formref,
    formdata,
    rules,
    submitForm,
    getPhoneCodeClick,
    loading,
    allseconds,
    counting,
    isPhoneValid,
    isCodeValid,
  };
}

// code
export const useEditCode = () => {

  const isCodeValid = ref(false);

  const checkCode = (rule: any, value: any, callback: any) => {
    const v = /^\d{4}$/.test(value);
    isCodeValid.value = v;
    if (!v) {
      callback(new Error('Vui lòng nhập 4 số mã xác nhận'));
    } else {
      callback();
    }
  }

  const { formref, formdata, rules, validForm, resetForm } = useForm([
    {
      key: 'code',
      label: 'Mã Xác Nhận Từ Email',
      value: '',
      rule: [
        // {
        //   required: true,
        //   trigger: 'blur',
        //   message: 'Vui lòng nhập mã xác nhận'
        // }
        {
          pattern: /^\d{4}$/,
          validator: checkCode,
          trigger: 'change'
        }
      ]
    }
  ]);

  const { startLoading, closeLoading } = useLoading();

  const { allseconds, counting, startCount } = useShowCountdown(300 * 1000);

  const params = computed(() => {
    return {
      ty: 5,
      flag: 'text'
    };
  });

  // const phoneBackSid = ref('');
  const { loading, run, data } = useRequest(() => getPhoneCode(params.value), {
    manual: true,
    onSuccess: (res: any) => {
      // phoneBackSid.value = res;
      closeLoading();
      Toast('Gửi Mã Xác Minh Thành Công');
      startCount();
    },
    onError: () => {
      closeLoading();
    },
    onAfter() { closeLoading(); }
  });

  const submitParams = computed(() => ({
    verify_code: formdata.code
  }));

  const submitForm = async () => {
    if (validForm()) {
      let sid: any = '';
      let ts: any = '';
      // if (phoneBackSid.value != '0' && phoneBackSid.value) {
      //   sid = phoneBackSid.value.split(':')[0];
      //   ts = phoneBackSid.value.split(':')[1];
      // } else {
      //   // Toast('');
      //   return;
      // }
      // await setBindPhone({
      //   ...submitParams.value,
      //   sid,
      //   ts
      // })
      userInfoStore.getUserInfo();
      Toast('Liên Kết Thành Công');
      return true;
    }
    return false;
  };

  const getPhoneCodeClick = () => {
    if (loading.value) return;
    startLoading();
    run();
  };

  return {
    formref,
    formdata,
    rules,
    submitForm,
    getPhoneCodeClick,
    loading,
    allseconds,
    counting,
    isCodeValid,
  };
}

// form
interface FormItemConfig {
  key: string;
  label: string;
  value: string | number;
  rule: any[];
}
export const useForm = (config: FormItemConfig[]) => {
  let tmpdata: any = {};
  let tmprules: any = {};
  let tmpvalid: any = {};
  config.forEach(item => {
    tmpdata[item.key] = item.value || '';
    tmprules[item.key] = item.rule;
    tmpvalid[item.key] = false;
  });
  const formref = ref<any>(null);
  const formdata = reactive(tmpdata);
  const rules = reactive(tmprules);
  const formvalid = reactive(tmpvalid);

  const validForm: () => boolean = () => {
    let v = false;
    if (!formref.value) return v;
    formref.value.validate((valid: boolean) => {
      v = Boolean(valid);
    });
    return v;
  };

  const resetForm = () => {
    if (!formref.value) return;
    formref.value.resetFields();
  };
  return {
    formref,
    formdata,
    rules,
    validForm,
    resetForm
  };
};
