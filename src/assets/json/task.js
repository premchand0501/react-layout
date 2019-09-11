
export const taskGroupData = [
  {
    id: 0,
    taskName: 'Marketing Compaign',
    startDate: '6/5/2019',
    endDate: '6/26/2019',
    creator: {
      name: 'Max',
      id: 11,
      profileImage: ''
    },
    taskList: [
      {
        id: 0,
        subTaskName: 'Compaign Messaging',
        status: false,
        startDate: '6/14/2019',
        endDate: '6/20/2019',
        priority: 1,
        assignee: {
          name: 'John Doe',
          id: 123,
          profileImage: ''
        }
      },
      {
        id: 1,
        subTaskName: 'Media Plan',
        status: false,
        startDate: '6/25/2019',
        endDate: '6/26/2019',
        priority: 2,
        assignee: {
          name: 'Prem Chand',
          id: 125,
          profileImage: ''
        }
      },
      {
        id: 2,
        subTaskName: 'Select Agency',
        status: false,
        startDate: '6/5/2019',
        endDate: '6/6/2019',
        priority: 1,
        assignee: {
          name: 'Prem Chand',
          id: 125,
          profileImage: ''
        }
      }
    ]
  }
]