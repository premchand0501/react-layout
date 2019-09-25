export const baseUrl = 'http://localhost:4000';

export const authenticate = async ({ id }) => {
  if (id == null) {
    return null;
  }
  const res = await fetch(`${baseUrl}/users/${id}`);
  const resData = await res.json();
  if (resData && resData.status === 1) {
    return resData.data;
  }
  return null;
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

export const fetchAttachedPictureData = async (id) => {
  const res = await fetch(`${baseUrl}/task-medias/${id}`);
  const data = await res.json();
  return data;
}

export const fetchAllUsers = async () => {
  const res = await fetch(`${baseUrl}/users`);
  const data = await res.json();
  return data;
}

export const removeAttachedPictureData = async (id) => {
  const res = await fetch(`${baseUrl}/delete-media/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  return data;
}

export const uploadAttachedPictureData = async (id, file) => {
  const formData = new FormData();
  formData.append('media', file);
  formData.append('_id', id);
  const res = await fetch(`${baseUrl}/upload-media`, {
    body: formData,
    method: 'POST'
  });
  const data = await res.json();
  return data;
}

export const toggleTaskStatusFunc = async (_id, flag) => {
  const res = await fetch(`${baseUrl}/update-task`, {
    body: JSON.stringify({
      _id,
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

export const updateTaskDataFunc = async (reqData) => {
  const res = await fetch(`${baseUrl}/update-task`, {
    body: JSON.stringify(reqData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data;
}

export const createNewTask = async (reqData) => {
  console.log(reqData);
  const res = await fetch(`${baseUrl}/create-new-task`, {
    body: JSON.stringify(reqData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data;
}