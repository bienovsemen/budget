export default class BudgetService {
  data = [
    {
      id: 1,
      title: 'Travelling',
      categoryTotal: 4000,
      items: [
        {
          id: 'option 1 travel',
          categoryId: 1,
          title: 'option 1 travel',
          amount: 3000,
          type: 'inc'
        },
        {
          id: 'option 2 travel',
          categoryId: 1,
          title: 'option 2 travel',
          amount: 8000,
          type: 'dec'
        },
        {
          id: 'option 3 travel',
          categoryId: 1,
          title: 'option 3 travel',
          amount: 9000,
          type: 'inc'
        }
      ]
    },
    {
      id: 2,
      title: 'Family',
      categoryTotal: -2000,
      items: [
        {
          id: 'option 1 family',
          categoryId: 2,
          title: 'option 1 family',
          amount: 800,
          type: 'inc'
        },
        {
          id: 'option 2 family',
          categoryId: 2,
          title: 'option 2 family',
          amount: 5000,
          type: 'dec'
        },
        {
          id: 'option 3 family',
          categoryId: 2,
          title: 'option 3 family',
          amount: 2200,
          type: 'inc'
        }
      ]
    },
    {
      id: 3,
      title: 'Car',
      categoryTotal: 4500,
      items: [
        {
          id: 'option 1 car',
          categoryId: 3,
          title: 'option 1 car',
          amount: 3500,
          type: 'inc'
        },
        {
          id: 'option 2 car',
          categoryId: 3,
          title: 'option 2 car',
          amount: 6000,
          type: 'dec'
        },
        {
          id: 'option 3 car',
          categoryId: 3,
          title: 'option 3 car',
          amount: 7000,
          type: 'inc'
        }
      ]
    },
    {
      id: 4,
      title: 'Moovies',
      categoryTotal: 6000,
      items: [
        {
          id: 'option 1 Moovies',
          categoryId: 4,
          title: 'option 1 Moovies',
          amount: 5000,
          type: 'inc'
        },
        {
          id: 'option 2 Moovies',
          categoryId: 4,
          title: 'option 2 Moovies',
          amount: 10000,
          type: 'dec'
        },
        {
          id: 'option 3 Moovies',
          categoryId: 4,
          title: 'option 3 Moovies',
          amount: 11000,
          type: 'inc'
        }
      ]
    },
  ]

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.data)
      }, 700)
    })
  }
}
