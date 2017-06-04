import { request } from '../utils';

export async function addQuestion(params) {
  return request({
    url: '/question',
    method: 'post',
    data: params,
    withCredentials: true,
  });
}

export async function getQuestion(id) {
  return request({
    url: `/question/${id}`,
    method: 'get',
  });
}


export async function getQuestionList(params) {
  return request({
    url: `/question?type=${params}`,
    method: 'get',
  });
}
