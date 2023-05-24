import mitt from 'mitt';

type Events = {
  withdrawals: any;
  deposit: any;
  monitorEmergencyModal: any;
  balance: any;
  recover: any;
  jackpot: any;
  [text: string]: any;
};

const bus = mitt<Events>();
export default bus;
