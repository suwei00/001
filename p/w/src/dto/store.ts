import { AppStateType } from '@/store/modules/app/state';
import { UserStateType } from '@/store/modules/user/state';

type ModuleType = {
  app: AppStateType,
  user: UserStateType,
  server_time: number
}

export type StateType = ModuleType