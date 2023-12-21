export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Job',
    route: '/jobs/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]

export const jobDefaultValues = {
  company: '',
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  paw: '',
  url: '',
}