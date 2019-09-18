import { saveUserData } from "../store/actions/userAction";

export const baseUrl = 'http://localhost:4000';

export const authenticate = async ({ id }) => {
  if (id == null) {
    return false;
  }
  const res = await fetch(`${baseUrl}/users/${id}`);
  const resData = await res.json();
  if (resData && resData.status === 1) {
    await saveUserData(true, resData.data);
    return true;
  }
  return false;
}

export const fetchTaskGroupData = async () => {
  const res = await fetch(`${baseUrl}/task-boards`);
  const data = await res.json();
  return data;
}

export const fetchTaskGroupDetails = async (id) => {
  const res = await fetch(`${baseUrl}/get-task-board-by-id/${id}`);
  const data = await res.json();
  return data;
}

export const fetchTaskListData = async (id) => {
  const res = await fetch(`${baseUrl}/task-list-by-taskboard-id/${id}`);
  const data = await res.json();
  return data;
}

export const fetchTaskDetailsData = async (id) => {
  const res = await fetch(`${baseUrl}/task-details/${id}`);
  const data = await res.json();
  return data;
}

export const toggleTaskStatusFunc = async (id, flag) => {
  const res = await fetch(`${baseUrl}/update-task`, {
    body: JSON.stringify({
      id,
      status: flag,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data;
}