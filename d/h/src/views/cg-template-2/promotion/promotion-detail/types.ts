export interface ApplyStatusRes {
  status: boolean;
  data: {
    state: number;
    apply_status: number;
    deposit: number;
    condition: number;
  };
}
export interface Answer {
  id: string;
  answer: string;
}

export interface PromoExamRes {
  status: boolean;
  data: {
    total: number;
    next_ques_id: string;
    next_ques: string;
    next_answer: Answer[];
    next_finish_at: number;
    apply_status: number;
    no: number;
    true_num: number;
    bonus: number;
  };
}

export interface ExamResultRes {
  status: boolean;
  data: {
    total: number;
    state: number;
    true_answer: Answer;
    error_paring: string;
    apply_status: number;
    bonus: number;
    true_num: number;
    no: number;
  };
}